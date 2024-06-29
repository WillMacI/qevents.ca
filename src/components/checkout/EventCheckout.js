import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './checkout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import { faCircle as faCircleSolid, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import {useParams} from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe('pk_test_51P2EORHyPLDppEA76adz3fIqOoQGdHDsIGVmIx6XwrAANIkVvqpAJgAmI46ZdxHkjIiLOhM2WvAtq3R67jpi21Ky00y7J8rRNk'); // Replace with your Stripe publishable key

const EventCheckout = () => {
    const [event, setEvent] = useState(null);
    const [prices, setPrices] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [toggledDescription, setToggledDescription] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const { uuid } = useParams();

    useEffect(() => {
        fetch('http://localhost:3001/events/'+uuid)
            .then(response => response.json())
            .then(data => {
                setEvent(data);
                document.title = data.title; // Set title here
            })
            .catch(error => console.error('Error fetching event:', error));

        fetch('http://localhost:3001/prices/event/'+uuid)
            .then(response => response.json())
            .then(data => setPrices(data))
            .catch(error => console.error('Error fetching prices:', error));
    }, []);

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        try {
            const response = await fetch('http://localhost:3001/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: selectedOption,
                    metadata: {
                        event_uuid: uuid,
                        organization_uuid: event.org_uuid,
                        stripe_product_id: event.stripe_product_id,
                        stripe_price_id: selectedOption,
                        ticket_name: name,
                        ticket_email: email
                    },
                }),
            });

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error('Error redirecting to checkout:', result.error.message);
            }
        } catch (error) {
            console.error('Error handling checkout:', error);
        }
    };

    const handleOptionChange = (priceId) => {
        setSelectedOption(priceId);
    };

    const toggleDescription = (priceId) => {
        setToggledDescription(toggledDescription === priceId ? null : priceId);
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <section className="hero is-fullheight is-light">
            <div className="section">
                <div className="container has-text-white">
                    <h1 className="title is-1">{event.title}</h1>
                    <div className="columns is-desktop">
                        <div className="column">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image">
                                        <img src="https://qcomputingorientation.ca/images/homepage1_compressed.jpg" alt="Event"></img>
                                    </figure>
                                </div>
                            </div>
                            <p style={{ color: 'black' }}>{event.description}</p>
                        </div>
                        <div className="column">
                            <div className="notification is-link">
                                Heads up! The name and email used for registration <b>can be different</b> than the name and email used for payment. Please enter the name and email of the person attending the event below.
                            </div>

                            {prices.map(price => (
                                <div key={price.stripe_price_id} className="card">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            <FontAwesomeIcon
                                                icon={selectedOption === price.stripe_price_id ? faCircleSolid : faCircleRegular}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleOptionChange(price.stripe_price_id)}
                                            />&nbsp;<b>${price.unit_amount}</b>&nbsp;-&nbsp;{price.nickname}
                                        </p>
                                        <button className="card-header-icon" aria-label="more options" onClick={() => toggleDescription(price.stripe_price_id)}>
                                            <span className="icon">
                                                <FontAwesomeIcon icon={toggledDescription === price.stripe_price_id ? faAngleUp : faAngleDown} />
                                            </span>
                                        </button>
                                    </header>
                                    {toggledDescription === price.stripe_price_id && (
                                        <div className="card-content">
                                            <div className="content">
                                                {price.description}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="card">
                                <div className="card-content">
                                    <div className="field">
                                        <label className="label">Name</label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Alan Turing"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="email"
                                                placeholder="alan@bletchleypark.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Phone Number</label>
                                        <div className="control">
                                            <input className="input" type="tel" placeholder="441-908-6404"></input>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button
                                            className="button is-medium is-fullwidth is-link"
                                            onClick={handleCheckout}
                                            disabled={!selectedOption}
                                        >
                                            Continue to Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    );
};

export default EventCheckout;
