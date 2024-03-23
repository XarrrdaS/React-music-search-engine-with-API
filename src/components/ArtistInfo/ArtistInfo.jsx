import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Categories from '../Categories/Categories';
import SearchInput from '../SearchInput/SearchInput';
import DisplayData from '../DisplayData/DisplayData';

function ArtistInfo() {
  const location = useLocation();
  const artist = location.state.artist;

  const [categoryChange, setCategoryChange] = useState('all')
  const [isSearching, setIsSearching] = useState(false)
  const [song, setSong] = useState(null);
  const [popularData, setPopularData] = useState([]);
  const [moreInfo, setMoreInfo] = useState([])

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
    let url = `https://corsproxy.io/?https://api.deezer.com/artist/${artist.id}/top?limit=50`;

    const response = await fetch(url);
    const data = await response.json();
    setMoreInfo(data.data);
  }, []);

  useEffect(() => {
    artistMoreInfo();
  }, []);
  console.log(moreInfo)
  const duration = (totalSeconds) => {
    let minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    let seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
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
            <thead>
                    <tr>
                      <th>TRACK</th>
                      <th>ARTIST</th>
                      <th>ALBUM</th>
                      <th>DURATION</th>
                    </tr>
                  </thead>
                  <tbody>
            {moreInfo ? moreInfo.map((track, index) => (
              <tr key={track.id + 1}>
                <td key={track.id + 3}>{index + 1}</td>
                <td className='grid' key={track.id + 2}>
                  <img src={track.album.cover_small} alt={track.title} key={track.id + 1} className='images' />
                  <span>{track.title}</span>
                </td>
                <td key={track.id + 3}>{track.artist.name}</td>
                <td key={track.id + 4}>{track.album.title}</td>
                <td key={track.id + 5}>{duration(track.duration)}</td>
              </tr>
            )) : ''}
            </tbody>
          </>
        )}
    </div>
  );
}

export default ArtistInfo;
