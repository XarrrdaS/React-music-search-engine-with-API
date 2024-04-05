import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import ('./components/HomePage/HomePage'));
const ArtistInfo = lazy(() => import ('./components/ArtistInfo/ArtistInfo')); 
const AlbumInfo = lazy(() => import ('./components/AlbumInfo/AlbumInfo'));
const PlaylistInfo = lazy(() => import ('./components/PlaylistInfo/PlaylistInfo'));
const SearchData = lazy(() => import ('./components/SearchData/SearchData'));
const LoadingIndicator = lazy(() => import ('./components/LoadingIndicator/LoadingIndicator'));

function App() {
  return (
    <Router>
      <div className='App'>
        <Suspense fallback={<LoadingIndicator />}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/artist-informations" element={<ArtistInfo />} />
            <Route path="/artist-informations/album" element={<AlbumInfo />} />
            <Route path="/playlist-informations" element={<PlaylistInfo />} />
            <Route path="/playlist-informations/album" element={<AlbumInfo />} />
            <Route path="/album" element={<AlbumInfo />} />
            <Route path="/search" element={<SearchData />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
