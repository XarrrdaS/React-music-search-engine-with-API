import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function PlaylistInfo() {
    const location = useLocation();
    const playlist = location.state.playlist;
    return (
        <div>
            <h1>{playlist.id}</h1>
        </div>
    );
};

export default PlaylistInfo;