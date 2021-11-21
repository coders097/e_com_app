import React from 'react';
import '../scss/ProductPage.scss';

import userpic from '../assets/userpic.jpg';
import ProuductItem from '../components/ProuductItem';
import demo from '../assets/demo.jpg';
import ProductCarousal from '../components/ProductCarousal';


const ProductPage = () => {
    return (
        <section className="ProductPage">
            <div className="product-view">
                <div className="left">
                    {/* <img src={demo} alt="single-view"/> */}
                    <ProductCarousal/>
                </div>
                <div className="right">
                    <h3>CLOTHES</h3>
                    <h1>Badol Sweater Pink Carbon Blue Woolen</h1>
                    <h2>Item #: 5515133</h2>
                    <h1 className="rating">
                        <span>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </span>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </h1>
                    <p className="price">$258</p>
                    <p>Availability <span>In Stock</span></p>
                    <div>
                        <select>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                        <button className="btn btn-black">
                        <i className="fas fa-cart-plus"></i>&nbsp;&nbsp;ADD TO CART
                        </button>
                    </div>
                    <ul>
                        <button className="btn btn-black">Add to Wishlist</button>
                        <button className="btn btn-black">
                            <i className="fas fa-share"></i> &nbsp;Share
                        </button>
                    </ul>
                </div>
            </div>
            <div className="product-details">
                <h2>Product Details</h2>
                <ul>
                    <li>Best of Quality</li>
                    <li>Quality Material</li>
                    <li>Top Imported From US</li>
                </ul>
            </div>
            <div className="related-items">
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
                <ProuductItem/>
            </div>
            <div className="product-comments">
                <div className="add-comment">
                    <textarea rows={3} placeholder="Comment here"/>
                    <button className="btn btn-black">POST COMMENT</button>
                </div>
                <div className="comment">
                    <div className="com-user">
                        <img src={userpic} alt="pic"/>
                    </div>
                    <div className="com-text">
                        <h2>Worst Product Ever</h2>
                        <p>Great for gift to give to persons.</p>
                        <h1>
                            <span>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </span>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </h1>
                        <h4>Lorem Ji</h4>
                    </div>
                </div>
            </div>
        </section>
    );
}; 

export default ProductPage;