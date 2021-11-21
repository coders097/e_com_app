import React from 'react';
import '../scss/ProductItem.scss';
import unlike from '../assets/unlike.png';
import demo from '../assets/demo.jpg';
import plus from '../assets/plus.png';


const ProuductItem = () => {
    return (
        <div className="ProductItem">
            <div className="header">
                <span>On Sale</span>
                <img alt="unlike" src={unlike}/>
                <img alt="plus" src={plus}/>
            </div>
            <img alt="main" src={demo}/>
            <div className="details">
                <p>US Exported</p>
                <h2>Samsuing M15 C4 BOM</h2>
            </div>
        </div>
    );
};

export default ProuductItem;