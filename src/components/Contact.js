import React, { useEffect, useState } from 'react'
import db, { auth } from '../Firebase';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loading from '../images/loading.gif'

const initialValue = {
    firstName: "",
    lastName: "",
    number: "",
}

const Contact = () => {
    const [optSmModal, setOptSmModal] = useState(false);
    const [formData, setFormData] = useState(initialValue);
    const [isBtnDisabled, setisButtonDisabled] = useState(false);
    const [loadImg, setLoadImg] = useState(false);
    const [contact, setContact] = useState();

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
    const fetchData = async () => {
        try {


            auth.onAuthStateChanged( async(user) => {
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

    useEffect(() => {
        fetchData()
    }, [optSmModal])

    return (
        <div className='row gap-2'>
            <div className="col-8 m-auto ps-0 d-flex justify-content-between">
                <h3>Your Contacts</h3>
                <button
                    className='btn btn-primary'
                    onClick={() => setOptSmModal(!optSmModal)}
                >Add Contact</button>
            </div>
            <div className="col-8 m-auto border shadow">
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>First Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>Contact</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            contact ? contact.length > 0 ? contact.map((item, ind) => {
                                return (
                                    <tr key={ind}>
                                        <th scope='row'>{ind + 1}</th>
                                        <td>{item.data.firstName}</td>
                                        <td>{item.data.lastName}</td>
                                        <td>{item.data.number}</td>
                                    </tr>
                                )
                            }) : (
                                <tr>
                                    <td colspan="5" className='text-center'>
                                        <p className=''>No Contact Available</p>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colspan="5" className='text-center'>
                                        <p className=''>Loading</p>
                                    </td>
                                </tr>
                            )
                        }

                    </MDBTableBody>
                </MDBTable>
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
                                            placeholder='Enter First Name...'
                                            onChange={(e) => {
                                                setFormData(
                                                    { ...formData, firstName: e.target.value }
                                                )
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="formbold-input-flex">
                                    <div title='Specify the amount of medication you need to take each time.'>
                                        <label htmlFor="Dosage" className="formbold-form-label">Last Name </label>
                                        <input type="text" name="dosage" id="Dosage" placeholder='Enter Last Name...' className="formbold-form-input" onChange={(e) => {
                                            setFormData(
                                                { ...formData, lastName: e.target.value }
                                            )
                                        }} />
                                    </div>
                                    <div title='Specify how often you need to take medication e.g. daily, weekly, monthly, etc.'>
                                        <label htmlFor="Frequency" className="formbold-form-label">Phone Number </label>
                                        <input type="text" name="frequency" id="Frequency" className="formbold-form-input" placeholder='Enter Phone Number...' onChange={(e) => {
                                            setFormData(
                                                { ...formData, number: e.target.value }
                                            )
                                        }} />
                                    </div>
                                </div>
                                <button style={{ background: isBtnDisabled ? `gray` : `#91c3db`, cursor: isBtnDisabled ? `wait` : `` }} className="formbold-btn">
                                    Add Contact
                                </button>
                                <img src={loading} style={{ position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)`, display: loadImg ? `flex` : `none` }} />
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
        </div >
    )
}

export default Contact
