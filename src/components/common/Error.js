import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Error = () => {
    const location = useLocation();
    const errorCode = location.state?.errorCode || 404; // Default to 404 if no error code is passed

    useEffect(() => {
        document.title = `Error ${errorCode}`;
    }, [errorCode]);

    return (
        <section className="hero is-fullheight is-white is-fullheight">
            <div className="hero-body">
                <div className="">
                    <img src="/Logo.png" width="20%" alt="Logo"/>
                    <br/><br/>
                    <p className="title">Error {errorCode}</p>
                    <p className="subtitle">
                        {errorCode === 404
                            ? 'The page you requested does not exist.'
                            : 'An unexpected error occurred.'}
                    </p>
                    <br/>
                </div>
            </div>
        </section>
    );
};

export default Error;
