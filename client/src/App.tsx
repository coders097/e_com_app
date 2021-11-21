import React from 'react';
import {Route,Routes} from 'react-router-dom';


import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SearchView from './components/SearchView';
import Auth from './pages/Auth';
import Cart from './pages/Cart';

// Pages
import Home from './pages/Home';
import PNF from './pages/PNF';
import ProductPage from './pages/ProductPage';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import SpecialPage from './pages/SpecialPage';
import WishList from './pages/WishList';



const App = () => {
  return (
    <>
      <Navbar/>
      <SearchView/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search/:searchKey" element={<SearchResults type="search"/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/wishlist" element={<WishList/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/product" element={<ProductPage/>}/>
          <Route path="/specialoffer" element={<SpecialPage/>}/>
          <Route element={<PNF/>}/>
      </Routes>
      <Footer/>
    </>
  );
};

export default App;