const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const ngrok = require('ngrok')
const app = express();
const port = process.env.port || 5000;

var generator = require('generate-password');


var passcode = generator.generate({
	length: 10,
	numbers: true
});

// Dummy JSON data
const tagData = [
  { id: '467975898', tag: 'Archived' },
  { id: '460891919', tag: 'Reference Link' },
  { id: '460395153', tag: 'Suggestion' }
];

console.log("passcode for webhook",passcode);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
});

/** fetching the comments from the Figma API */
app.get('/comments', async (req, res) => {
  try {
    const figmaToken = 'figd_L5thfhMiMoYiMkVlsP0WTQAtl7PbVV7ktgrXKIdz';
    //const fileKey = req.query.fileKey;
    const fileKey = '1Ab8c4kw1mbN8M0JCEVKXQ';

    const response = await axios.get(
      `https://api.figma.com/v1/files/${fileKey}/comments`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Figma-Token': figmaToken,
        },
      }
    );

    const comments = response.data.comments;
    const joinedComments = comments.map(comment => {
      const tag = tagData.find(tag => tag.id === comment.id);
      return { ...comment, tag: tag ? tag.tag : null };
    });
    
    res.json({ comments: joinedComments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
});


// app.get('/api/commentsDue', (req, res) => {
//   res.json(tagData)
// });

// Webhook Test
app.post('/webhook', async (req, res) => {
  const eventType = req.body.event_type;
  if (eventType === 'FILE_COMMENT') {
    console.log('Received FILE_COMMENT event');
    // Process the FILE_COMMENT event here
  }
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Commentify Server listening on port ${port}`)
  // ngrok.connect(port).then((endpoint) => {
  //   const params = {
  //     event_type: 'FILE_COMMENT',
  //     team_id: '1168972718177826585', // professional team "one slash"
  //     passcode: passcode , // Replace with your passcode
  //     endpoint,
  //   };
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-Figma-Token': 'figd_L5thfhMiMoYiMkVlsP0WTQAtl7PbVV7ktgrXKIdz',
  //     },
  //     body: JSON.stringify(params),
  //   };
  //   fetch('https://api.figma.com/v2/webhooks/', options)
  //     .then((response) => response.json())
  //     .then((json) => console.log(json))
  //     .catch((error) => console.error(error));
  // });
})

