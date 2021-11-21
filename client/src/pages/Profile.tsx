import React, { useState } from 'react';
import '../scss/Profile.scss';

import user from '../assets/user.png';
import orders from '../assets/orders.png';
import userpic from '../assets/userpic.jpg';

const Profile = () => {

    let [controlMenu,setControlMenu]=useState(0);

    return (
        <section className="Profile">
            <div className="aside">
                <div className={controlMenu===0?"menu active":"menu"} onClick={()=>setControlMenu(0)}>
                    <img src={user} alt="menu"/>
                    <h2>Profile</h2>
                </div>
                <div className={controlMenu===1?"menu active":"menu"} onClick={()=>setControlMenu(1)}>
                    <img src={orders} alt="menu"/>
                    <h2>Orders</h2>
                </div>
            </div>
            <div className="display">
                {controlMenu===0?<>
                <div className="hori">
                    <img src={userpic} alt="user_img"/>
                    <button className="btn btn-black">Change Pic</button>
                </div>
                <input placeholder="Name" type="text"/>
                <input placeholder="Email" type="email"/>
                <input placeholder="Password" type="password"/>
                <input placeholder="Phone" type="number"/>
                <button className="btn btn-black">Save</button>

                <hr/>
                <h1>Saved Addresses</h1>
                <div className="address-item">
                    <h3>ADDRESS 2</h3>
                    <p>Jebra Cooper, Gifth Jason, Lorem Zone</p>
                    <p>United States, 847 Hawai</p>
                    <button className="btn btn-black">Edit</button>
                </div>
                <div className="address-item">
                    <h3>ADDRESS 2</h3>
                    <p>Jebra Cooper, Gifth Jason, Lorem Zone</p>
                    <p>United States, 847 Hawai</p>
                    <button className="btn btn-black">Edit</button>
                </div>
                <button className="btn btn-red">Add New Address</button>
                </>:
                <>
                <div className="order">
                    <h2>Order 5161hbh</h2>
                    <div className="hori">
                        <p>Status : <span className="active">DELIVERED</span></p>
                        <p>Date : <span className="date">14/5/2020</span></p>
                    </div>
                    <div className="last">
                        <p>See Details</p>
                    </div>
                </div>
                <div className="order">
                    <h2>Order 5161hbh</h2>
                    <div className="hori">
                        <p>Status : <span>In Progress</span></p>
                        <p>Date : <span className="date">14/5/2020</span></p>
                    </div>
                    <div className="last">
                        <p>See Details</p>
                        <button className="btn btn-red">Cancel</button>
                    </div>
                </div>
                <div className="order">
                    <h2>Order 5161hbh</h2>
                    <div className="hori">
                        <p>Status : <span className="inactive">Canceled</span></p>
                        <p>Date : <span className="date">14/5/2020</span></p>
                    </div>
                    <div className="last">
                        <p>See Details</p>
                    </div>
                </div>
                </>}
            </div>
        </section>
    );
};

export default Profile;