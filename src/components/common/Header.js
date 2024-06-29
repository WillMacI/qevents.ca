import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    QEvents.ca
                </Link>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">
                        Home
                    </Link>
                    <Link className="navbar-item" to="/events">
                        Events
                    </Link>
                    <Link className="navbar-item" to="/contact">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;
