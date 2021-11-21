import React from 'react';
import About from '../components/About';
import BoxMenu from '../components/BoxMenu';
import ProductIdeas from '../components/ProductIdeas';
import ProuductItem from '../components/ProuductItem';
import StyleWrapper from '../components/StyleWrapper';

// Banners
import Banner1 from '../assets/banners/all-diesel-apparel-&-accessories-big-ticket.jpg.webp';
import Banner2 from '../assets/banners/sports-apparel-and-merchandise-store-big-ticket.jpg.webp';
import Banner3 from '../assets/banners/first-time-ever-big-ticket.jpg.webp';
import Banner4 from '../assets/banners/musical-instruments-store-big-ticket.jpg.webp';
import Banner5 from '../assets/banners/toy-store-big-ticket.jpg.webp';
import Banner6 from '../assets/banners/everything-electronics-big-ticket.jpg.webp';
import SubscribeBox from '../components/SubscribeBox';

const Home = () => {
    return (
        <>
            <StyleWrapper>
                <BoxMenu/>
            </StyleWrapper>
            <StyleWrapper>
                <div className="home-items-holder">
                <ProuductItem/>
                <ProuductItem/>
                <ProductIdeas/>
                </div>
            </StyleWrapper>
            <StyleWrapper>
                <div className="home-items-holder">
                <ProductIdeas/>
                <ProuductItem/>
                <ProuductItem/>
                </div>
            </StyleWrapper>
            <StyleWrapper>
                <div className="home-items-holder">
                <div className="banner">
                    <img alt="banner" src={Banner3}/>
                </div>
                <div className="banner">
                    <img alt="banner" src={Banner4}/>
                </div>
                </div>
            </StyleWrapper>
            <StyleWrapper>
                <div className="home-items-holder">
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
                </div>
            </StyleWrapper>
            <StyleWrapper>
                <div className="home-items-holder">
                <ProductIdeas/>
                <ProuductItem/>
                <ProuductItem/>
                </div>
            </StyleWrapper>
            <StyleWrapper>
                <div className="home-items-holder">
                <div className="banner">
                    <img alt="banner" src={Banner1}/>
                </div>
                <div className="banner">
                    <img alt="banner" src={Banner2}/>
                </div>
                </div>
            </StyleWrapper>
            <StyleWrapper>
                <div className="home-items-holder-flexible">
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
                </div>
            </StyleWrapper>
            <StyleWrapper>
                <div className="home-items-holder">
                <ProuductItem/>
                <ProuductItem/>
                <SubscribeBox/>
                </div>
            </StyleWrapper>
            <StyleWrapper>
                <div className="home-items-holder">
                <div className="banner">
                    <img alt="banner" src={Banner5}/>
                </div>
                <div className="banner">
                    <img alt="banner" src={Banner6}/>
                </div>
                </div>
            </StyleWrapper>
            <About/>
        </>
    );
};

export default Home;