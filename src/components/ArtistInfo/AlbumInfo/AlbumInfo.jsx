import React, { useState, useCallback, useEffect } from "react";
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
    
    return (
        <>
            <Categories onChooseCategory={setCategoryChange} />
            <SearchInput handleData={handleData} inputValue={inputValue} />
            {isSearching ? <DisplayData handleData={handleData} song={song} /> : (
                <div>
                    {albumList.map((track, index) => {
                        return (
                            <tr key={index}>
                                <td>{track.title}</td>
                                <td>{track.artist.name}</td>
                            </tr>
                        )
                    })}
                </div>
            )}
        </>
    );
}
export default AlbumInfo