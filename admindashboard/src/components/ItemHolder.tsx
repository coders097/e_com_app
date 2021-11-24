import React, { createRef, useEffect, useState } from 'react';
import '../scss/ItemHolder.scss';
import demo from '../assets/demo.jpg';
import { AuthState } from '../state/authState';
import { ItemState } from '../state/itemsState';

const ItemHolder = ({authState,items,setItems,setSelectedItem,setContent}:{
    authState:AuthState,
    items:ItemState[],
    setItems:React.Dispatch<{
        type: String;
        payload: ItemState[];
    }>,
    setSelectedItem:React.Dispatch<React.SetStateAction<ItemState | null>>,
    setContent:React.Dispatch<React.SetStateAction<number>>
}) => {

    let [localItems,setLocalItems]=useState<ItemState[]>([]);
    useEffect(()=>{
        setLocalItems(items);
    },[items]);

    let [typeView,setTypeView]=useState(false);

    let searchInput=createRef<HTMLInputElement>();
    let searchInputType=createRef<HTMLSelectElement>();
    let search=()=>{
        if(searchInput.current?.value.trim()===""){
            setLocalItems(items);
            return;
        }
        if(searchInputType.current && searchInput.current){
            let searchValue=searchInput.current.value.trim().toLowerCase();
            let type=searchInputType.current.value;
            if(type==='name'){
                let _items=items.filter(__item=>__item.title.toLowerCase().includes(searchValue));
                setLocalItems(_items);
            }else if(type==='price'){
                let priceRanges=searchValue.split("-");
                try{
                    if(priceRanges[1]){
                        let rangeA=parseInt(priceRanges[0].trim());
                        let rangeB=parseInt(priceRanges[1].trim());
                        let _items=items.filter(__item=>(rangeA<=__item.price) && (rangeB>=__item.price));
                        setLocalItems(_items);
                    }else{
                        let price=parseInt(priceRanges[0].trim());
                        let _items=items.filter(__item=>__item.price==price);
                        setLocalItems(_items);
                    }
                }catch(e){
                    alert("Hey Search Properly :)");
                }
            }else if(type==='date'){
                let dateRanges=searchValue.split("-");
                try{
                    if(dateRanges[1]){
                        let parts:string[]=dateRanges[0].trim().split("/");
                        let dateRangeX=new Date(parseInt(parts[2]),parseInt(parts[1])-1,parseInt(parts[0])).getTime();
                        parts=dateRanges[1].trim().split("/");
                        let dateRangeY=new Date(parseInt(parts[2]),parseInt(parts[1])-1,parseInt(parts[0])).getTime();
                        let _items=items.filter(__item=>{
                            return (new Date(__item.creationDate).getTime()>=dateRangeX) && (new Date(__item.creationDate).getTime()<=dateRangeY);
                        });
                        setLocalItems(_items);
                    }else{
                        let parts:string[]=dateRanges[0].split("/");
                        let newDate=new Date(parseInt(parts[2]),parseInt(parts[1])-1,parseInt(parts[0])).getTime();
                        let _items=items.filter(__item=>{
                            return new Date(__item.creationDate).getTime()>=newDate;
                        });
                        setLocalItems(_items);
                    }
                }catch(e){
                    alert("Hey Search Properly :)");
                }
            }
        }
    }

    return (
        <section className="ItemHolder">
            <div className="menu">
                <select ref={searchInputType} onChange={(e)=>{
                    if(e.target.value==="name"){
                        if(searchInput.current) searchInput.current.placeholder="type 'name' of anything...";
                    }else if(e.target.value==="price"){
                        if(searchInput.current) searchInput.current.placeholder="search prices :: 1560 - 9870...";
                    }else if(e.target.value==="date"){
                        if(searchInput.current) searchInput.current.placeholder="search dates :: 10/5/2020 - 11/6/2021...";
                    }
                }}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="date">Date</option>
                </select>
                <input type="text" placeholder="type 'name' of anything..." ref={searchInput}/>
                <button className="btn btn-black" onClick={()=>search()}><i className="fas fa-search"></i></button>
                <p style={{marginLeft:"auto"}} onClick={()=>setTypeView(false)} className={typeView?"":"--active"}><i className="fas fa-th-large"></i>&nbsp; Grid</p>
                <p onClick={()=>setTypeView(true)} className={typeView?"--active":""}><i className="fas fa-th-list"></i>&nbsp; List</p>
            </div>
            <div className="display" style={typeView?{justifyContent: "space-evenly"}:{}}>
                {localItems.map((item,i)=>{
                    return <div key={i} className={typeView?"Item-vertical":"Item-horizontal"} >
                        <img src={`http://localhost:3001/admin/itemPic/${item.pics[0]}/${authState.token}`} alt="product"/>
                        <div>
                            <h2 onClick={()=>{
                                setSelectedItem(item);
                                setContent(3);
                            }}>{item.title}</h2>
                            <p>Price : <span>${item.price}</span></p>
                            <p>Quantity : <span>{item.qty}</span></p>
                        </div>
                    </div>;  
                })}
                
            </div>
        </section>
    );
};

export default ItemHolder;