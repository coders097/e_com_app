import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../scss/Dashboard.scss';
import logo from '../assets/logo.png';
import ItemHolder from '../components/ItemHolder';
import ItemAdder from '../components/ItemAdder';
import Orders from '../components/Orders';
import ItemView from '../components/ItemView';
import { AuthState } from '../state/authState';
import { ItemState } from '../state/itemsState';
import Profile from '../components/Profile';

const Dashboard = ({
    authState,authDispatch,items,setItems
}:{
    authState:AuthState,
    authDispatch:React.Dispatch<{
        type: String;
        payload: AuthState;
    }>,
    items:ItemState[],
    setItems:React.Dispatch<{
        type: String;
        payload: ItemState[];
    }>
}) => {
    let [showAside,setShowAside]=useState(false);
    let [content,setContent]=useState(1);
    let [selectedItem,setSelectedItem]=useState<ItemState | null>(null);
    let [editProfileView,setEditProfileView]=useState(false);

    useEffect(()=>{
        if(authState.loggedIn)
            fetch('http://localhost:3001/admin/fetchProducts',{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${authState.token}`,
                },
            }).then(res=>res.json())
            .then(data=>{
                if(data.success){
                    setItems({
                        type:"LOAD",
                        payload:data.data
                    });
                    
                }else alert(data.error);
            }).catch(err=>alert(err));
    },[authState]);

    return (
        <>
            <Navbar setShowAside={setShowAside} authDispatch={authDispatch} authState={authState} setEditProfileView={setEditProfileView}/>
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
            {content===0?<ItemAdder authState={authState} items={items} setItems={setItems}/>:null}
            {content===1?<ItemHolder setContent={setContent} authState={authState} items={items} setItems={setItems} setSelectedItem={setSelectedItem}/>:null}
            {content===2?<Orders/>:null}
            {content===3?<ItemView items={items} setItems={setItems} item={selectedItem} setContent={setContent} authState={authState}/>:null}
            {/* <ItemView/> */}
            {editProfileView?<Profile authState={authState} authDispatch={authDispatch} setEditProfileView={setEditProfileView}/>:null}
        </>
    );
};

export default Dashboard;