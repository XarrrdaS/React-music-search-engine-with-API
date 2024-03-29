import React, { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import Categories from "../Categories/Categories";
import SearchInput from "../SearchInput/SearchInput";
import DisplayData from "../DisplayData/DisplayData";

function AlbumInfo() {
    const location = useLocation();
    const artistAlbum = location.state.artistAlbums;
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
    // console.log(artistAlbum)
    const [isLoading, setIsLoading] = useState(true);
    const albumInfo = useCallback(async () => {
        let url = artistAlbum.album.tracklist.replace('https://api.deezer.com', '/proxy');
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
    const totalDuration = albumList.reduce((total, track) => total + track.duration, 0);

    return (
        <>
            <Categories onChooseCategory={setCategoryChange} />
            <SearchInput handleData={handleData} inputValue={inputValue} />
            {isSearching ? <DisplayData handleData={handleData} song={song} /> : (
                <div>
                    <img src={artistAlbum.album.cover_medium} alt="Album poster" />
                    <p>Album title: {artistAlbum.album.title}</p>
                    <p>Artist: {artistAlbum.artist.name}</p>
                    <p>Total Duration: {duration(totalDuration)}</p>
                    <p>Number of tracks: {albumList.length}</p>
                    {isLoading ? <h1>Loading...</h1> : (
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
                                {albumList.map((track, index) => {
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
                        </table>
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
