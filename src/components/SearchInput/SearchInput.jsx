import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchInput(props) {
  const [song, setSong] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [navigationUrlButtons, setNavigationUrlButtons] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (song !== null) {

      navigate('/search', { state: { song, inputValue, isLoading, navigationUrlButtons } });
    }
  }, [song, isLoading, navigationUrlButtons]);

  const fetchData = useCallback(async (searchTerm) => {
    setIsLoading(true);
    let url = `/proxy/search?q=${searchTerm}`;
    const response = await fetch(url);
    const data = await response.json();
    setSong(data.data);
    setIsLoading(false);
    setNavigationUrlButtons(data);
  }, []);

  const Search = () => {
    let data = document.querySelector('.input-field').value;
    setInputValue(data);
    fetchData(data);
    setIsSearching(true);
    if (data === '') {
      navigate('/');
      setIsSearching(false);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      Search();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder='Artist, track, podcast...'
        className='input-field'
        onKeyDown={handleKeyPress}
      />
      <button onClick={Search}>Search</button>
    </div>
  );
}

export default SearchInput;
