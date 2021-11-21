import React from 'react';
import ProuductItem from '../components/ProuductItem';
import SearchResults from './SearchResults';

const WishList = () => {
    return (
        <section className="Wishlist">
            <SearchResults type="wishlist"/>
        </section>
    );
};

export default WishList;