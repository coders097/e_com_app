import React, { createRef, useEffect, useState } from 'react';
import '../scss/ProductCarousal.scss';

const ProductCarousal = () => {

    let [imgUrls,setImgUrls]=useState([
        "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        "https://images.pexels.com/photos/1757363/pexels-photo-1757363.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    ]);

    let cardImg1=createRef<HTMLImageElement>();
    let display=createRef<HTMLDivElement>();
    let controls=createRef<HTMLDivElement>();
    useEffect(()=>{
        if((imgUrls.length>1) && cardImg1.current && display.current && controls.current){
            // console.log("gotta");
            cardImg1.current!.src=imgUrls[3];
            display.current!.innerHTML+=`<div class="__img_card_2 __img_card_2_active"><img src=${imgUrls[0]}></div>`;
            display.current!.innerHTML+=`<div class="__img_card_2_right __img_card_2_active_right"><img src=${imgUrls[0]}></div>`;
            let i=0;
            controls.current!.children[0].addEventListener('click',()=>{
                display.current!.innerHTML='';
                // console.log(i);
                display.current!.innerHTML=`<div class="__img_card_1"><img src=${imgUrls[i]} alt=""></div>`;
                i--;
                if(i==-1) i=imgUrls.length-1;
                // console.log(i);
                display.current!.innerHTML+=`<div class="__img_card_2_right"><img src=${imgUrls[i]}></div>`;
                setTimeout(()=>{
                    display.current!.children[0].classList.add('__img_card_1_active_right');
                    display.current!.children[1].classList.add('__img_card_2_active_right');
                },0);
            });
    
            controls.current!.children[1].addEventListener('click',()=>{
                display.current!.innerHTML='';
                // console.log(i);
                display.current!.innerHTML=`<div class="__img_card_1"><img src=${imgUrls[i]} alt=""></div>`;
                i++;
                if(i==imgUrls.length) i=0;
                // console.log(i);
                display.current!.innerHTML+=`<div class="__img_card_2"><img src=${imgUrls[i]}></div>`;
                setTimeout(()=>{
                    display.current!.children[0].classList.add('__img_card_1_active');
                    display.current!.children[1].classList.add('__img_card_2_active');
                },0);
            });

            setInterval(()=>{
                (controls.current!.children[1] as HTMLDivElement).click();
            },5000);
        }
    },[cardImg1,controls,display]);

    return (
        <div className="__img_carousel">
            <div className="__display" ref={display}>
                <div className="__img_card_1"><img src="" ref={cardImg1}/></div>
            </div>
            <div className="__controls" ref={controls}>
                <p><i className="fas fa-chevron-left"></i></p>
                <p><i className="fas fa-chevron-right"></i></p>
            </div>
        </div>
    );
};

export default ProductCarousal;