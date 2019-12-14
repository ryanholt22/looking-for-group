import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AUTH from '../../utils/AUTH';
import "./navbar.css";

class Navbar extends Component {

    handleLogin() {
        AUTH.userLogin();
    }
    render() {
        return (
            <div>
                <nav className="nav barStyle">
                    {/*sign in button will toggle a modal*/}
                    <div className="nLinkStyle">
                        <a className="nav-link" onClick={this.handleLogin}><i className="fas fa-sign-in-alt"></i> Sign In</a>
                    </div>
                    <Link to={'/login'} className="nLinkStyle">
                        <span className="nav-link">About</span>
                    </Link>
                    <Link to={'/'} className="nLinkStyle">
                        <span className="nav-link">Home</span>
                    </Link>
                </nav>
            </div >
        );
    }
}

export default Navbar;
