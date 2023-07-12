import React, { useEffect, useState } from 'react';
import { Chip } from '@mui/material';


const CommentTable = () => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/comments');
        const data = await response.json();
        setComments(data.comments);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchComments();
    }, []);
  
    useEffect(() => {
      console.log('Comments debug:', comments); // Log comments state for debugging
    }, [comments]); // Run effect whenever comments state changes
  
    
  
    return (
        <div>
          <h1>Comments</h1>
          <button onClick={fetchComments}>Refresh Comments</button>
          <table>
            <thead>
              <tr>
                <th>Comment ID</th>
                <th>User</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.uuid}</td>
                  {comment.tag ? <td>{comment.message}<Chip label={comment.tag}/> </td>: <td>{comment.message}</td>}
                  <td>{comment.user.handle}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      );
};

export default CommentTable;