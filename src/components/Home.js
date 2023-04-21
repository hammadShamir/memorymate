import React, { useState } from 'react';
import { auth } from '../Firebase';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slide from './Slide';
import gallery from '../images/gallery.png'
import appointment from '../images/appointment.png'
import medicationRemainder from '../images/medicationReminder.png'
import contactus from '../images/contactus.png'

const SliderComponent = () => {

    // Fetching User Information
    const [user, setUser] = useState(null);
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    }
    )
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings} >
            <Slide
                img={appointment}
                heading={`Welcome to MemoryMate's Appointment panel.`}
                para={"We understand that finding the right doctor and booking an appointment can be a daunting task, which is why we’ve made it simple and convenient for you. Our team of experienced doctors specialize in treating Dementia, They are dedicated to providing personalized and compassionate care to each and every patient."}
                button={"Appointment"}
                path={'/appointment'}
            />
            <Slide
                img={medicationRemainder}
                heading={`Remider for taking Medication`}
                para={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nostrum minima fugit tempora illum tempore, rem, libero reiciendis eius aperiam similique, id officiis odit obcaecati sapiente sit voluptatibus expedita! Quo necessitatibus eius quidem ad?"}
                button={"Reminder"}
                path={'/remainder'}
            />
            <Slide
                img={gallery}
                heading={`Memory Album`}
                para={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nostrum minima fugit tempora illum tempore, rem, libero reiciendis eius aperiam similique, id officiis odit obcaecati sapiente sit voluptatibus expedita! Quo necessitatibus eius quidem ad?"}
                button={"Gallery"}
                path={'/gallery'}
            />
            <Slide
                img={contactus}
                heading={`Contacts`}
                para={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nostrum minima fugit tempora illum tempore, rem, libero reiciendis eius aperiam similique, id officiis odit obcaecati sapiente sit voluptatibus expedita! Quo necessitatibus eius quidem ad?"}
                button={"Contact"}
                path={'/contact '}
            />
        </Slider>
    );
};

export default SliderComponent;
