import React from 'react';
import '../scss/BoxMenu.scss'

import pc from '../assets/pc.jpg';
import mobile from '../assets/mobile.jpg';
import furniture from '../assets/furniture.jpg';
import fashion from '../assets/fashion.jpg';

const BoxMenu = () => {
    return (
        <div className="BoxMenu">
            <div className="item">
                <img alt="item" src={mobile}/>
                <h3>Mobiles & Accessories</h3>
            </div>
            <div className="item">
                <img alt="item" src={pc}/>
                <h3>PCs & Gaming</h3>
            </div>
            <div className="item">
                <img alt="item" src={fashion}/>
                <h3>Latest Fashion Trends</h3>
            </div>
            <div className="item">
                <img alt="item" src={furniture}/>
                <h3>Quality Furniture</h3>
            </div>
        </div>
    );
};

export default BoxMenu;