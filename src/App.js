import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoadingScreen from 'react-loading-screen';
import Header from './components/common/Header'; // Adjust path as necessary
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Events from './components/events/eventsList';
import Checkout from './components/checkout/EventCheckout';
import Success from './components/checkout/Success';
import Error from './components/common/Error';
import './App.css'; // Import the CSS file for transitions

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay. Replace with your actual data loading logic.
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the delay as needed
    }, []);

    return (
        <>
            <Helmet>
                <title>QEvents</title>
            </Helmet>
            <LoadingScreen
                loading={loading}
                logoSrc='/QLoading.gif'
            >
                <Router>
                    <div>
                        <Routes>
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/checkout/:uuid" element={<Checkout />} />
                            <Route path="/checkout/success" element={<Success />} />
                            <Route path="/" element={<Home />} />
                            <Route path='*' element={<Error />}/>
                        </Routes>
                    </div>
                </Router>
            </LoadingScreen>
        </>
    );
}

export default App;
