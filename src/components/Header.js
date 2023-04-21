import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import logo from '../../src/images/logo.png'
import ProfileDropdown from './ProfileMenu';
const Header = ({ user }) => {
    const location = useLocation();
    const currentUrl = location.pathname;


    const token = localStorage.getItem("accessToken")
    const styles = {
        backgroundColor: '#071D3B',
        color: '#fff',
        transition: 'background-color 0.3s',

    };
    return (
        <nav id='menubar' className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/home">
                    <img className='logo' src={logo} alt="" />
                </Link>
                <form className="d-flex">
                    {
                        token ? (
                            <ProfileDropdown />
                        ) : (
                            currentUrl === "/signin" ? (
                                <Link to="/signup" className="btn header_btn" type="submit" style={styles}>
                                    Sign UP
                                </Link>
                            ) : (
                                <Link to="/" className="btn header_btn" type="submit" style={styles}>
                                    Sign In
                                </Link>
                            )
                        )
                    }



                </form>

            </div>
        </nav>
    )
}

export default Header
