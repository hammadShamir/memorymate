import React, { useEffect, useState } from 'react'
import db, { auth } from '../Firebase';
import '../cssfiles/appointment.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//modal
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from 'mdb-react-ui-kit';

import '../cssfiles/table.css'

// images
import loading from '../images/loading.gif'

const initialize = {
    name: "",
    phone: "",
    age: "",
    email: "",
    date: "",
    time: "",
    Address: "",
    drName: "",
}


const Appointment = () => {


    const [welcomeModal, setWelcomeModal] = useState(true);
    const toggleWelcomeModal = () => setWelcomeModal(welcomeModal);
    

    const [optSmModal, setOptSmModal] = useState(false);
    const toggleShow = () => setOptSmModal(!optSmModal);

    const [isBtnDisabled, setisButtonDisabled] = useState(false);
    const [loadImg, setLoadImg] = useState(false);
    const [formData, setFormData] = useState(initialize);
    const [appointData, setappointData] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.name || !formData.phone || !formData.age || !formData.date || !formData.time || !formData.Address || !formData.drName) {
            toast.warning('Form Incomplete!');
            return
        }
        setisButtonDisabled(true);
        setLoadImg(true);
        const appointmentData = {
            name: formData.name,
            phone: formData.phone,
            age: formData.age,
            email: formData.email,
            date: formData.date,
            time: formData.time,
            Address: formData.Address,
            drName: formData.drName,
        };
        // Storing Data 
        db.collection("users")
            .doc(auth.currentUser.uid)
            .collection("appointments")
            .add(appointmentData)
            .then(() => {
                toast.success(`Appointment Added Successfully!`);
                setFormData(initialize);
                setLoadImg(false);
                setisButtonDisabled(false);
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
                toast.error('Failed to set Appointment');
                setLoadImg(false);
                setisButtonDisabled(false);
            })
    };


    const fetchAppointments = async () => {
        const uid = auth.currentUser.uid;
        if (uid) {
            try {
                const querySnapshot = await db
                    .collection("users")
                    .doc(uid)
                    .collection("appointments")
                    .get();
                const appointments = [];
                querySnapshot.forEach((doc) => {
                    const appointmentData = doc.exists ? doc.data() : null;
                    appointments.push({
                        id: doc.id,
                        data: appointmentData,
                    });
                });
                setappointData(appointments);
            } catch (error) {
                console.error("Error fetching appointments: ", error);
            }
        }
    };



    useEffect(() => {
        fetchAppointments();
    }, [optSmModal]);

    // Get the current date
    const currentDate = new Date();


    const minCount = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const formattedToday = today.toISOString().split("T")[0];
        return formattedToday;
    }

    return (

        <div id='padding_15' className="formbold-main-wrapper">

            <div className="formbold-form-wrapper">
                <h2 style={{ fontWeight: 'bold', fontSize: '30px' }} className="  mb-4">Appointment Form</h2>
                <hr />
                <form style={{ position: `relative` }}>
                    <div className="formbold-mb-5">
                        <label htmlFor="name" className="formbold-form-label"> Full Name </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                            className="formbold-form-input"
                            onChange={(e) => {
                                setFormData(
                                    { ...formData, name: e.target.value }
                                )
                            }}
                            value={formData.name}
                        />
                    </div>
                    <div className="formbold-mb-5">
                        <label htmlFor="phone" className="formbold-form-label"> Phone Number </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="(123) 456-7890"
                            className="formbold-form-input"
                            onChange={(e) => {
                                setFormData(
                                    { ...formData, phone: e.target.value }
                                )
                            }}
                            value={formData.phone}
                        />
                    </div>
                    <div className="formbold-mb-5">
                        <label htmlFor="email" className="formbold-form-label"> Age in Years </label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            placeholder="e.g. 25"
                            className="formbold-form-input"

                            onChange={(e) => {
                                setFormData(
                                    { ...formData, age: e.target.value }
                                )
                            }}
                            value={formData.age}
                        />
                    </div>
                    <div className="flex flex-wrap formbold--mx-3">
                        <div className="w-full sm:w-half formbold-px-3">
                            <div className="formbold-mb-5 w-full">
                                <label htmlFor="date" className="formbold-form-label"> Date </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    className="formbold-form-input"
                                    placeholder='MM/DD/YYYY'
                                    onChange={(e) => {
                                        setFormData(
                                            { ...formData, date: e.target.value }
                                        )
                                    }}
                                    value={formData.date}
                                    min={minCount()}
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-half formbold-px-3">
                            <div className="formbold-mb-5">
                                <label htmlFor="time" className="formbold-form-label"> Time </label>
                                <input
                                    type="time"
                                    name="time"
                                    id="time"
                                    className="formbold-form-input"
                                    placeholder='HH:MM AM/PM'
                                    onChange={(e) => {
                                        setFormData(
                                            { ...formData, time: e.target.value }
                                        )
                                    }}
                                    value={formData.time}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="formbold-mb-5">
                        <label htmlFor="name" className="formbold-form-label"> Address </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Enter Address"
                            className="formbold-form-input"
                            onChange={(e) => {
                                setFormData(
                                    { ...formData, Address: e.target.value }
                                )
                            }}
                            value={formData.Address}
                        />
                    </div>
                    <div className="formbold-mb-5">
                        <label className="formbold-form-label"> Doctor Name</label>

                        <select className="formbold-form-input" name="occupation" id="doctors" onChange={(e) => {
                            setFormData(
                                { ...formData, drName: e.target.value }
                            )
                        }}
                            value={formData.drName}
                        >   <option value="">-- Select Doctor --</option>
                            <option value="John_White">John White</option>
                            <option value="Tyler_Smith">Tyler Smith</option>
                            <option value="Lewis_Walker">Lewis Walker</option>
                            <option value="Burton_Robinson">Burton Robinson</option>
                        </select>
                    </div>


                    <div >
                        <button onClick={handleSubmit}  disabled={isBtnDisabled} className="formbold-btn">Book Appointment</button>
                    </div>
                    <div>
                    </div>
                    <img src={loading} style={{ position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)`, display: loadImg ? `flex` : `none` }} />
                </form>
                <button onClick={toggleShow} className="formbold-btn">View Appointment</button>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />


                <MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}>
                    <MDBModalDialog size='lg'>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Appointment List</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>

                            <MDBModalBody>
                            
                            
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                          
                                         
                                            <th scope='col' className="fixed-column">Appointment Date</th>
                                            <th scope='col'>Time</th>
                                            <th scope='col'>Days Left</th>
                                            <th scope='col'>Doctor</th>
                                            <th scope='col'>Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            appointData ? appointData.length > 0 ? appointData.map((obj, ind) => {
                                                // Create a date object for the future date
                                                const futureDate = new Date(obj.data.date);



                                                // Calculate the time difference in milliseconds between the future date and the current date
                                                const timeDiff = futureDate.getTime() - currentDate.getTime();

                                                // Calculate the number of days left by dividing the time difference by the number of milliseconds in a day
                                                const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

                                                return (<tr key={obj.data.name}>
                                                  
                                                    <td className="fixed-column">{obj.data.date}</td>
                                                    <td>{obj.data.time}</td>
                                                    <td className='text-center'>{daysLeft}</td>
                                                    <td>{obj.data.drName}</td>
                                                    <td>{obj.data.Address}</td>
                                                </tr>)


                                            }) : (
                                                <tr>
                                                    <td colSpan="6" className='text-center'>
                                                        <p className=''>No Appointments Available</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className='text-center'>
                                                        <p className=''>Loading... <img src={loading} width='20' />
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>


                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </div>


            <MDBModal show={welcomeModal} tabIndex='-1' setShow={setWelcomeModal}>
                    <MDBModalDialog size='md'>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle></MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={() =>setWelcomeModal(false)}></MDBBtn>
                            </MDBModalHeader>

                            <MDBModalBody>
                            <h4 className='fw-bold fs-4 mb-5 text-left'>Welcome to our doctor appointment booking panel.</h4>
                                       
                            <p className='fw-light fs-6 text-center'> Here, you can book an appointment with our caring and experienced doctors who specialize in treating Dementia.</p>
                            <hr className='m-auto mt-3 mb-3 text-center' style={{width:'40%'}}></hr>
                            <p className='fw-lighter text-center'>Booking an appointment is simple and easy. You can choose your preferred doctor and time that works best for you. We will send you a reminder before your appointment, so you don't forget.</p>
                            <hr className='m-auto mt-3 mb-3 text-center' style={{width:'40%'}}></hr>
                           <p className='fw-lighter text-center'>We are here to help you get the care you need. Thank you for choosing us!</p>
                           
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>






        </div>


                        

    )
}

export default Appointment
