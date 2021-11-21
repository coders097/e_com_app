import React from 'react';
import '../scss/SearchView.scss';

import logo from '../assets/logo.png';
import search from '../assets/search.png';

const SearchView = () => {
    return (
        <section className="SearchView">
            <img alt="logo" src={logo}/>
            <div className="search-box">
                <input placeholder="Search what you want..." type="text"/>
                <img src={search} alt="search"/>
            </div>
        </section>
    );
};

export default SearchView;