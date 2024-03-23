import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ArtistInfo from './components/ArtistInfo/ArtistInfo';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/artist-informations" element={<ArtistInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
