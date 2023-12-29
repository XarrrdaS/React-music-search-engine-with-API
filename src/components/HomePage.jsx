import React, { useState, useEffect, useCallback } from 'react';
import './style/HomePage.css';
import Categories from './Categories';
import DisplaySong from './DisplaySong';
import SearchInput from './SearchInput';

function HomePage(){
    const [categoryChange, setCategoryChange] = useState('all')
    const [isSearching, setIsSearching] = useState(false)
    const [song, setSong] = useState(null);
    const [popularData, setPopularData] = useState([]);
    

    const handleData = (value) => {
      setIsSearching(true);
      setSong(value)
    };

    const inputValue = (value) => {
      if (value === ''){
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

    return (
      <div className='container'>
        {console.log(popularData)}
        {/* {console.log(song)} */}
        {/* {console.log(isSearching)} */}
        <Categories onChooseCategory={setCategoryChange}/>
        <SearchInput handleData={handleData} inputValue={inputValue}/>
        {isSearching ? (
          <DisplaySong handleData={handleData} song={song} />
            ) : (
              <>
            {/* <div className="containerr"> */}
            {/* {popularData && popularData.artists && popularData.artists.data.map((artist, index) => (
              <input type="radio" name="slider" id={`item-${index + 1}`} />
            ))} */}

            {/* <div class="items">
              {popularData && popularData.artists && popularData.artists.data.map((artist, index) => (
                <div
                  className={`item${index === 0 ? " active" : ""}${index === 1 ? " next" : ""}${index === popularData.artists.data.length - 1 ? " prev" : ""}`}
                  key={index}
                >
                  <img src={artist.picture_medium} alt={artist.name} />
                </div>
              ))}
              <div class="button-container">
                <div class="button"><i className="fas fa-angle-left"></i></div>
                <div class="button"><i className="fas fa-angle-right"></i></div>
              </div>
            </div> */}
                      <div class="carousel-container">
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
              {/* <div className="player">
                <div className="upper-part">
                  <div className="info-area" id="test">
                    {popularData && popularData.artists && popularData.artists.data.map((artist, index) => (
                      <label className="song-info" id={`song-info-${index + 1}`}>
                        <div className="title">{artist.name}</div>
                      </label>
                    ))}
                  </div>
                </div>                
              </div> */}
            {/* </div> */}
            
            </>
            )}
      </div>   
    );
};

export default HomePage;


