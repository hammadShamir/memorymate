import React from 'react'
import { Link } from 'react-router-dom'

const Slide = ({ img, heading, para, button, path }) => {

    return (
        <div className='row h-auto '>
            <div className="col col-md-6 d-flex flex-column justify-content-center align-items-start">
                <h3>{heading}</h3>
                <p>{para}</p>
                <Link to={path} className='btn btn-primary'>{button}</Link>
            </div>
            <div className="col col-md-6">
                <img className='slide-img' src={img} alt="" />
            </div>
        </div>
    )
}

export default Slide
