import React, { useState } from 'react';
import '../scss/Auth.scss';

import authpic from '../assets/auth.jpg';
import userpic from '../assets/userpic.jpg';


const Auth = () => {

    let [loginView,setLoginView]=useState(true);

    return (
        <section className="Auth">
            <img src={authpic} alt="authpic"/>
            <div className="login">
                {loginView?<>
                    <h2>Best Deals upto 20% off now on ebuy</h2>
                    <input placeholder="Email" type="email"/>
                    <input placeholder="Password" type="password"/>
                    <button className="btn btn-black">Login</button>

                    <p onClick={()=>setLoginView(!loginView)}>Don't have an account <span>Signup Now</span></p>
                </>:<>
                    <figure>
                        <img src={userpic} alt="userpic"/>
                        <div>
                            Change
                        </div>
                    </figure>
                    <input placeholder="Name" type="text"/>
                    <input placeholder="Email" type="email"/>
                    <input placeholder="Password" type="password"/>
                    <button className="btn btn-black">Signup</button>
                    <p onClick={()=>setLoginView(!loginView)}>Have an account <span>Login Now</span></p>
                </>}
            </div>
            <div className="signup">

            </div>
        </section>
    );
};

export default Auth;