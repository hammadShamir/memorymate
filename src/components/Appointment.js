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

import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


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
    });

    let data;
    appointData ? data = appointData.map((obj, ind) => {

        return (<tr key={obj.data.name}>
            <th scope='row'>{ind}</th>
            <td>{obj.data.name}</td>
            <td>Status</td>
            <td>{obj.data.date}</td>
            <td>{obj.data.time}</td>
            <td>{obj.data.drName}</td>
            <td>{obj.data.Address}</td>
        </tr>)

    }) : console.log(`waiting...`)





    return (

        <div className="formbold-main-wrapper">

            <div className="formbold-form-wrapper">
                <h2 style={{ fontWeight: 'bold', fontSize: '30px' }} className="  mb-4">Appointment Booking Form</h2>
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
                            placeholder="Enter your phone number"
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
                            placeholder="Enter your age"
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
                                    onChange={(e) => {
                                        setFormData(
                                            { ...formData, date: e.target.value }
                                        )
                                    }}
                                    value={formData.date}
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
                        >
                            <option value="John_White">John White</option>
                            <option value="Tyler_Smith">Tyler Smith</option>
                            <option value="Lewis_Walker">Lewis Walker</option>
                            <option value="Burton_Robinson">Burton Robinson</option>
                        </select>
                    </div>


                    <div>
                        <button onClick={handleSubmit} style={{ background: isBtnDisabled ? `gray` : `#91c3db`, cursor: isBtnDisabled ? `wait` : `` }} className="formbold-btn">Book Appointment</button>
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
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Name</th>
                                            <th scope='col'>Status</th>
                                            <th scope='col'>Date</th>
                                            <th scope='col'>Time</th>
                                            <th scope='col'>Doctor</th>
                                            <th scope='col'>Address</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>

                                        {data ? data : `Loading...`}

                                    </MDBTableBody>
                                </MDBTable>





                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>



            </div>
        </div>

    )
}

export default Appointment
