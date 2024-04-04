import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Categories from '../Categories/Categories';
import SearchInput from '../SearchInput/SearchInput';
import SearchData from '../SearchData/SearchData';

function ArtistInfo() {
    const location = useLocation();
    const playlist = location.state.playlist;

    const [categoryChange, setCategoryChange] = useState('all')
    const [isSearching, setIsSearching] = useState(false)
    const [song, setSong] = useState(null);
    const [popularData, setPopularData] = useState([]);
    const [moreInfo, setMoreInfo] = useState([]);
    const [currentTrack, setCurrentTrack] = useState('');

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

    const [url, setUrl] = useState(`/proxy/playlist/${playlist.id}/tracks?index=0`);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [chosenArtist, setChosenArtist] = useState('');
    const [pictureChosenArtist, setPictureChosenArtist] = useState('');

    const artistMoreInfo = useCallback((chosenArtist, artistName, artistPicture) => {
        if (chosenArtist) {
            setChosenArtist(artistName);
            setPictureChosenArtist(artistPicture);
            //   console.log(chosenArtist);
            setUrl(chosenArtist.replace('https://api.deezer.com', '/proxy'));
            setStartIndex(0);
        }
    }, []);
    // console.log(url) 
    const [startIndex, setStartIndex] = useState(0);

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

    // const [albumList, setAlbumList] = useState([])
    // const [isAlbumPressed, setIsAlbumPressed] = useState(false);
    // const albumInfo = useCallback(async (albumURLfromTrack) => {
    //   let cors = 'https://corsproxy.io/?'
    //   const response = await fetch(cors + albumURLfromTrack);
    //   const data = await response.json();
    //   console.log(data)
    //   setAlbumList(data.data);
    //   setIsAlbumPressed(true);
    // }, []);

    const navigate = useNavigate();

    const albumInfo = (album) => {
        navigate('/playlist-informations/album', { state: { album } });
    };

    const [navigationUrlButtons, setNavigationUrlButtons] = useState(null);
    const navigationUrlButtonsFunc = useCallback((value) => {
        setNavigationUrlButtons(value);
    }, []);

    return (
        <div>
            <Categories onChooseCategory={setCategoryChange} />
            <SearchInput handleData={handleData} inputValue={inputValue} isLoadingProps={isLoadingProps} navigationUrlButtons={navigationUrlButtonsFunc} />
            {isSearching ? (
                isLoading ? <h1>Loading...</h1> : <SearchData handleData={handleData} song={song} navigationUrlButtons={navigationUrlButtons} />
            ) :
                (
                    <>
                        <h1>{chosenArtist ? chosenArtist : playlist.title}</h1>
                        <img src={pictureChosenArtist ? pictureChosenArtist : playlist.picture_medium} alt={chosenArtist ? chosenArtist : playlist.name} />
                        <button onClick={() => hangleChangePage('prev')}>PREVIOUS</button>
                        <button onClick={() => hangleChangePage('next')}>NEXT</button>
                        {isLoading ? <h1>Loading...</h1> : (
                            <table>
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
                                    {moreInfo ? moreInfo.map((track, index) => (
                                        <tr key={track.id + 1678}>
                                            <td key={track.id + 367845}>{startIndex + index + 1}</td>
                                            <td className='grid track-row' key={track.id + 267455467}>
                                                <img src={track.album.cover_small} alt={track.title} key={track.id + 1} className='images' />
                                                <span key={track.id + 98}>{track.title}</span>
                                                <button key={track.id + 198} onClick={() => setCurrentTrack(track.preview)}>PLAY</button>
                                            </td>
                                            <td key={track.id + 4324}>
                                                <span onClick={() => artistMoreInfo(track.artist.tracklist.replace('top?limit=50', 'top?limit=25'),
                                                    track.artist.name, track.artist.picture_medium)}>{track.artist.name}</span>
                                            </td>
                                            <td key={track.id + 1234}><span onClick={() => albumInfo(track)}>{track.album.title}</span></td>
                                            <td key={track.id + 3215}>{duration(track.duration)}</td>
                                        </tr>
                                    )) : ''}
                                </tbody>
                            </table>
                        )}

                        <audio ref={audioRef} controls className="play-button">
                            Your browser does not support the audio element.
                        </audio>
                    </>

                )}
        </div>
    );
}

export default ArtistInfo;
