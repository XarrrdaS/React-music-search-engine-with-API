import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function SearchData(props) {
  const [currentTrack, setCurrentTrack] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [url, setUrl] = useState('');
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const duration = (totalSeconds) => {
    let minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    let seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const audioRef = useRef();
  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack;
      audioRef.current.play();
    }
  }, [currentTrack]);
  const [nextUrl, setNextUrl] = useState(props.navigationUrlButtons.next && 
    props.navigationUrlButtons.next.replace('https://api.deezer.com', '/proxy'));
  const [prevUrl, setPrevUrl] = useState('');
  const handleChangePage = (direction) => {
    if (direction === 'next' && nextUrl) {
      fetchData(nextUrl);
      setStartIndex(prevIndex => prevIndex + 25);
    } else if (direction === 'prev' && prevUrl && startIndex > 0) {
      fetchData(prevUrl);
      setStartIndex(prevIndex => prevIndex - 25);
    }
  };


  const [moreInfo, setMoreInfo] = useState([])

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setIsLoading(true);
      setMoreInfo(data.data);
      // console.log(data.data)
      setSongs(data.data); // Update the songs state with the new data
      setIsLoading(false);
      if (data.next) {
        setNextUrl(data.next.replace('https://api.deezer.com', '/proxy'));
      } else {
        setNextUrl('');
      }
      if (data.prev) {
        setPrevUrl(data.prev.replace('https://api.deezer.com', '/proxy'));
      } else {
        setPrevUrl('');
      }
    } else {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    fetchData(url);
  }, [url, songs]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     // setIsLoading(true);
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     if (response.ok) {
  //       setMoreInfo(data.data);
  //       // console.log(data.data);
  //       setIsLoading(false);
  //       if (data.next) {
  //         setNextUrl(data.next.replace('https://api.deezer.com', '/proxy'));
  //       } else {
  //         setNextUrl('');
  //       }
  //       if (data.prev) {
  //         setPrevUrl(data.prev.replace('https://api.deezer.com', '/proxy'));
  //       } else {
  //         setPrevUrl('');
  //       }
  //     } else {
  //       // setIsLoading(true);
  //     }
  //   };

  //   if (url) {
  //     fetchData();
  //   }
  // }, [url]);
  const [pictureChosenArtist, setPictureChosenArtist] = useState('');
  const [chosenArtist, setChosenArtist] = useState('');
  const artistMoreInfo = useCallback((chosenArtist, artistName, artistPicture) => {
    if (chosenArtist) {
      setChosenArtist(artistName);
      setPictureChosenArtist(artistPicture);
      // console.log(chosenArtist);
      setUrl(chosenArtist.replace('https://api.deezer.com', '/proxy'));
      setStartIndex(0);
    }
  }, []);
  const navigate = useNavigate();

  const albumInfo = (album) => {
    navigate('/album', { state: { album } });
  };
  console.log(isLoading)
  return (
    <>
      <div className='container'>
        {songs && songs.length > 0 || props.song && props.song.length > 0 ? (
          isLoading ? <h1>Loading...</h1> : (
            
            <table className='main-table'>
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
                      {songs.length > 0 ? (
                        songs ? songs.map((track, index) => (
                          <tr key={track.id + 1678}>
                            <td key={track.id + 367845}>{startIndex + index + 1}</td>
                            <td className='grid track-row' key={track.id + 267455467}>
                              <img src={track.album.cover_small} alt={track.title} key={track.id + 1} className='images' />
                              <span key={track.id + 98}>{track.title}</span>
                              <button key={track.id + 198} onClick={() => setCurrentTrack(track.preview)}>PLAY</button>
                            </td>
                            <td key={track.id + 4324}>
                              {track.artist.name}
                            </td>
                            <td key={track.id + 1234}><span onClick={() => albumInfo(track)}>{track.album.title}</span></td>
                            <td key={track.id + 3215}>{duration(track.duration)}</td>
                          </tr>
                        )) : ''
                      ) : (props.song ? props.song.map((track, index) => (
                        <tr key={track.id + 1678}>
                          <td key={track.id + 367845}>{startIndex + index + 1}</td>
                          <td className='grid track-row' key={track.id + 267455467}>
                            <img src={track.album.cover_small} alt={track.title} key={track.id + 1} className='images' />
                            <span key={track.id + 98}>{track.title}</span>
                            <button key={track.id + 198} onClick={() => setCurrentTrack(track.preview)}>PLAY</button>
                          </td>
                          <td key={track.id + 4324}>
                            {track.artist.name}
                          </td>
                          <td key={track.id + 1234}><span onClick={() => albumInfo(track)}>{track.album.title}</span></td>
                          <td key={track.id + 3215}>{duration(track.duration)}</td>
                        </tr>
                      )) : '')}
                    </tbody>
                  </table>
                )) : <h1>No data!</h1>}
        
      </div>
      <audio ref={audioRef} controls className="play-button">
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default SearchData;
