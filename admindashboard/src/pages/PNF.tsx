import React from 'react';
import lost from '../assets/lost.png';

const PNF = () => {
    return (
        <section className="PNF">
            <img src={lost} alt="lost"/>
            <h2>Sorry Seller! Buy you got lost here.</h2>
            <button className="btn btn-black">Let's go home</button>
        </section>
    );
};

export default PNF;