import React from 'react'

const Slide = ({ img, heading, para, button }) => {

    return (
        <div className='row h-auto '>
            <div className="col col-md-6 d-flex flex-column justify-content-center align-items-start">
                <h3>{heading}</h3>
                <p>{para}</p>
                <button className='btn btn-primary'>{button}</button>
            </div>
            <div className="col col-md-6">
                <img className='slide-img' src={img} alt="" />
            </div>
        </div>
    )
}

export default Slide
