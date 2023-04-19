import React, { useState, useEffect } from 'react'
import HomeImg from '../images/home_img.webp'
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';
const Home = () => {

    const [userInfo, setUserInfo] = useState(null)

    auth.onAuthStateChanged((user) => {
        if (user) {
            setUserInfo(user);
        }
    })

    return (
        <div className='row h-100'>
            <div className="col">
                <h1>Welcome {userInfo && userInfo.displayName}</h1>
                <p>What would you like to explore today?</p>
                <Link to="/appointment" className="btn btn-outline-success" type="submit">
                    Appointment
                </Link>
            </div>
            <div className="col">
                <img className='home-img' src={HomeImg} alt="" />
            </div>
        </div>
    )
}

export default Home
