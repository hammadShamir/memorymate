import React  from 'react'
import { Link } from 'react-router-dom'
import '../cssfiles/home.css'

const Slide = ({ img, heading, para, button, path }) => {

// check for window size







// 
    
   let width =  !img ? `col-md-12` : `col-md-6`;

    let order = !button ? `slider-box-2` : ``;


    return (
        <div   className='slider-boxes ' >
            <div style={{margin:'auto',marginLeft:'5%'}} className={`slider-box1 formbold-form-title ${width}`}>
                
                <h3 id='slider-head' className='c_white '>{heading} </h3>
                <p id='slider-desc' className='formbold-form-label c_white'>{para}</p>
            {button &&    <Link to={path} className='small-button'>{button}</Link> }
            </div>
            {img && (
            <div style={{position:'relative'}} className={`${order} align-items-stretch col col-md-5 align-self-center d-flex justify-content-center align-items-center`} >
                <img  style={{ aspectRatio: `9/6` }} className='slide-img' src={img} alt="" />
               {!button && <h3 className='fw-bold fs-3 ' style={{position:'absolute' , bottom:'15%',left:'50%',zIndex:'100',transform:`translate(-50%,80%)`,width:'70%',wordBreak:`break-word`}}>Slide Right to Explore</h3>}
            </div>
            )}
        </div>
    )
}

export default Slide
