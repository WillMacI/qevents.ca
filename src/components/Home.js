import React from "react";

function Home() {
    document.title = "QEvents";
    return (
        <section className="hero is-fullheight" style={{ backgroundColor: 'white'}}>
            <div className="hero-body">
                <div className="container has-text-centered">
                    <img src="/Logo.png" style={{ width: '50%'}}></img>
                    <br /><br />
                    <p className="title is-4">Join the network: <u><a style={{ color: 'black'}} href="mailto:tech@compsa.queensu.ca">tech@compsa.queensu.ca</a></u></p>
                </div>
            </div>
        </section>

    );
}

export default Home;
