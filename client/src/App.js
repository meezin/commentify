import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';

import CommentTable from './components/CommentTable';


import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
    <Header/>
        <Routes>
          <Route path="/comments" element={<CommentTable />} />
          {/* Other routes and components */}
        </Routes>
    </div>
    
  );
}

export default App;
