import React, { useEffect, useState } from 'react'
import db, { auth } from '../Firebase';
import { MDBTable, MDBTableHead, MDBTableBody as tbody } from 'mdb-react-ui-kit';
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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loading from '../images/loading.gif'

const initialValue = {
    firstName: "",
    lastName: "",
    number: "",
}

const Contact = () => {

    // Set up states for the contact page
    const [welcomeModal, setWelcomeModal] = useState(true);
    const [optSmModal, setOptSmModal] = useState(false);
    const [formData, setFormData] = useState(initialValue);
    const [isBtnDisabled, setisButtonDisabled] = useState(false);
    const [loadImg, setLoadImg] = useState(false);
    const [contact, setContact] = useState();

    // Function to handle adding a new contact
    const handleContact = async (e) => {
        e.preventDefault()
        setLoadImg(true);
        setisButtonDisabled(true);
        setOptSmModal(false)
        await db.collection("users")
            .doc(auth.currentUser.uid)
            .collection("contacts")
            .add({
                firstName: formData.firstName,
                lastName: formData.lastName,
                number: formData.number,
                time: new Date().toLocaleString()
            })
            .then(() => {
                toast.success(`Contact Added Successfully!`);
                setFormData(initialValue);
                setLoadImg(false);
                setisButtonDisabled(false);
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
                toast.error('Failed to Add Contact');
                setLoadImg(false);
                setisButtonDisabled(false);
            })
    }

    // Function to fetch contact data from Firestore
    const fetchData = async () => {
        try {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const userId = user.uid;
                    // Use userId to access the user's data in Firestore or Realtime Database
                    const querySnapshot = await db
                        .collection("users")
                        .doc(auth.currentUser && auth.currentUser.uid)
                        .collection("contacts")
                        .orderBy("time", "desc")
                        .get()
                    const contacts = [];
                    querySnapshot.forEach((doc) => {
                        const contactData = doc.exists ? doc.data() : null;
                        contacts.push({
                            id: doc.id,
                            data: contactData,
                        });
                    });
                    setContact(contacts);
                }
            });
        } catch (error) {
            console.error("Error fetching Contacts: ", error);
        }
    }

    // Fetch contact data when optSmModal state is updated
    useEffect(() => {
        fetchData()
    }, [optSmModal])

    return (
        <div className='row gap-3'>
            <div className="col-10 col-sm-11 col-md-8 m-auto ps-0 d-flex justify-content-between align-items-center">
                <h2 style={{ fontWeight: 'bold', fontSize: '2rem', color: 'rgb(64 105 124)' }} className={" px-3 col-9 col-md-9 col-sm-8 col-lg-6 const_font"}>Your Contacts</h2>

                <button
                    className='formbold-btn btn_contact'
                    onClick={() => setOptSmModal(!optSmModal)}
                >+</button>
            </div>
            <div className="col-10 col-sm-11 col-md-8 m-auto border shadow">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>

                                <th scope='col' className="fixed-column">First Name</th>
                                <th scope='col'>Last Name</th>
                                <th scope='col'>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contact ? contact.length > 0 ? contact.map((item, ind) => {
                                    return (
                                        <tr key={ind}>

                                            <td className="fixed-column">{item.data.firstName}</td>
                                            <td>{item.data.lastName}</td>
                                            <td>{item.data.number}</td>
                                        </tr>
                                    )
                                }) : (
                                    <tr>
                                        <td colSpan="5" className='text-center'>
                                            <p className=''>No Contact Available</p>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="5" className='text-center'>
                                            <p className=''>Loading</p>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>






                    </table>
                </div>
            </div>



            <MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}>
                <MDBModalDialog size='md'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Add New Contact</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOptSmModal(!optSmModal)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                            <form onSubmit={handleContact} style={{ position: `relative` }}>

                                <div className="formbold-mb-3">
                                    <div>
                                        <label htmlFor="medicationName" className="formbold-form-label">First Name</label>
                                        <input
                                            type="text"
                                            name="medicationName"
                                            id="medicationName"
                                            className="formbold-form-input"
                                            placeholder='First Name'
                                            onChange={(e) => {
                                                setFormData(
                                                    { ...formData, firstName: e.target.value }
                                                )
                                            }}
                                            value={formData.firstName}
                                        />
                                    </div>
                                </div>

                                <div className="formbold-mb-5">
                                    <div >
                                        <label htmlFor="Dosage" className="formbold-form-label">Last Name </label>
                                        <input type="text" name="dosage" id="Dosage" placeholder='Enter Last Name...' className="formbold-form-input" onChange={(e) => {
                                            setFormData(
                                                { ...formData, lastName: e.target.value }
                                            )

                                        }}
                                            value={formData.lastName}

                                        />
                                    </div>

                                </div>

                                <div className="formbold-mb-5">
                                    <label htmlFor="phone" className="formbold-form-label"> Phone Number </label>
                                    <input
                                        type="number"
                                        name="frequency"
                                        id="number"
                                        className="formbold-form-input"
                                        placeholder='Phone Number'
                                        onChange={(e) => {
                                            setFormData(
                                                { ...formData, number: e.target.value }
                                            )
                                        }}
                                        value={formData.number}
                                    />
                                </div>








                                <button style={{ background: isBtnDisabled ? `gray` : `#91c3db`, cursor: isBtnDisabled ? `wait` : `` }} className="formbold-btn">
                                    Add Contact
                                </button>
                                <img src={loading} style={{ position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)`, display: loadImg ? `flex` : `none` }} alt='' />
                            </form>




                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
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


            <MDBModal show={welcomeModal} tabIndex='-1' setShow={setWelcomeModal}>
                <MDBModalDialog size='md'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle></MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setWelcomeModal(false)}></MDBBtn>
                        </MDBModalHeader>

                        <MDBModalBody>
                            <h4 className='fw-bold fs-4 mb-3 text-center mob_font'>Contact Section!</h4>

                            <p className='fw-light fs-6 text-center'> Adding emergency contacts is easy with our user-friendly interface. Simply click the "Add" button, enter the contact's name, relation, and phone number, and we'll securely store them in our database. Quick access to emergency contacts is crucial for the safety of dementia patients, and our feature provides peace of mind with just a few clicks.</p>

                            <hr className='m-auto mt-5 mb-3 text-center' style={{ width: '40%' }}></hr>

                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>


        </div >
    )
}

export default Contact
