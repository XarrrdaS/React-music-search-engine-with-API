import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Categories from '../Categories/Categories';
import SearchData from '../SearchData/SearchData';
import SearchInput from '../SearchInput/SearchInput';

function HomePage() {
  const [categoryChange, setCategoryChange] = useState('all')
  const [isSearching, setIsSearching] = useState(false)
  const [song, setSong] = useState(null);
  const [popularData, setPopularData] = useState([]);


  const handleData = (value) => {
    setIsSearching(true);
    setSong(value)

  };

  const inputValue = (value) => {
    if (value === '') {
      setIsSearching(false);
    }
  };
  
  const isLoadingProps = useCallback((value) => {
    setIsLoading(value);
  }, []);


  const [isLoading, setIsLoading] = useState(true);
  const fetchPopularData = useCallback(async () => {
    let url = '/proxy/chart';
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setPopularData(data);
      setIsLoading(false);
      console.log('Success:', data);
    } else {
      console.log('Error:', response.status);
    }
  }, []);

  useEffect(() => {
    fetchPopularData();
  }, []);


  const carouselContainers = document.getElementsByClassName('carousel-container');

  function scrollLeft(item) {
    if (item === 'artist') {
      carouselContainers[0].scrollBy({
        left: -800,
        behavior: 'smooth'
      });
    }
    if (item === 'track') {
      carouselContainers[1].scrollBy({
        left: -800,
        behavior: 'smooth'
      });
    }
    if (item === 'playlist') {
      carouselContainers[2].scrollBy({
        left: -800,
        behavior: 'smooth'
      });
    }
  }

  function scrollRight(item) {
    if (item === 'artist') {
      carouselContainers[0].scrollBy({
        left: 800,
        behavior: 'smooth'
      });
    }
    if (item === 'track') {
      carouselContainers[1].scrollBy({
        left: 800,
        behavior: 'smooth'
      });
    }
    if (item === 'playlist') {
      carouselContainers[2].scrollBy({
        left: 800,
        behavior: 'smooth'
      });
    }
  }
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    if (item.type === 'artist') {
      const artist = item;
      navigate('/artist-informations', { state: { artist } });
    }
    if (item.type === 'playlist') {
      const playlist = item;
      navigate('/playlist-informations', { state: { playlist } });
    }
    if (item.type === 'album') {
      const album = item;
      navigate('/album', { state: { album } });
    }
  };
  return (
    <div className='container'>
      {/* {console.log(popularData)} */}
      <Categories onChooseCategory={setCategoryChange} />
      {/* {console.log(isLoadingProps)} */}
      <SearchInput handleData={handleData} inputValue={inputValue} isLoadingProps={isLoadingProps}/>
      {/* {console.log(isLoadingSearch)} */}
      {isSearching ? (
        isLoading ? <h1>Loading...</h1> : <SearchData handleData={handleData} song={song}/>
      ) : (
        isLoading ? <h1>Loading...</h1> : (
          <>
            {/* <div className='segment'>
              <p className='heading-carousel'>Songs to savor</p>
              <button className="carousel-arrow left" aria-label="Previous Track" onClick={() => scrollLeft('track')}>&#8249;</button>
              <button className="carousel-arrow right" aria-label="Next Track" onClick={() => scrollRight('track')}>&#8250;</button>

              <div className="carousel-container artist-list">
                {popularData && popularData.tracks && popularData.tracks.data.map((track, index) => (
                  <div
                    className='carousel-item'
                    key={index}
                  >
                    <img src={track.album.cover_medium} alt={track.title} />
                    <span className='carousel-container--description'>{track.title}</span>
                    <span className='carousel-container--description'>{track.artist.name}</span>

                  </div>
                ))}
              </div>
            </div> */}

            <div className='segment'>
              <p className='heading-carousel'>Albums to listen all night long!</p>
              <button className="carousel-arrow left" aria-label="Previous Track" onClick={() => scrollLeft('track')}>&#8249;</button>
              <button className="carousel-arrow right" aria-label="Next Track" onClick={() => scrollRight('track')}>&#8250;</button>

              <div className="carousel-container artist-list">
                {console.log(popularData.albums.data[0].title)}
                {popularData && popularData.albums && popularData.albums.data.map((album, index) => (
                  <div
                    className='carousel-item'
                    key={index}
                  >
                    <img src={album.cover_medium} alt={album.title} onClick={() => handleNavigate(album)} />
                    <span className='carousel-container--description'>{album.title}</span>

                  </div>
                ))}
              </div>
            </div>

            <div className='segment'>
              <p className='heading-carousel'>Explore artists</p>
              <button className="carousel-arrow left" aria-label="Previous Artist" onClick={() => scrollLeft('artist')}>&#8249;</button>
              <button className="carousel-arrow right" aria-label="Next Artist" onClick={() => scrollRight('artist')}>&#8250;</button>

              <div className="carousel-container artist-list">
                {popularData && popularData.artists && popularData.artists.data.map((artist, index) => (
                  <div
                    className='carousel-item'
                    key={index}
                  >
                    <img src={artist.picture_medium} alt={artist.name} onClick={() => handleNavigate(artist)} />
                    <span className='carousel-container--description'>{artist.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='segment'>
              <p className='heading-carousel'>Playlists you'll love</p>
              <button className="carousel-arrow left" aria-label="Previous Playlist" onClick={() => scrollLeft('playlist')}>&#8249;</button>
              <button className="carousel-arrow right" aria-label="Next Playlist" onClick={() => scrollRight('playlist')}>&#8250;</button>
              <div className='carousel-container playlist-list'>
                {popularData && popularData.playlists && popularData.playlists.data.map((playlist, index) => (
                  <div
                    className='carousel-item'
                    key={index}
                  >
                    <img src={playlist.picture_medium} alt={playlist.title} onClick={() => handleNavigate(playlist)} />
                    <span className='carousel-container--description'>{playlist.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default HomePage;


