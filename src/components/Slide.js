import React from 'react'
import { Link } from 'react-router-dom'
import '../cssfiles/home.css'

const Slide = ({ img, heading, para, button, path }) => {

    return (
        <div  className='slider-boxes '>
            <div style={{margin:'auto',marginLeft:'5%'}} className=" slider-box1 formbold-form-title col-md-6">
                <h3 id='slider-head' className='c_white '>{heading}</h3>
                <p id='slider-desc' className='formbold-form-label c_white'>{para}</p>
                <Link to={path} className='small-button'>{button}</Link>
            </div>
            <div  className=" align-items-stretch col col-md-5 align-self-center d-flex justify-content-center align-items-center">
                <img  style={{ aspectRatio: `9/6` }} className='slide-img' src={img} alt="" />
            </div>
        </div>
    )
}

export default Slide
