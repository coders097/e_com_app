import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../scss/Dashboard.scss';
import logo from '../assets/logo.png';
import ItemHolder from '../components/ItemHolder';
import ItemAdder from '../components/ItemAdder';
import Orders from '../components/Orders';
import ItemView from '../components/ItemView';

const Dashboard = () => {
    let [showAside,setShowAside]=useState(false);
    let [content,setContent]=useState(1);
    return (
        <>
            <Navbar setShowAside={setShowAside}/>
            <aside style={showAside?{}:{transform:"translateX(-100%)",visibility:"hidden",opacity:0}}>
                <div className="logo">
                    <img alt="logo" src={logo} />
                    <h2>Seller's zone</h2>
                    <p onClick={()=>setShowAside(false)}><i className="fas fa-times"></i></p>
                </div>
                <div className={content===0?"option --active":"option"} onClick={()=>{
                    setContent(0);setShowAside(false);
                }}>
                    <p>&nbsp;<i className="fas fa-plus"></i>&nbsp; Add Item</p>
                </div>
                <div className={content===1?"option --active":"option"} onClick={()=>{
                    setContent(1);setShowAside(false);
                }}>
                    <p>&nbsp;<i className="fas fa-baseball-ball"></i>&nbsp; My Items</p>
                </div>
                <div className={content===2?"option --active":"option"} onClick={()=>{
                    setContent(2);setShowAside(false);
                }}>
                    <p><i className="fas fa-box-open"></i>&nbsp; My Orders</p>
                </div>
            </aside>
            {content===0?<ItemAdder/>:null}
            {content===1?<ItemHolder/>:null}
            {content===2?<Orders/>:null}
            {/* <ItemView/> */}
        </>
    );
};

export default Dashboard;