import React, { useEffect, useState } from 'react';
import './checkout.css';
import { useLocation } from 'react-router-dom'; // Assuming you use React Router
import axios from 'axios'; // Use Axios or fetch API for making HTTP requests

const Success = () => {

    return (
        <section className="hero is-fullheight is-white is-fullheight">
            <div className="hero-body">
                <div className="">
                    <img src="/Logo.png" width="20%"/>
                    <br/><br/>
                    <p className="title">Checkout complete! </p>
                    <p className="subtitle">You will receive your ticket and receipt via email soon. </p>
                    <br/>
                </div>
            </div>
        </section>
    );
};

export default Success;
