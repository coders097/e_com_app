import React, { createRef, FormEvent, useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import '../scss/Auth.scss';
import userpic from '../assets/avatar.jpg';
import { AuthState } from '../state/authState';

const Auth = ({
    authState,authDispatch
}:{
    authState:AuthState,
    authDispatch:React.Dispatch<{
        type: String;
        payload: AuthState;
    }>
}) => {

    useEffect(()=>{
        let login_cache:any=localStorage.getItem('account-login');
        if(login_cache){
            login_cache=JSON.parse(login_cache) as AuthState;
            authDispatch({
                type:"LOGIN",
                payload:login_cache
            }); 
        }
    },[]);

    let [signInView,setSignInView]=useState(true);
    let inputPic = createRef<HTMLInputElement>();
    let userPicView=createRef<HTMLImageElement>();

    let nameInput=createRef<HTMLInputElement>();
    let emailInput=createRef<HTMLInputElement>();
    let passwordInput=createRef<HTMLInputElement>();
    let phoneInput=createRef<HTMLInputElement>();

    let signin=(e:FormEvent)=>{
        if(emailInput.current && passwordInput.current){
            if(emailInput.current.checkValidity() && passwordInput.current.checkValidity()){
                e.preventDefault();
                fetch("http://localhost:3001/auth/signin",{
                    method:"POST",
                    headers:{
                        'Content-Type':"application/json"
                    },
                    body:JSON.stringify({
                        password:passwordInput.current.value, 
                        email:emailInput.current.value,
                        mode:"admin"
                    })
                }).then(res=>res.json())
                .then((data:any)=>{
                    if(data.success){
                        authDispatch({
                            type:"LOGIN",
                            payload:{
                                loggedIn:true,
                                ...data.data
                            }
                        }); 
                    }else{
                        alert(data.error);
                    }
                }).catch(err=>alert(err));
            }
        }
    }

    let signup=(e:FormEvent)=>{
        if(nameInput.current && emailInput.current && passwordInput.current && phoneInput.current){
            if(emailInput.current.checkValidity() && passwordInput.current.checkValidity() && nameInput.current.checkValidity()
                && phoneInput.current.checkValidity()){
                e.preventDefault();
                let formData=new FormData();
                formData.append("mode","admin");
                // name, email, password,phone
                if(inputPic.current && inputPic.current.files && inputPic.current.files.length>0){
                    formData.append("pic",inputPic.current.files[0]);
                    formData.append("name",nameInput.current.value);
                    formData.append("email",emailInput.current.value);
                    formData.append("password",passwordInput.current.value);
                    formData.append("phone",phoneInput.current.value);
                }
                fetch("http://localhost:3001/auth/signup",{
                    method:"POST",
                    body:formData
                }).then(res=>res.json())
                .then((data:any)=>{
                    if(data.success){
                        alert("Success! Now Login!");
                        setSignInView(true);
                    }else{
                        alert(data.error);
                    }
                }).catch(err=>alert(err));
            }
        }
    }

    return (
        <form className="Auth">
            <div className="chooser">
                <p className={signInView?"":"--active"} onClick={()=>setSignInView(!signInView)}>Signup</p>
                <p className={signInView?"--active":""} onClick={()=>setSignInView(!signInView)}>Signin</p>
            </div>
            {signInView?<h1>#ebuy</h1>:null}
            {!signInView?<img ref={userPicView} alt="userpic" src={userpic} className="userpic" onClick={()=>inputPic.current?.click()}/>:null}
            {!signInView?<input type="file" style={{display:"none"}} ref={inputPic} onChange={(e)=>{
                if(e.target.files && e.target.files?.length>0){
                    if(userPicView.current) {
                        let url=URL.createObjectURL(e.target.files[0]);
                        if(userPicView.current) userPicView.current.src=url;
                        setTimeout(()=>{
                            URL.revokeObjectURL(url);
                        },3000);
                    }
                }else if(userPicView.current) userPicView.current.src=userpic;
            }}/>:null}
            {!signInView?<input type="text" placeholder="Name" required minLength={3} ref={nameInput}/>:null}
            <input type="email" placeholder="Email" required ref={emailInput}/>
            <input type="password" placeholder="Password" required minLength={5} ref={passwordInput}/>
            {!signInView?<input type="number" placeholder="Phone" required minLength={10} ref={phoneInput}/>:null}
            <button className="btn btn-black" onClick={(e)=>signInView?signin(e):signup(e)}>{signInView?"Signin":"Signup"}</button>
            <div className="logo">
                <img alt="logo" src={logo} />
                <h2>Seller's zone</h2>
            </div>
        </form>
    );
};

export default Auth;