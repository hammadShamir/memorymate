import React, { useState } from 'react';
import { auth } from '../Firebase';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slide from './Slide';
import gallery from '../images/gallery.png'
import slideright from '../images/slideRight.png'
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
                img={slideright}
                heading={`Welcome to MemoryMate`}
                para={"Welcome to Memory mate, an application for Dementia patients. Dementia is a common disease among elderly individuals that affects memory, thinking, and communication. It can make everyday activities challenging and sometimes even dangerous. Our app is designed to assist dementia patients in managing their daily lives by providing them with various features such as booking appointments, storing their images and emergency contact information, and creating medication reminders. Our app is easy to use and helps dementia patients remain independent while also providing peace of mind to their loved ones."}
                // button={"Appointment"}
                // path={'/appointment'}
            />
            <Slide
                img={appointment}
                heading={`Welcome to MemoryMate's Appointment panel.`}
                para={"Our application provides a stress-free appointment booking feature with specialized doctors who are committed to providing care and support to those living with dementia. Book an appointment in just a few clicks and receive a confirmation and reminder before your scheduled time. We are dedicated to making life easier for those living with dementia, so please explore our website for more resources and services."}
                button={"Appointment"}
                path={'/appointment'}
            />
            <Slide
                img={medicationRemainder}
                heading={`Remider for taking Medication`}
                para={"Introducing our medication reminder feature, designed to help dementia patients keep track of their medication schedules. Our user-friendly interface makes it easy to enter all your medications' names, doses, and times into the system. Once entered, you'll be able to see a comprehensive list of all the medications you need to take, with corresponding times and doses. You'll receive timely reminders to ensure you never miss a dose or take too much medication."}
                button={"Reminder"}
                path={'/remainder'}
            />
            <Slide
                img={gallery}
                heading={`Memory Album`}
                para={"Introducing our photo album feature, designed to help dementia patients relive their cherished memories with ease. With our user-friendly interface, you can easily upload your favorite photos, add a title and description, and our system will store them securely in our database. Whether it's a picture from a family vacation, a wedding, or a special event, you can view your photos and read their descriptions anytime you want. Our photo album feature is a valuable tool for those living with dementia, helping to keep their most cherished memories close."}
                button={"Gallery"}
                path={'/gallery'}
            />
            <Slide
                img={contactus}
                heading={`Contacts`}
                para={"Our emergency contact feature is designed to help dementia patients feel safe and secure at all times. With our user-friendly interface, you can easily add your emergency contact numbers along with their names and relation to you, and our system will store them securely in our database. In case of an emergency, you can quickly access your emergency contact list and call for help. We understand the importance of having trusted people to turn to in times of need, and that's why we created this feature to provide peace of mind for those living with dementia."}
                button={"Contact"}
                path={'/contact '}
            />
        </Slider>
    );
};

export default SliderComponent;
