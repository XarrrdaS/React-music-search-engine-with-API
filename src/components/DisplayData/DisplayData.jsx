import React, { useState, useCallback, useEffect } from 'react';


function DisplaySong(props){

    const duration = (totalSeconds) => {
      let minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
      let seconds = (totalSeconds % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    };
    return(
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
                        <img src={i.album.cover_small} alt={i.title} key={i.id + 1} className='images'/>
                        <span>{i.title}</span>
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
    );
}

export default DisplaySong;
