import React from 'react';
import '../scss/Footer.scss';
import logo from '../assets/logo.png';
import StyleWrapper from './StyleWrapper';

import quickLinks from '../assets/quick-links.svg'; 
import payment from '../assets/payment-links.svg'; 
import shipping from '../assets/shipping-links.svg'; 
import cites from '../assets/countries-covered-links.svg'; 
import support from '../assets/support-links.svg'; 

const Footer = () => {
    return (
        <footer>
            <div className="footer-links">
                <div className="item">
                    <h2><img alt="item" src={quickLinks}/> QUICK LINKS</h2>
                    <ul className="popular-searches">
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Track Order</li>
                        <li>Shipping</li>
                        <li>Custom Tarrifs</li>
                    </ul>
                </div>
                <div className="item">
                    <h2><img alt="item" src={payment}/> PAYMENT</h2>
                    <ul className="popular-searches">
                        <li>Paypal</li>
                        <li>Visa</li>
                        <li>Mastercard</li>
                    </ul>
                </div>
                <div className="item">
                    <h2><img alt="item" src={shipping}/> SHIPPING</h2>
                    <ul className="popular-searches">
                        <li>Express Shipping <br/> 4-6 Business Days</li>
                        <li>Standard Shipping <br/> 10 Business Days</li>
                    </ul>
                </div>
                <div className="item">
                    <h2><img alt="item" src={cites}/> CITIES COVERED</h2>
                    <ul className="popular-searches">
                        <li>Delhi</li>
                        <li>Mumbai</li>
                        <li>Kolkata</li>
                        <li>Bengaluru</li>
                        <li>Punu</li>
                    </ul>
                </div>
                <div className="item">
                    <h2><img alt="item" src={support}/> 24/7 SUPPORT</h2>
                    <ul className="popular-searches">
                        <li>24/7 Support</li>
                        <li>Customer Care</li>
                        <li>+91 019999 77777</li>
                    </ul>
                </div>
            </div>
            <StyleWrapper>
                <ul className="popular-searches">
                    <li>Mobile & Tab</li>
                    <li>Fashion</li>
                    <li>Electronics</li>
                    <li>Perfume</li>
                    <li>Video Games</li>
                    <li>Furniture</li>
                </ul>
            </StyleWrapper>
            <div className="end">
                <p>Copyright © 2021 Ubuy Co. All rights reserved.</p>
                <ul className="popular-searches">
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                </ul>
                <div className="social-media">
                    <p>Follow Us</p>
                    <p><i className="fab fa-facebook"></i></p>
                    <p><i className="fab fa-instagram"></i></p>
                    <p><i className="fab fa-youtube"></i></p>
                    <p><i className="fab fa-twitter"></i></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;