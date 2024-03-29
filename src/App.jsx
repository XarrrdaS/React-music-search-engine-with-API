import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ArtistInfo from './components/ArtistInfo/ArtistInfo';
import AlbumInfo from './components/AlbumInfo/AlbumInfo'
import PlaylistInfo from './components/PlaylistInfo/PlaylistInfo';
function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/artist-informations" element={<ArtistInfo />} />
          <Route path="/artist-informations/album" element={<AlbumInfo />} />
          <Route path="/playlist-informations" element={<PlaylistInfo />} />
          <Route path="/playlist-informations/album" element={<AlbumInfo />} />
          <Route path="/album" element={<AlbumInfo />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
