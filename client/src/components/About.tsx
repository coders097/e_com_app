import React from 'react';
import '../scss/About.scss';

import SampleUser from '../assets/profile-dumy.jpg';

const About = () => {
    return (
        <>
            <section className="About-us">
                <h2>eBuy India</h2>
                <p>The Ultimate International Online Shopping Experience Plateform in India</p>
                <hr/>
                <p>ebuy offers you the opportunity to choose top branded products sitting in the comfort of your homes and just clicking on your requirements to get it delivered at your doorstep. Your search for the latest trending variety of unique products ends right here. A wide range of international products from global brands are available at your fingertips. We provide you with a world-class online shopping experience, along with superior service, to suit all your specific requirements. Our products are very reasonably priced and are not easily available elsewhere. Our high-end technology-based systems, combined with a human approach, ensure that you have an amazing and blissful online shopping experience with us. Our emphasis on customer delight drives every activity we undertake to provide you an ultimate, hassle-free and pleasant shopping experience. Our diverse categories of products comprise of fashion & jewellery, mobiles and tablets, video gaming and entertainment, toys and games, baby care, home goods, gardening hand tools, electronics and computers, health care and supplements, sports and fitness, office and school supplies, beauty and perfumes, travel and outdoors and automobile accessories. We offer almost every variety of product that your heart desires. Just Go Ahead and Explore the magical world of online shopping with ebuy!  </p>
            </section>
            <section className="Customer-review">
                <div className="user">
                    <img src={SampleUser} alt="user"/>
                    <div>
                        <h2>Kat Libby</h2>
                        <p>Verified User</p>
                        <p>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </p>
                    </div>
                </div>
                <div className="message">
                    <p><i className="fas fa-quote-left"></i></p>
                    <p>ebuy is the business very reliable always has products that are not readily available in my home country. Very pleased and impressed.</p>
                    <p><i className="fas fa-quote-right"></i></p>
                </div>
            </section>
        </>
    );
};

export default About;