import React, { useState } from 'react';

function Categories({ onChooseCategory }){
    const [song, setSong] = useState(null);

    const choose = (category) => {
        onChooseCategory(category);
    };

    return(
        <div className='categories-container'>
            <button onClick={() => choose('all')}>All</button>
            <button onClick={() => choose('tracks')}>Tracks</button>
            <button onClick={() => choose('albums')}>Albums</button>
            <button onClick={() => choose('artists')}>Artists</button>
        </div>
    );
};

export default Categories;
