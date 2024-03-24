import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Categories from '../Categories/Categories';
import SearchInput from '../SearchInput/SearchInput';
import DisplayData from '../DisplayData/DisplayData';
import './ArtistInfo.css';

function ArtistInfo() {
  const location = useLocation();
  const artist = location.state.artist;

  const [categoryChange, setCategoryChange] = useState('all')
  const [isSearching, setIsSearching] = useState(false)
  const [song, setSong] = useState(null);
  const [popularData, setPopularData] = useState([]);
  const [moreInfo, setMoreInfo] = useState([])
  const [currentTrack, setCurrentTrack] = useState('');
  const audioRef = useRef();

  const handleData = (value) => {
    setIsSearching(true);
    setSong(value)
  };

  const inputValue = (value) => {
    if (value === '') {
      setIsSearching(false);
    }
  };
  const artistMoreInfo = useCallback(async () => {
    let url = `https://corsproxy.io/?https://api.deezer.com/artist/${artist.id}/top?limit=100`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data)
    setMoreInfo(data.data);
  }, []);

  useEffect(() => {
    artistMoreInfo();
  }, []);
  const duration = (totalSeconds) => {
    let minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    let seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack;
      audioRef.current.play();
    }
  }, [currentTrack]);

  // const [albumList, setAlbumList] = useState([])
  // const [isAlbumPressed, setIsAlbumPressed] = useState(false);
  // const albumInfo = useCallback(async (albumURLfromTrack) => {
  //   let cors = 'https://corsproxy.io/?'
  //   const response = await fetch(cors + albumURLfromTrack);
  //   const data = await response.json();
  //   console.log(data)
  //   setAlbumList(data.data);
  //   setIsAlbumPressed(true);
  // }, []);

  const navigate = useNavigate();

  const albumInfo = (artistAlbums) => {
    navigate('/artist-informations/album', { state: { artistAlbums } });
  };
  return (
    <div>
      <Categories onChooseCategory={setCategoryChange} />
      <SearchInput handleData={handleData} inputValue={inputValue} />
      {isSearching ? <DisplayData handleData={handleData} song={song} /> :
      (
          <>
            <h1>{artist.name}</h1>
            <img src={artist.picture_medium} alt={artist.name} />
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>TRACK</th>
                  <th>ARTIST</th>
                  <th>ALBUM</th>
                  <th>DURATION</th>
                </tr>
              </thead>
              <tbody>
                {moreInfo ? moreInfo.map((track, index) => (
                  <tr key={track.id + 1678}>
                    <td key={track.id + 367845}>{index + 1}</td>
                    <td className='grid track-row' key={track.id + 267455467}>
                      <img src={track.album.cover_small} alt={track.title} key={track.id + 1} className='images' />
                      <span>{track.title}</span>
                      <button onClick={() => setCurrentTrack(track.preview)}>PLAY</button>
                    </td>
                    <td key={track.id + 3}>{track.artist.name}</td>
                    <td key={track.id + 4} onClick={() => albumInfo(track.album.tracklist)}>{track.album.title}</td>
                    <td key={track.id + 5}>{duration(track.duration)}</td>
                  </tr>
                )) : ''}
              </tbody>
            </table>

            <audio ref={audioRef} controls className="play-button">
              Your browser does not support the audio element.
            </audio>
          </>
        
        )}
    </div>
  );
}

export default ArtistInfo;
