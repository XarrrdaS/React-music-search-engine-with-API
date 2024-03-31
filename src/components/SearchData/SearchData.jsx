import React, { useState, useCallback, useEffect, useRef } from 'react';


function DisplaySong(props) {
  const [currentTrack, setCurrentTrack] = useState('');
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

  return (
    <>
      <div className='container'>
        <table className='main-table'>
          <thead>
            <tr>
              <th>TRACK</th>
              <th>ARTIST</th>
              <th>ALBUM</th>
              <th>DURATION</th>
            </tr>
          </thead>
          <tbody>
            {props.song ? props.song.map((i) => {
              return (
                <tr key={i.id + 1}>
                  <td className='grid' key={i.id + 2}>
                    <img src={i.album.cover_small} alt={i.title} key={i.id + 1} className='images' />
                    <span>{i.title}</span>
                    <button onClick={() => setCurrentTrack(i.preview)}>PLAY</button>
                  </td>
                  <td key={i.id + 3}>{i.artist.name}</td>
                  <td key={i.id + 4}>{i.album.title}</td>
                  <td key={i.id + 5}>{duration(i.duration)}</td>
                </tr>
              );
            }) : ''}
          </tbody>
        </table>
      </div>
      <audio ref={audioRef} controls className="play-button">
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default DisplaySong;
