import React, { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import Categories from "../Categories/Categories";
import SearchInput from "../SearchInput/SearchInput";
import SearchData from "../SearchData/SearchData";

function AlbumInfo() {
    const location = useLocation();
    const stateInfo = location.state.album;
    const [albumList, setAlbumList] = useState([])
    const [categoryChange, setCategoryChange] = useState('all')
    const [isSearching, setIsSearching] = useState(false)
    const [song, setSong] = useState(null);
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

    const isLoadingProps = useCallback((value) => {
        setIsLoading(value);
      }, []);
      
    // console.log(stateInfo)
    const [isLoading, setIsLoading] = useState(true);
    const albumInfo = useCallback(async () => {
        let url = stateInfo.album ? stateInfo.album.tracklist.replace('https://api.deezer.com', '/proxy') :
            stateInfo.tracklist.replace('https://api.deezer.com', '/proxy');
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            setAlbumList(data.data);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, []);

    useEffect(() => {
        albumInfo()
    }, [albumInfo])

    useEffect(() => {
        if (currentTrack) {
            audioRef.current.src = currentTrack;
            audioRef.current.play();
        }
    }, [currentTrack]);


    const duration = (totalSeconds) => {
        let hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        let minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        let seconds = (totalSeconds % 60).toString().padStart(2, '0');

        if (hours > 0) {
            return `${hours}:${minutes}:${seconds}`;
        } else {
            return `${minutes}:${seconds}`;
        }
    };

    // console.log(albumList)
    const totalDuration = albumList && albumList.reduce((total, track) => total + track.duration, 0);

    return (
        <>
            <Categories onChooseCategory={setCategoryChange} />
            <SearchInput handleData={handleData} inputValue={inputValue} isLoadingProps={isLoadingProps}/>
            {isSearching ? (
        isLoading ? <h1>Loading...</h1> : <SearchData handleData={handleData} song={song}/>
      ) : (
                <div>
                    {console.log(albumList)}
                    {stateInfo && stateInfo.album ? (
                        <>
                            <img src={stateInfo.album.cover_medium} alt="Album poster" />
                            <p>Album title: {stateInfo.album.title}</p>
                            <p>Artist: {stateInfo.artist.name}</p>
                            {(!albumList || albumList.length === 0) ? '' : <p>Total Duration: {duration(totalDuration)}</p>}
                            {(!albumList || albumList.length === 0) ? '' : <p>Number of tracks: {albumList && albumList.length}</p>}
                        </>
                    ) : (
                    <>
                        <img src={stateInfo.cover_medium ? stateInfo.cover_medium : ''} alt="Album poster" />
                        <p>Album title: {stateInfo.title}</p>
                        <p>Artist: {stateInfo.artist.name}</p>
                        {(!albumList || albumList.length === 0) ? '' : <p>Total Duration: {duration(totalDuration)}</p>}
                        {(!albumList || albumList.length === 0) ? '' : <p>Number of tracks: {albumList && albumList.length}</p>}
                    </>
                    )
                    }
                    {isLoading ? <h1>Loading...</h1> : (
                        (!albumList || albumList.length === 0) ? <h1>No tracks found</h1> : (
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>TRACK</th>
                                    <th>DURATION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {albumList && albumList.map((track, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img src={`https://e-cdns-images.dzcdn.net/images/artist/${track.md5_image}/56x56-000000-80-0-0.jpg`} /></td>
                                            <td>{track.title}
                                                <button onClick={() => setCurrentTrack(track.preview)}>PLAY</button>
                                            </td>
                                            <td key={track.id + 5}>{duration(track.duration)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>)
                    )}
                </div>
                
            )}
            <audio ref={audioRef} controls className="play-button">
                Your browser does not support the audio element.
            </audio>
        </>
    );
}

export default AlbumInfo
