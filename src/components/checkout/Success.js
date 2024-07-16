import React, { useEffect, useState } from 'react';
import './checkout.css';
import {useLocation, useParams} from 'react-router-dom'; // Assuming you use React Router
import axios from 'axios'; // Use Axios or fetch API for making HTTP requests

const Success = () => {
    const [checkoutInfo, setCheckoutInfo] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const session_id = searchParams.get('session_id');
    console.log(session_id);
    useEffect(() => {
        const fetchCheckoutInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/checkout/checkout-session/${session_id}`, {
                    headers: { 'authorization':process.env.REACT_APP_API_KEY }
                });
                setCheckoutInfo(response.data);
            } catch (error) {
                console.error('Error fetching checkout info:', error);
                // Handle error (e.g., show error message)
            }
        };

        fetchCheckoutInfo();
    }, [session_id]);

    if (!checkoutInfo) {
        return <div>Loading...</div>;
    }

    return (
        <section className="hero is-fullheight is-white is-fullheight">
            <div className="hero-body">
                <div className="">
                    <img src="/Logo.png" width="20%"/>
                    <br/><br/>
                    <p className="title">Checkout complete! </p>
                    <p className="subtitle">You will receive your ticket and receipt via email soon. </p>
                    <br/>
                        <p><small>Session ID: {checkoutInfo.sessionId}</small></p>

                </div>
            </div>

        </section>

    );
};

export default Success;
