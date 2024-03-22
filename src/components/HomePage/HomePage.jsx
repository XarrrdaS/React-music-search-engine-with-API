import React, { useState, useEffect, useCallback } from 'react';
import './HomePage.css';
import Categories from '../Categories/Categories';
import DisplayData from '../DisplayData/DisplayData';
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

  const fetchPopularData = useCallback(async () => {
    let url = 'https://corsproxy.io/?https://api.deezer.com/chart/0';

    const response = await fetch(url);
    const data = await response.json();
    setPopularData(data);
  }, []);

  useEffect(() => {
    fetchPopularData();
  }, []);


  const carouselContainer = document.querySelector('.carousel-container');



  function handleCarouselScrollLeft() {
    carouselContainer.scrollLeft -= 300;
  }

  function handleCarouselScrollRight() {
    carouselContainer.scrollLeft += 300;
  }
  return (
    <div className='container'>
      {console.log(popularData)}
      <Categories onChooseCategory={setCategoryChange} />
      <SearchInput handleData={handleData} inputValue={inputValue} />
      {isSearching ? (
        <DisplayData handleData={handleData} song={song} />
      ) : (
        <>
          <div className='segment'>
            <p className='heading-artists'>Artists</p>
            <button class="carousel-arrow left" aria-label="Previous Artists" onClick={() => handleCarouselScrollLeft()}>&#8249;</button>
            <button class="carousel-arrow right" aria-label="Next Artists" onClick={() => handleCarouselScrollRight()}>&#8250;</button>

            <div className="carousel-container artist-list">
              {popularData && popularData.artists && popularData.artists.data.map((artist, index) => (
                <div
                  className='carousel-item'
                  key={index}
                >
                  <img src={artist.picture_medium} alt={artist.name} />
                  <span className='artist-name'>{artist.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='segment'>

            <p className='heading-artists'>Playlists, You would love!</p>
            <div className='carousel-container'>
              {popularData && popularData.playlists && popularData.playlists.data.map((playlist, index) => (
                <div
                  className='carousel-item'
                  key={index}
                >
                  <img src={playlist.picture_medium} alt={playlist.title} />
                  <span className='artist-name'>{playlist.title}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;


