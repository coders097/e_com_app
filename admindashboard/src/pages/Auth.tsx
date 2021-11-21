import React, { createRef, useState } from 'react';
import logo from '../assets/logo.png';
import '../scss/Auth.scss';
import userpic from '../assets/avatar.jpg';

const Auth = () => {
    let [signInView,setSignInView]=useState(true);
    let inputPic = createRef<HTMLInputElement>();

    return (
        <section className="Auth">
            <div className="chooser">
                <p className={signInView?"":"--active"} onClick={()=>setSignInView(!signInView)}>Signup</p>
                <p className={signInView?"--active":""} onClick={()=>setSignInView(!signInView)}>Signin</p>
            </div>
            {signInView?<h1>#ebuy</h1>:null}
            {!signInView?<img alt="userpic" src={userpic} className="userpic" onClick={()=>inputPic.current?.click()}/>:null}
            {!signInView?<input type="file" style={{display:"none"}} ref={inputPic}/>:null}
            {!signInView?<input type="text" placeholder="Name"/>:null}
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            {!signInView?<input type="number" placeholder="Phone"/>:null}
            <button className="btn btn-black">{signInView?"Signin":"Signup"}</button>
            <div className="logo">
                <img alt="logo" src={logo} />
                <h2>Seller's zone</h2>
            </div>
        </section>
    );
};

export default Auth;