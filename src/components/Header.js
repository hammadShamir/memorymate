import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
const Header = ({ user }) => {
    const location = useLocation();
    const currentUrl = location.pathname;

    return (
        <nav id='menubar' className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">MemoryMate</a>
                <form className="d-flex">
                    {
                        user ? (
                            <Link to="/signin" className="btn btn-outline-warning" type="submit" onClick={() => {
                                localStorage.removeItem('accessToken');
                            }}>
                                Sign Out
                            </Link>
                        ) : (
                            currentUrl === "/" ? (
                                <Link to="/signin" className="btn btn-outline-warning" type="submit">
                                    Sign In
                                </Link>
                            ) : (
                                <Link to="/" className="btn btn-outline-warning" type="submit">
                                    Sign Up
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
