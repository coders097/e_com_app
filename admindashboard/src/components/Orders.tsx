import React from 'react';
import demo from '../assets/demo.jpg';
import '../scss/Orders.scss';

const Orders = () => {
    return (
        <section className="Orders">
            <ul>
                <li><h1>My Orders</h1></li>
                <li><select>
                    <option>Sort By</option>
                    <option value="date">Date Dec</option>
                    <option value="pri-inc">Price Inc</option>
                    <option value="pri-dec">Price Dec</option>
                </select></li>
            </ul>
            <div className="order-item">
                <img src={demo} alt="order-details"/>
                <div>
                    <h2>#6bfb64b6fb4</h2>
                    <h2 className="title">Dogs Iteration Charam Soap</h2>
                    <p className="price">5000</p>
                    <button className="btn btn-black">Approve</button>
                    <button className="btn btn-red">Cancel</button>
                </div>
            </div>
            <div className="order-item">
                <img src={demo} alt="order-details"/>
                <div>
                    <h2>#6bfb64b6fb4</h2>
                    <h2 className="title">Dogs Iteration Charam Soap</h2>
                    <p className="price">5000</p>
                    <button className="btn btn-black">Approve</button>
                    <button className="btn btn-red">Cancel</button>
                </div>
            </div>
        </section>
    );
};

export default Orders;