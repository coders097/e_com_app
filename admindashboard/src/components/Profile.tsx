import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import '../scss/Profile.scss';

import UserPic from '../assets/avatar.jpg';
import { AuthState } from '../state/authState';

const Profile = ({authState,authDispatch,setEditProfileView}:{
    authState:AuthState,
    authDispatch:React.Dispatch<{
        type: String;
        payload: AuthState;
    }>,
    setEditProfileView:React.Dispatch<React.SetStateAction<boolean>>
}) => {

    let userImgInput=createRef<HTMLInputElement>();
    let userImg=createRef<HTMLImageElement>();
    let nameInput=createRef<HTMLInputElement>();
    let emailInput=createRef<HTMLInputElement>();
    let passwordInput=createRef<HTMLInputElement>();
    let phoneInput=createRef<HTMLInputElement>();

    let save=()=>{
        let formData=new FormData();
        formData.append("mode","admin");
        formData.append("id",authState._id);
        if(nameInput.current && (nameInput.current.value!==authState.name))
            formData.append("name",nameInput.current.value);
        if(emailInput.current && (emailInput.current.value!==authState.email))
            formData.append("email",emailInput.current.value);
        try{
            if(phoneInput.current && (parseInt(phoneInput.current.value)!==authState.phone))
                formData.append("phone",phoneInput.current.value);
        }catch(e){}
        if(passwordInput.current && passwordInput.current.value.trim()!=="")
            formData.append("password",passwordInput.current.value);
        if(userImgInput.current && userImgInput.current.files && userImgInput.current.files.length>0){
            formData.append("pic",userImgInput.current.files[0]);
        }
        let oldPassword=prompt("Enter your current password");
        if(oldPassword!=null)
            formData.append("oldPassword",oldPassword);
        else return;
        fetch("http://localhost:3001/auth/editProfile",{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${authState.token}`
            },
            body:formData
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                authDispatch({
                    type:"UPDATE",
                    payload:{
                        ...authState,
                        ...data.data
                    }
                });
            }else{
                alert(data.error);
            }
        }).catch(err=>alert(err));
    }

    let deleteUser=()=>{
        fetch("http://localhost:3001/auth/deleteProfile",{
            method:"DELETE",
            headers:{
                'Content-Type':"application/json",
                "Authorization":`Bearer ${authState.token}`
            },
            body:JSON.stringify({
                id:authState._id , 
                mode:'admin',
                password:prompt("Enter your current password!")
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                authDispatch({
                    type:"LOGOUT",
                    payload:{} as AuthState
                });
            }else{
                alert(data.error);
            }
        }).catch(err=>{
            alert(err);
        });
    }

    return (
        ReactDOM.createPortal(<div className="ProfileView">
            <div className="header">
                <h2>Edit Profile</h2>
                <p onClick={()=>setEditProfileView(false)}><i className="fas fa-times"></i></p>
            </div>
            <div className="body">
                <img onClick={()=>userImgInput.current?.click()} ref={userImg} title="Click to change your userpic!" alt="userpic" src={`http://localhost:3001/auth/accountPic/${authState.pic}`}/>
                <input style={{display:"none"}} type="file" ref={userImgInput} onChange={(e)=>{
                    if(e.target.files && e.target.files?.length>0){
                        let url=URL.createObjectURL(e.target.files[0]);
                        if(userImg.current)
                            userImg.current.src=url;
                        setTimeout(()=>{
                            URL.revokeObjectURL(url);
                        },3000);
                    }else{
                        if(userImg.current)
                            userImg.current.src=`http://localhost:3001/auth/accountPic/${authState.pic}`;
                    }
                }}/>
                <input type="text" placeholder="Name" defaultValue={authState.name} ref={nameInput}/>
                <input type="email" placeholder="Email" defaultValue={authState.email} ref={emailInput}/>
                <input type="password" placeholder="*********new password******" ref={passwordInput}/>
                <input type="number" placeholder="Phone" defaultValue={authState.phone} ref={phoneInput}/>
                <div>
                    <button className="btn btn-black" onClick={()=>save()}>Save</button>
                    <button className="btn btn-red" onClick={()=>deleteUser()}>Delete</button>
                    <button className="btn" style={{marginLeft:"auto"}} onClick={()=>userImgInput.current?.click()}>Change Pic</button>
                </div>

            </div>

        </div>,document.getElementById("profile-pop-window") as HTMLElement)
    );
};

export default Profile;