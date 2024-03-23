import { useLocation } from 'react-router-dom';

function ArtistInfo() {
  const location = useLocation();
  const artist = location.state.artist;

    return (
      <div>
        <h1>{artist.name}</h1>
        <img src={artist.picture_medium} alt={artist.name} />
        <p>{artist.bio}</p>
      </div>
    );
  }

export default ArtistInfo;
