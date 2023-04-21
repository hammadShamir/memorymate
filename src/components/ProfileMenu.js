import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';


const ProfileDropdown = () => {
    const [user, setUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleSignOutClick = () => {
        localStorage.removeItem('accessToken');
        navigate('/signin')
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);


    return (
        <div style={{position:'relative'}} className="dropdown">
            <button
                style={{ backgroundColor: `#071D3B`, color: `#fff` }}
                className="btn dropdown-toggle"
                type="button"
                id="profile-dropdown"
                onClick={handleToggle}
            >
                {user ? user.displayName : 'Guest'}
            </button>
            <div style={{position:'absolute' , right:0}} className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="profile-dropdown" >
                <button className="dropdown-item " onClick={handleSignOutClick} >Sign Out</button>
            </div>
        </div>
    );
}
export default ProfileDropdown;