import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import logo from '../../src/images/logo.png'
const Header = ({ user }) => {
    const location = useLocation();
    const currentUrl = location.pathname;

    const token = localStorage.getItem('accessToken');


    return (
        <nav id='menubar' className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/home">
                    <img className='logo' src={logo} alt="" />
                </Link>
                <form className="d-flex">
                    {
                        token ? (
                            <Link to="/" className="btn btn-outline-warning" type="submit" onClick={() => {
                                localStorage.removeItem('accessToken');
                            }}>
                                Sign Out
                            </Link>
                        ) : (
                            currentUrl === "/" ? (
                                <Link to="/signup" className="btn btn-outline-warning" type="submit">
                                    Sign UP
                                </Link>
                            ) : (
                                <Link to="/" className="btn btn-outline-warning" type="submit">
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
