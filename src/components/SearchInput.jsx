import React, { useState, useCallback, useEffect } from "react";


function SearchInput(props){
    const [song, setSong] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
      if (song !== null){
        props.handleData(song);
        props.inputValue(inputValue);
      }
    }, [song]);
    

    const fetchData = useCallback(async (searchTerm) => {
        let url = `https://corsproxy.io/?https://api.deezer.com/search?q=${searchTerm}`;
        const response = await fetch(url);
        const data = await response.json();
        setSong(data.data);
      }, []);

      
    const Search = () => {
        let data = document.querySelector('.input-field').value;
        setInputValue(data);
        fetchData(data);
        setIsSearching(true);
        if (data === ''){
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
            placeholder='Search for the artist'   
            className='input-field' 
            onKeyDown={handleKeyPress}
          />
          <button onClick={Search}>Search</button>
          {/* {console.log(song)} */}
        </div>
    );
}

export default SearchInput;
