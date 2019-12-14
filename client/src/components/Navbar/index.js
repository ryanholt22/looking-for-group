import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";

function Navbar() {
    return (
        <div>
            <nav className="nav barStyle">
                {/*sign in button will toggle a modal*/}
                <Link to={'/matchform'} className="nLinkStyle">
                    <a className="nav-link"><i className="fas fa-sign-in-alt"></i> Sign In</a>
                </Link>
                <Link to={'/about'} className="nLinkStyle">
                    <a className="nav-link">About</a>
                </Link>
                <Link to={'/'} className="nLinkStyle">
                    <a className="nav-link">Home</a>
                </Link>
            </nav>
        </div>
    );
}

export default Navbar;
