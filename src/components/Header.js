import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Header = () => {
    const location = useLocation();
    const currentUrl = location.pathname;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">MemoryMate</a>
                <form className="d-flex">
                    {currentUrl === "/" ? (
                        <Link to="/signin" className="btn btn-outline-success" type="submit">
                            Sign In
                        </Link>
                    ) : (
                        <Link to="/" className="btn btn-outline-success" type="submit">
                            Sign Up
                        </Link>
                    )}


                </form>

            </div>
        </nav>
    )
}

export default Header
