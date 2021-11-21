import React from 'react';
import '../scss/ProductIdeas.scss';
import samsungdeals from '../assets/samsungdeals.jpg';

const ProductIdeas = () => {
    return (
        <div className="ProductIdeas">
            <img alt="deals" src={samsungdeals}/>
            <div className="details">
                <span className="tag">
                    Latest Deals
                </span>
                <h2>
                    Daily Deals. Best Offers from SAMSUNG
                </h2>
                <p>Get upto 20% off*</p>
                <p>USE CODE: SAMEBUY20</p>
                <button className="btn btn-round btn-red">Shop Now</button>
            </div>
        </div>
    );
};

export default ProductIdeas;