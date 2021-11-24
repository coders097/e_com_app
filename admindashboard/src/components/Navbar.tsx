import React, { useState } from 'react';
import '../scss/Navbar.scss';
import userpic from '../assets/avatar.jpg';
import { AuthState } from '../state/authState';

const Navbar = ({setShowAside,authDispatch,authState,setEditProfileView}:{
    setShowAside:React.Dispatch<React.SetStateAction<boolean>>,
    authDispatch:React.Dispatch<{
        type: String;
        payload: AuthState;
    }>,
    authState:AuthState,
    setEditProfileView:React.Dispatch<React.SetStateAction<boolean>>
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
            <img src={`http://localhost:3001/auth/accountPic/${authState.pic}`} alt="userpic" onClick={()=>showContextMenu(!contextMenu)}/> 
            {contextMenu?<div className="context-menu">
                <p onClick={()=>{
                    setEditProfileView(true);
                    showContextMenu(false);
                }}><i className="fas fa-user-circle"></i>&nbsp; Profile</p>
                <p onClick={()=>authDispatch({
                    type:"LOGOUT",
                    payload:{} as AuthState
                })}><i className="fas fa-sign-out-alt"></i>&nbsp; Logout</p>
            </div>:null}
        </nav>
    );
};

export default Navbar;