import React from 'react';
import '../scss/ItemAdder.scss';
import demo from '../assets/demo.jpg';

const ItemAdder = () => {
    return (
        <form className="ItemAdder">
            <h1>Add an item...</h1>
            <div className="pics-display">
                {/* <img src={demo} alt="demo"/> */}
                <h2>Select Images</h2>
            </div>
            <input placeholder="Title" type="text"/>
            <input placeholder="Quantity" type="number"/>
            <input placeholder="Price" type="number"/>
            <textarea rows={4} placeholder="Details (separated with <$>)"/>
            <div className="item-type-chooser">
                <select>
                    <option value="choose">Select Group</option>
                    <option value="fashion">Fashion</option>
                    <option value="tech">Tech</option>
                    <option value="household">Household</option>
                </select>
                <select>
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
                <button className="btn btn-black">Add Images</button>
            </div>
            <hr/>
            <button className="btn btn-red">Add Product</button>
        </form>
    );
};

export default ItemAdder;