import React, { useState, useCallback, useEffect } from "react";


function SearchInput(props) {
  const [song, setSong] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (song !== null) {
      props.handleData(song);
      props.inputValue(inputValue);
      props.isLoadingProps(isLoading);
    }
  }, [song, isLoading]);



  const fetchData = useCallback(async (searchTerm) => {
    setIsLoading(true);
    let url = `/proxy/search?q=${searchTerm}`;
    const response = await fetch(url);
    const data = await response.json();
    setSong(data.data);
    setIsLoading(false);
  }, []);


  const Search = () => {
    let data = document.querySelector('.input-field').value;
    setInputValue(data);
    fetchData(data);
    setIsSearching(true);
    if (data === '') {
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
