import React from 'react';
import ProuductItem from '../components/ProuductItem';
import '../scss/SearchResults.scss';

const SearchResults = ({type}:{
    type:"wishlist" | "search"
}) => {
    return (
        <>
            <section className="SearchResults">
                <div className="control">
                    {type==='wishlist'?
                    <>
                        <h1>My Saved Items</h1>
                        <h2 className="middle">VIEW BY</h2>
                        <select>
                            <option value="price">Price</option>
                            <option value="date">Date</option>
                        </select>
                        <h2>SORT BY </h2>
                    </>
                    :<>
                        <h2>Display by </h2>
                        <select>
                            <option value="price">Price</option>
                            <option value="date">Date</option>
                        </select>
                        <h2>RESULT FOR - Killer Jeans</h2>
                        <h2 className="middle">SORT BY </h2>
                    </>}
                    <select>
                        <option value="incre">Increasing</option>
                        <option value="decre">Decreasing</option>
                    </select>
                </div>
                <div className="display">
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                    <ProuductItem/>
                </div>
                <div className="pagination">
                    <h2>SHOWING <span>20</span> OUT OF <span>100</span> RESULTS</h2>
                    <h2 className="middle">GO TO PAGE </h2>
                    <input type="text" placeholder="Page no"/>
                    <button className="btn">PREV</button>
                    <button className="btn">NEXT</button>
                    <h2>PAGE <span>5</span></h2>
                </div>
            </section>
        </>
    );
};

export default SearchResults;