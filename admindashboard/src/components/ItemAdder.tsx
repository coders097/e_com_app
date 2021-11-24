import React, { createRef, FormEvent, useState } from 'react';
import '../scss/ItemAdder.scss';
import demo from '../assets/demo.jpg';
import { AuthState } from '../state/authState';
import { ItemState } from '../state/itemsState';

const ItemAdder = ({authState,items,setItems}:{
    authState:AuthState,
    items:ItemState[],
    setItems:React.Dispatch<{
        type: String;
        payload: ItemState[];
    }>
}) => {

    let selectImagesInput=createRef<HTMLInputElement>();
    let [selectedImages,setSelectedImages]=useState<FileList | null>(null);

    let title=createRef<HTMLInputElement>();
    let quantity=createRef<HTMLInputElement>();
    let price=createRef<HTMLInputElement>();
    let details=createRef<HTMLTextAreaElement>();
    let group=createRef<HTMLSelectElement>();
    let subgroup=createRef<HTMLSelectElement>();

    let addProduct=(e:FormEvent)=>{
        if(title.current?.checkValidity() && quantity.current?.checkValidity() && price.current?.checkValidity()){
            e.preventDefault();
            if(!selectedImages || (selectedImages?.length===0)){
                alert("Select Some Images!")
                return;
            }
            if(group.current?.value==='choose'){
                alert("Select it's Group!")
                return;
            }
            if(subgroup.current?.value==='choose'){
                alert("Select it's Subgroup!")
                return;
            }
            let formData=new FormData();
            formData.append("title",title.current.value);
            formData.append("qty",quantity.current.value);
            formData.append("price",price.current.value);
            formData.append("sellerId",authState._id);
            formData.append("group",group.current!.value);
            formData.append("subgroup",subgroup.current!.value);
            if(details.current){
                formData.append("desc",details.current.value);
            }
            if(selectedImages)
                Array.from(selectedImages).forEach((file:File,i:number)=>formData.append(`pic${i}`,file));

            fetch("http://localhost:3001/admin/addProduct",{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${authState.token}`,
                },
                body:formData
            }).then(res=>res.json())
            .then(data=>{
                if(data.success){
                    items.push(data.data);
                    let newItems=[...items];
                    setItems({
                        type:"ADD",
                        payload:newItems
                    });
                    alert("Item Added Successfully!");
                    if(title.current) title.current.value="";
                    if(quantity.current) quantity.current.value="";
                    if(price.current) price.current.value="";
                    if(group.current) group.current.value="choose";
                    if(subgroup.current) subgroup.current.value="choose";
                    setSelectedImages(null);
                }else{
                    alert(data.error);
                }
            }).catch(err=>alert(err));
        }
    }

    return (
        <form className="ItemAdder">
            <h1>Add an item...</h1>
            <div className="pics-display">
                {/* <img src={demo} alt="demo"/> */}
                {(selectedImages && selectedImages.length>0)?
                Array.from(selectedImages).map((file:File,i)=>{
                    let url=URL.createObjectURL(file);
                    setTimeout(()=>{
                        URL.revokeObjectURL(url);
                    },3000);
                    return <img src={url} alt="demo" key={i}/>;
                })
                :<h2>Select Images</h2>}
                
            </div>
            <input placeholder="Title" type="text" required={true} ref={title} minLength={3}/>
            <input placeholder="Quantity" type="number" required={true} ref={quantity}/>
            <input placeholder="Price" type="number" required={true} ref={price}/>
            <textarea rows={4} placeholder="Details (separated with <$>)" ref={details} />
            <div className="item-type-chooser">
                <select required={true} ref={group}>
                    <option value="choose">Select Group</option>
                    <option value="fashion">Fashion</option>
                    <option value="tech">Tech</option>
                    <option value="household">Household</option>
                </select>
                <select required={true} ref={subgroup}>
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
                <input type="file" multiple={true} style={{display:"none"}} ref={selectImagesInput} onChange={(e)=>setSelectedImages(e.target.files)}/>
                <button className="btn btn-black" onClick={(e)=>{
                    e.preventDefault();
                    selectImagesInput.current?.click();
                }}>Add Images</button>
            </div>
            <hr/>
            <button className="btn btn-red" onClick={(e)=>addProduct(e)}>Add Product</button>
        </form>
    );
};

export default ItemAdder;