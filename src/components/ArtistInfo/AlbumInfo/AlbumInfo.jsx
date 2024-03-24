import React, { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import Categories from "../../Categories/Categories";
import SearchInput from "../../SearchInput/SearchInput";
import DisplayData from "../../DisplayData/DisplayData";

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

    const albumInfo = useCallback(async () => {
        let cors = 'https://corsproxy.io/?'
        const response = await fetch(cors + artistAlbum);
        const data = await response.json();
        console.log(data)
        setAlbumList(data.data);
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
        let minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        let seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };


    return (
        <>
            <Categories onChooseCategory={setCategoryChange} />
            <SearchInput handleData={handleData} inputValue={inputValue} />
            {isSearching ? <DisplayData handleData={handleData} song={song} /> : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>TRACK</th>
                                <th>ARTIST</th>
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
                                        <td>{track.artist.name}</td>
                                        <td key={track.id + 5}>{duration(track.duration)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            <audio ref={audioRef} controls className="play-button">
                Your browser does not support the audio element.
            </audio>
        </>
    );
}

export default AlbumInfo
