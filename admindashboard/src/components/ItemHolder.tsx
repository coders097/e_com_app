import React, { useState } from 'react';
import '../scss/ItemHolder.scss';
import demo from '../assets/demo.jpg';

const ItemHolder = () => {
    let [typeView,setTypeView]=useState(false);
    return (
        <section className="ItemHolder">
            <div className="menu">
                <p onClick={()=>setTypeView(false)} className={typeView?"":"--active"}><i className="fas fa-th-large"></i>&nbsp; Grid</p>
                <p onClick={()=>setTypeView(true)} className={typeView?"--active":""}><i className="fas fa-th-list"></i>&nbsp; List</p>
            </div>
            <div className="display" style={typeView?{justifyContent: "space-evenly"}:{}}>
                <div className={typeView?"Item-vertical":"Item-horizontal"}>
                    <img src={demo} alt="product"/>
                    <div>
                        <h2>Chair Ipsum baba</h2>
                        <p>Price : <span>$1000</span></p>
                        <p>Quantity : <span>10</span></p>
                    </div>
                </div>
                <div className={typeView?"Item-vertical":"Item-horizontal"}>
                    <img src={demo} alt="product"/>
                    <div>
                        <h2>Chair Ipsum baba</h2>
                        <p>Price : <span>$1000</span></p>
                        <p>Quantity : <span>10</span></p>
                    </div>
                </div>
                <div className={typeView?"Item-vertical":"Item-horizontal"}>
                    <img src={demo} alt="product"/>
                    <div>
                        <h2>Chair Ipsum baba</h2>
                        <p>Price : <span>$1000</span></p>
                        <p>Quantity : <span>10</span></p>
                    </div>
                </div>
                <div className={typeView?"Item-vertical":"Item-horizontal"}>
                    <img src={demo} alt="product"/>
                    <div>
                        <h2>Chair Ipsum baba</h2>
                        <p>Price : <span>$1000</span></p>
                        <p>Quantity : <span>10</span></p>
                    </div>
                </div>
                <div className={typeView?"Item-vertical":"Item-horizontal"}>
                    <img src={demo} alt="product"/>
                    <div>
                        <h2>Chair Ipsum baba</h2>
                        <p>Price : <span>$1000</span></p>
                        <p>Quantity : <span>10</span></p>
                    </div>
                </div>
                <div className={typeView?"Item-vertical":"Item-horizontal"}>
                    <img src={demo} alt="product"/>
                    <div>
                        <h2>Chair Ipsum baba</h2>
                        <p>Price : <span>$1000</span></p>
                        <p>Quantity : <span>10</span></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemHolder;