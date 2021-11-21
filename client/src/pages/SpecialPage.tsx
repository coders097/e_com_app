import React from 'react';
import '../scss/SpecialPage.scss';

import spinwheel from '../assets/spinwheel.png';
import anchor from '../assets/anchor.png';

const SpecialPage = () => {
    return (
        <section className="SpecialPage">
            <div className="left">
                <h1>Spin the Wheel</h1>
                <p>Don't miss out the chance to win big discounts. Spin the wheel NOW to shop your favorites from 100 million products!</p>

                <h2>Terms and conditions:-</h2>
                <p>1. Coupons are limited to single use per customer.</p>
                <p>2. Coupons can be used only once.</p>
                <p>3. Coupons can only be used if your logged in.</p>
                <p>4. Coupons have an expiry date and time. So try to grab them as soon as you can.</p>
                <p>5. Lastly hope you have an amazing shopping experience with us. Cheers :)</p>
                <h2>Your coupon &nbsp; &nbsp;<span>v16d1dvdv16</span></h2>
                
            </div>
            <div className="right">
                <img src={anchor} alt="anchor"/>
                <img src={spinwheel} alt="spinwheel"/>
            </div>
        </section>
    );
};

export default SpecialPage;