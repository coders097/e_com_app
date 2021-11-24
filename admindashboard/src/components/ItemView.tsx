import React, { createRef, useState } from 'react';
import '../scss/ItemView.scss';
import demo from '../assets/demo.jpg';
import { ItemState } from '../state/itemsState';
import { AuthState } from '../state/authState';

const ItemView = ({item,setContent,authState,items,setItems}:{
    item:ItemState | null,
    setContent:React.Dispatch<React.SetStateAction<number>>,
    authState:AuthState,
    items:ItemState[],
    setItems:React.Dispatch<{
        type: String;
        payload: ItemState[];
    }>
}) => {

    let [editMode,setEditMode]=useState(false);
    let priceInput=createRef<HTMLInputElement>();
    let qtyInput=createRef<HTMLInputElement>();
    let titleInput=createRef<HTMLInputElement>();
    let descInput=createRef<HTMLTextAreaElement>();
    let groupInput=createRef<HTMLSelectElement>();
    let subgroupInput=createRef<HTMLSelectElement>();


    let deleteItem=()=>{
        fetch("http://localhost:3001/admin/deleteProduct",{
            method:"DELETE",
            headers:{
                'Content-Type':"application/json",
                "Authorization":`Bearer ${authState.token}`,
            },
            body:JSON.stringify({
                productId:item?._id
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                items=items.filter(_item=>_item._id!=item?._id);
                setItems({
                    type:"DELETE",
                    payload:items
                });
                setContent(1);
            }else{
                alert(data.error);
            }
        }).catch(err=>alert(err));
    }


    let updateItem=()=>{
        fetch("http://localhost:3001/admin/updateProduct",{
            method:"PATCH",
            headers:{
                'Content-Type':"application/json",
                "Authorization":`Bearer ${authState.token}`,
            },
            body:JSON.stringify({
                price:priceInput.current?.value,
                productId:item?._id,
                qty:qtyInput.current?.value,
                desc:descInput.current?.value,
                title:titleInput.current?.value,
                group:groupInput.current?.value,
                subgroup:subgroupInput.current?.value
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                let _item=items.find(__item=>__item._id==item?._id);
                if(_item && priceInput.current && groupInput.current && subgroupInput.current && qtyInput.current && descInput.current && titleInput.current){
                    _item.price=parseInt(priceInput.current.value+"");
                    _item.qty=parseInt(qtyInput.current.value+"");
                    _item.desc=descInput.current.value;
                    _item.title=titleInput.current.value;
                    _item.group=groupInput.current.value;
                    _item.subgroup=subgroupInput.current.value;
                }
                setItems({
                    type:"UPDATE",
                    payload:[...items]
                });
                setEditMode(false);
            }else{
                alert(data.error);
            }
        }).catch(err=>alert(err));
    }

    return (
        <section className="ItemView">
            <button className="btn btn-black" onClick={()=>setContent(1)}>Back</button>
            {!editMode?<h2 className="group">{item?.group} {">"} {item?.subgroup}</h2>:null}
            <div className="pics">
                {item?.pics.map((itempic,i)=><img src={`http://localhost:3001/admin/itemPic/${itempic}/${authState.token}`} alt="" key={i}/>)}
            </div>
            {!editMode?
            <>
                <h1>{item?.title}</h1>
                <h2 className="price">$ {item?.price}</h2>
                <h2 className="price">Quantity : {item?.qty}</h2>
                <div className="description">
                    <p>- Soft & Cozy</p>
                    <p>- Bitch Motherfucker</p>
                </div>
            </>:
            <>
                <input ref={titleInput} type="text" placeholder={item?.title} defaultValue={item?.title}/>
                <input ref={priceInput} type="number" placeholder={"Price : "+item?.price+""} defaultValue={item?.price}/>
                <input ref={qtyInput} type="number" placeholder={"Quantity : "+item?.qty+""} defaultValue={item?.qty}/>
                <select ref={groupInput} defaultValue={item?.group}>
                    <option value="choose">Select Group</option>
                    <option value="fashion">Fashion</option>
                    <option value="tech">Tech</option>
                    <option value="household">Household</option>
                </select>
                <select ref={subgroupInput} defaultValue={item?.subgroup}>
                    <option value="choose">Select Subgroup</option>
                    <option value="mobile">mobile</option>
                    <option value="comp">comp</option>
                    <option value="gadgets">gadgets</option>
                    <option value="tv">tv</option>
                    <option value="men">men</option>
                    <option value="women">women</option>
                    <option value="furniture">furniture</option>
                    <option value="accessories">accessories</option>
                </select>
                <textarea ref={descInput} placeholder={item?.desc} defaultValue={item?.desc}/>
            </>}
            <div className="controls">
                {editMode?<button className="btn btn-green" onClick={()=>updateItem()}>Save</button>:null}
                {!editMode?<button className="btn btn-black" onClick={()=>setEditMode(true)}>Edit</button>:null}
                {!editMode?<button className="btn btn-red" onClick={()=>deleteItem()}>Delete</button>:null}
            </div>

        </section>
    );
};

export default ItemView;