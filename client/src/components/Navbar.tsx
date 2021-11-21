import React, { createRef, useState } from 'react';
import '../scss/Navbar.scss';
import cart from '../assets/cart.png';
import wishlist from '../assets/love.png';
import logo from '../assets/logo.png';
import down from '../assets/down.png';
import user from '../assets/user.png';

import tech from '../assets/technav.jpg';
import fashion from '../assets/fashionnav.jpg';
import household from '../assets/householdnav.jpg';

const Navbar = () => {

    let navHoverPic=createRef<HTMLImageElement>();
    let [openNav,setOpenNav]=useState(false);
    let [showNoti,setNoti]=useState(true);

    return (
        <>
            {showNoti?<div className="nav-notification">
                <p>Spin The Wheel and Try Your Luck </p>
                <button>Get Lucky</button>
                <p className="close" onClick={()=>setNoti(false)}><i className="fas fa-times"></i></p>
            </div>:null}
            <nav>
                <div className="nav-menu" onClick={()=>setOpenNav(!openNav)}>
                    <p>Explore&nbsp;</p>
                    <img alt="down" src={down}/>
                </div>
                <div className="nav-menu" style={{marginLeft:"auto"}}>
                    <p>Wishlist&nbsp;&nbsp;</p>
                    <img alt="wishlist" src={wishlist}/>
                    <span>50</span>
                </div>
                <div className="nav-menu">
                    <p>Cart&nbsp;&nbsp;</p>
                    <img alt="cart" src={cart}/>
                    <span>5</span>
                </div>
                <div className="nav-menu">
                    <p>Mohan&nbsp;&nbsp;</p>
                    <img alt="user" src={user}/>
                </div>
                {openNav?<div className="hover-menu" style={showNoti?{top:"120px"}:{top:"80px"}}>
                    <div className="menu" onMouseEnter={()=>{
                        if(navHoverPic.current)
                            navHoverPic.current.src=tech;
                    }}>
                        <p>Tech</p>
                        <div className="submenu">
                            <p>Mobiles</p>
                            <p>Computers</p>
                            <p>TV</p>
                            <p>Gadgets</p>
                        </div>
                    </div>
                    <div className="menu" onMouseEnter={()=>{
                        if(navHoverPic.current)
                            navHoverPic.current.src=fashion;
                    }}>
                        <p>Fashion</p>
                        <div className="submenu">
                            <p>Man</p>
                            <div className="submenu">
                                <p>Tops</p>
                                <p>Bottoms</p>
                                <p>Footwear</p>
                            </div>
                        </div>
                        <div className="submenu">
                            <p>Woman</p>
                            <div className="submenu">
                                <p>Tops</p>
                                <p>Bottoms</p>
                                <p>Footwear</p>
                            </div>
                        </div>
                    </div>
                    <div className="menu" onMouseEnter={()=>{
                        if(navHoverPic.current)
                            navHoverPic.current.src=household;
                    }}>
                        <p>Household</p>
                        <div className="submenu">
                            <p>Ferniture</p>
                            <p>Accessories</p>
                        </div>
                    </div>
                    <img ref={navHoverPic} src={tech} alt="nav-menu-pic"/>
                </div>:null}
            </nav>
        </>
    );
};

export default Navbar;