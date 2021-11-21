import React, { useState } from 'react';
import '../scss/Cart.scss';
import success from '../assets/success.svg';

import demo from '../assets/demo.jpg';

const Cart = () => {

    let [cartState,setCartState]=useState(3);
    let [coupon,setCoupon]=useState({
        display:false,
        couponDiscount:0
    });

    return (
        <section className="Cart">
            {cartState===0?<div className="display">
                <div className="item">
                    <img src={demo} alt="item"/>
                    <h2>Kitty Sone Kit</h2>
                    <div className="details">
                        <button className="btn btn-black"><i className="fas fa-minus"></i></button>
                        <p>2</p>
                        <button className="btn btn-black"><i className="fas fa-plus"></i></button>
                        <button className="btn btn-red"><i className="fas fa-times"></i></button>
                    </div>
                </div>
            </div>:null}
            {cartState===1?<div className="checkout">
                <h2>SELECT ADDRESS</h2>
                <div className="address-item -active">
                    <h3>ADDRESS 1 <span><i className="fas fa-check-circle"></i></span></h3>
                    <p>Brady Cooper, Fifth Avenue, Central Zone</p>
                    <p>United States, 2917 Avenue</p>
                </div>
                <div className="address-item">
                    <h3>ADDRESS 2</h3>
                    <p>Jebra Cooper, Gifth Jason, Lorem Zone</p>
                    <p>United States, 847 Hawai</p>
                </div>
                <h2>PAYMENT METHOD</h2>
                <div className="payment-item -active">
                    <div><i className="fas fa-check-circle"></i>
                    </div>
                    <span><i className="fas fa-credit-card"></i></span>
                    <h2>Debit / Credit Card</h2>
                </div>
                <div className="payment-item">
                    <div>
                    </div>
                    <span><i className="fas fa-money-bill-alt"></i></span>
                    <h2>Cash On Delivery</h2>
                </div>
                <div className="payment-item">
                    <div>
                    </div>
                    <span><i className="fas fa-wallet"></i></span>
                    <h2>Google, Amazon UPI</h2>
                </div>
            </div>:null}
            {cartState===2?<div className="payment-view">
                payment view stripe
            </div>:null}
            {cartState===3?<div className="final-thanks">
                <img src={success} alt="success" className="enlarge"/>
                <h1>Your order is successfully placed!</h1>
                <button className="btn btn-black">Shop More</button>
            </div>:null}
            <div className="control">
                <div className="coupon">
                    {coupon.display?<>
                    <h2>Apply Coupon</h2>
                    <input placeholder="Code" type="text"/>
                    <button className="btn btn-black">Apply</button>
                    </>:<><h2>Coupon Applied</h2>
                    <div>
                            SUM958H <i className="fas fa-times"></i>
                    </div></>}
                </div>
                <div className="total">
                    <p><span>TOTAL :</span> $58445.515</p>
                    <p><span>DISCOUNT :</span> $5151.515</p>
                    <p><span>COUPON :</span> $5161.5</p>
                    <hr/>
                    <p><span>FINAL :</span> $65116.55</p>
                    <div>
                        <button className="btn btn-black">PREV</button>
                        <button className="btn btn-black">CHECKOUT</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;