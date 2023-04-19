import React from 'react'
import { Link } from 'react-router-dom'
import '../cssfiles/home.css'

const Slide = ({ img, heading, para, button, path }) => {

    return (
        <div  className=' d-flex flex-row justify-content-center align-items-stretch flex-wrap'>
            <div className="align-items-stretch formbold-form-title col-md-6 d-flex flex-column justify-content-start align-items-center align-self-center">
                <h3>{heading}</h3>
                <p className='formbold-form-label'>{para}</p>
                <Link to={path} className='small-button'>{button}</Link>
            </div>
            <div className=" align-items-stretch col col-md-6 align-self-center d-flex justify-content-center align-items-center">
                <img style={{height:`300px`}} className='slide-img' src={img} alt="" />
            </div>
        </div>
    )
}

export default Slide
