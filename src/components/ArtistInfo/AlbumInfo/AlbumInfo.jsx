import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function AlbumInfo() {
    const location = useLocation();
    const artistAlbum = location.state.artistAlbums;
    const [albumList, setAlbumList] = useState([])
    const [isAlbumPressed, setIsAlbumPressed] = useState(false);
    console.log(albumList)
    const albumInfo = useCallback(async () => {
        let cors = 'https://corsproxy.io/?'
        const response = await fetch(cors + artistAlbum);
        const data = await response.json();
        console.log(data)
        setAlbumList(data.data);
        setIsAlbumPressed(true);
    }, []);
    useEffect(() => {
        albumInfo()
    }, [albumInfo])
    return (
        <div>
            {albumList.map((track, index) =>{
                return (
                    <tr key={index}>
                        <td>{track.title}</td>
                        <td>{track.artist.name}</td>
                    </tr>
                )
            })}
        </div>
    );
}
export default AlbumInfo