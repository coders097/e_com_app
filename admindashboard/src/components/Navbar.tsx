import React, { useState } from 'react';
import '../scss/Navbar.scss';
import userpic from '../assets/avatar.jpg';

const Navbar = ({setShowAside}:{
    setShowAside:React.Dispatch<React.SetStateAction<boolean>>
}) => {

    let [contextMenu,showContextMenu]=useState(false);

    return (
        <nav>
            <div onClick={()=>setShowAside(true)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h2>Dashboard</h2>
            <img src={userpic} alt="userpic" onClick={()=>showContextMenu(!contextMenu)}/> 
            {contextMenu?<div className="context-menu">
                <p><i className="fas fa-user-circle"></i>&nbsp; Profile</p>
                <p><i className="fas fa-sign-out-alt"></i>&nbsp; Logout</p>
            </div>:null}
        </nav>
    );
};

export default Navbar;