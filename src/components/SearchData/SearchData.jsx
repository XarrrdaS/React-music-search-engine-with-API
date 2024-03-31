import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function SearchData(props) {
  const [currentTrack, setCurrentTrack] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [url, setUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
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

  const hangleChangePage = (direction) => {
    if (direction === 'next' && nextUrl) {
      setIsLoading(true);
      setUrl(nextUrl);
      setStartIndex(prevIndex => prevIndex + 25);
    } else if (direction === 'prev' && prevUrl && startIndex > 0) {
      setIsLoading(true);
      setUrl(prevUrl);
      setStartIndex(prevIndex => prevIndex - 25);
    }
  };
  const [moreInfo, setMoreInfo] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setMoreInfo(data.data);
        console.log(data.data);
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

    if (url) {
      fetchData();
    }
  }, [url]);
  const [pictureChosenArtist, setPictureChosenArtist] = useState('');
  const [chosenArtist, setChosenArtist] = useState('');
  const artistMoreInfo = useCallback((chosenArtist, artistName, artistPicture) => {
    if (chosenArtist) {
      setChosenArtist(artistName);
      setPictureChosenArtist(artistPicture);
      console.log(chosenArtist);
      setUrl(chosenArtist.replace('https://api.deezer.com', '/proxy'));
      setStartIndex(0);
    }
  }, []);
  const navigate = useNavigate();

  const albumInfo = (album) => {
    navigate('/album', { state: { album } });
  };

  return (
    <>
      <div className='container'>
        <button onClick={() => hangleChangePage('prev')}>PREVIOUS</button>
        <button onClick={() => hangleChangePage('next')}>NEXT</button>
        {console.log(props.isLoading)}
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
              {props.song ? props.song.map((track, index) => (
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
              )) : ''}
            </tbody>
          </table>
        
      </div>
      <audio ref={audioRef} controls className="play-button">
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default SearchData;
