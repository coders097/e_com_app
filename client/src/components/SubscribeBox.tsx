import React from 'react';
import '../scss/SubscribeBox.scss';
import shopG from '../assets/shopGuy.jpg';

const SubscribeBox = () => {
    return (
        <div className="SubscribeBox">
            <img alt="shopGuy" src={shopG}/>
            <div className="details">
                <h2>Subscribe and receive <span>Discount upto 15%</span> on your first purchase.</h2>
                <input placeholder="Name" type="text"/>
                <input placeholder="Email" type="email"/>
                <select>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <button className="btn">SUBSCRIBE</button>
            </div>
        </div>
    );
};

export default SubscribeBox;