import React from 'react';
function Loading() {
    return (
        <section className="hero is-fullheight" style={{ backgroundColor: 'white'}}>
            <div className="hero-body">
                <div className="container has-text-centered">
                    <img src="/QLoading.gif" alt="Loading" />
                </div>
            </div>
        </section>

    );
}

export default Loading;
