import React, { useState } from 'react';
import { auth } from '../Firebase';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slide from './Slide';
import Slide_1 from '../images/slide-1.png'
import Slide_2 from '../images/slide-2.jpeg'
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
                img={Slide_1}
                heading={`Welcome ${user && user.displayName}`}
                para={"What would you like to explore today?"}
                button={"Appointment"}
                path={'/appointment'}
            />
            <Slide
                img={Slide_1}
                heading={`Remider for taking Medicine`}
                para={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nostrum minima fugit tempora illum tempore, rem, libero reiciendis eius aperiam similique, id officiis odit obcaecati sapiente sit voluptatibus expedita! Quo necessitatibus eius quidem ad?"}
                button={"Reminder"}
                path={'/remainder'}
            />
            <Slide
                img={Slide_1}
                heading={`Memory Album`}
                para={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nostrum minima fugit tempora illum tempore, rem, libero reiciendis eius aperiam similique, id officiis odit obcaecati sapiente sit voluptatibus expedita! Quo necessitatibus eius quidem ad?"}
                button={"Gallery"} />
            <Slide
                img={Slide_1}
                heading={`Contacts`}
                para={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nostrum minima fugit tempora illum tempore, rem, libero reiciendis eius aperiam similique, id officiis odit obcaecati sapiente sit voluptatibus expedita! Quo necessitatibus eius quidem ad?"}
                button={"Contact"} />
        </Slider>
    );
};

export default SliderComponent;
