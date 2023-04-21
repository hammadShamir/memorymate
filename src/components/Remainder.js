import { React, useState, useEffect } from 'react'
import db, { auth } from '../Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../cssfiles/table.css'

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


// images
import loading from '../images/loading.gif'

import '../cssfiles/remainder.css'

const Remainder = () => {



  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {


      if (window.innerWidth < 769) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSmallScreen]);







  const [welcomeModal, setWelcomeModal] = useState(true);

  const [optSmModal, setOptSmModal] = useState(false);
  const toggleShow = () => setOptSmModal(!optSmModal);

  const initialValue = {
    medicationName: "",
    dosage: "",
    frequency: "",
    time: "",
    startDate: "",
    endDate: "",
  }

  const [isBtnDisabled, setisButtonDisabled] = useState(false);
  const [loadImg, setLoadImg] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [remaind, setRemaind] = useState();
  const handleRemainder = async (e) => {
    e.preventDefault()
    setisButtonDisabled(true);
    setLoadImg(true);
    const reminderData = {
      medicationName: formData.medicationName,
      dosage: formData.dosage,
      frequency: formData.frequency,
      time: formData.time,
      startDate: formData.startDate,
      endDate: formData.endDate,
      currentTime: new Date().toLocaleString()
    }
    //Storing Reminder 
    await db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("reminder")
      .add(reminderData)
      .then(() => {
        toast.success(`Reminder Added Successfully!`);
        setFormData(initialValue);
        toggleShow()
        setLoadImg(false);
        setisButtonDisabled(false);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        toast.error('Failed to set Reminder');
        setLoadImg(false);
        setisButtonDisabled(false);
        toggleShow()
      })
  }

  const fetchData = async () => {
    try {

      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userId = user.uid;
          // Use userId to access the user's data in Firestore or Realtime Database
          const remindersCollection = db.collection("users").doc(userId).collection("reminder");
          const querySnapshot = await remindersCollection.orderBy("currentTime", "desc").get();

          const remainders = [];
          querySnapshot.forEach((doc) => {
            const remainderData = doc.exists ? doc.data() : null;
            remainders.push({
              id: doc.id,
              data: remainderData,
            });
          });
          setRemaind(remainders);



        } else {
          console.log(`userNotLogedIn`)
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
    <div id='padding_15' className="formbold-main-wrapper">

      <div style={{ maxWidth: '700px', position: 'relative' }} className="formbold-form-wrapper mob_form">
        <div className="formbold-form-title">

          <button style={isSmallScreen ? { top: `12%` } : {}} onClick={toggleShow} className="formbold-btn button_relative ">+</button>
          <h3 style={isSmallScreen ? { width: '100%', fontSize: '15px' } : {}} className={isSmallScreen ? `text-center fw-5` : `fw-1`}>Medication Remainder List</h3>
          <p style={isSmallScreen ? { width: '70%', fontSize: '14px' } : {}} className={isSmallScreen ? `text-center fw-6` : ``} >Never forget a dose again with our app</p>
        </div>


        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>

                <th scope='col' className="fixed-column">Medication Name</th>
                <th scope='col'>Dosage</th>
                <th scope='col'>Frequency</th>
                <th scope='col'>Start Date</th>
                <th scope='col'>End Date</th>
              </tr>
            </thead>
            <tbody>

              {
                remaind ?
                  remaind.length > 0 ?
                    remaind.map((item, ind) => {
                      return (
                        <tr key={item.data.medicationName}>
                          <td className="fixed-column">{item.data.medicationName}</td>
                          <td>{item.data.dosage}</td>
                          <td>{item.data.frequency}</td>
                          <td>{item.data.startDate}</td>
                          <td>{item.data.endDate}</td>
                        </tr>
                      )
                    }) : (
                      <tr>
                        <td colSpan="5" className='text-center'>
                          <p className='text-secondary'>No Remainder Available</p>
                        </td>
                      </tr>
                    ) : (
                    <tr>
                      <td colSpan="5" className='text-center'>
                        <p className='text-secondary'>Loading...<img src={loading} width='20' /></p>
                      </td>
                    </tr>
                  )
              }

            </tbody>
          </table>
        </div>







        <MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}>
          <MDBModalDialog size='md'>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle className='mod_title'>Remainder Medication Form</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>

                <form onSubmit={handleRemainder} style={{ position: `relative` }}>

                  <div className="formbold-mb-3">
                    <div>
                      <label htmlFor="medicationName" className="formbold-form-label">Medication Name </label>
                      <input
                        type="text"
                        name="medicationName"
                        id="medicationName"
                        className="formbold-form-input"
                        placeholder='Enter medication name'
                        onChange={(e) => {
                          setFormData(
                            { ...formData, medicationName: e.target.value }
                          )
                        }}

                      />
                    </div>
                  </div>

                  <div className="formbold-input-flex">
                    <div title='Specify the amount of medication you need to take each time.'>
                      <label htmlFor="Dosage" className="formbold-form-label">Dosage Amount </label>
                      <input type="text" name="dosage" id="Dosage" placeholder='Enter dosage' className="formbold-form-input" onChange={(e) => {
                        setFormData(
                          { ...formData, dosage: e.target.value }
                        )
                      }}


                      />
                    </div>
                    <div title='Specify how often you need to take medication e.g. daily, weekly, monthly, etc.'>
                      <label htmlFor="Frequency" className="formbold-form-label">Frequency </label>
                      <input type="text" name="frequency" id="Frequency" className="formbold-form-input" placeholder='Enter frequency' onChange={(e) => {
                        setFormData(
                          { ...formData, frequency: e.target.value }
                        )
                      }}

                      />
                    </div>
                  </div>

                  <div className="formbold-mb-3" title=' Specify the time of day you need to take medication'>
                    <div>
                      <label htmlFor="time" className="formbold-form-label">Medication Time </label>
                      <input
                        type="time"
                        name="time"
                        id="time"
                        className="formbold-form-input"
                        placeholder='Enter time'
                        onChange={(e) => {
                          setFormData(
                            { ...formData, time: e.target.value }
                          )
                        }}

                      />
                    </div>
                  </div>

                  <div className="formbold-input-flex">
                    <div title='Enter the date you want to start taking the medication.'>
                      <label htmlFor="startDate" className="formbold-form-label">Start Date </label>
                      <input type="date" name="startdate" id="startDate" placeholder='Enter start date' className="formbold-form-input" onChange={(e) => {
                        setFormData(
                          { ...formData, startDate: e.target.value }
                        )
                      }}



                      />
                    </div>
                    <div title='Enter the date you want to stop taking the medication.'>
                      <label htmlFor="endDate" className="formbold-form-label">End Date </label>
                      <input type="date" name="enddate" id="endDate" className="formbold-form-input" placeholder='Enter end date' onChange={(e) => {
                        setFormData(
                          { ...formData, endDate: e.target.value }
                        )
                      }}




                      />
                    </div>
                  </div>


                  <button style={{ background: isBtnDisabled ? `gray` : `#91c3db`, cursor: isBtnDisabled ? `wait` : `` }} className="formbold-btn">
                    Add Remainder
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

        <MDBModal show={welcomeModal} tabIndex='-1' setShow={setWelcomeModal}>
          <MDBModalDialog size='md'>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle></MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setWelcomeModal(false)}></MDBBtn>
              </MDBModalHeader>

              <MDBModalBody>
                <h4 className='fw-bold fs-4 mb-3 text-center mob_font'>Welcome to our Medication Reminder panel.</h4>

                <p className='fw-light fs-6 text-center'> To take advantage of our medication reminder feature, simply enter the medication name, dose, and time below, and we'll take care of the rest. Our user-friendly interface will provide a comprehensive list of all your medications, with timely reminders to ensure you never miss a dose. Say goodbye to the hassle of keeping track of your medication schedule and take control of your health today.</p>

                <hr className='m-auto mt-5 mb-3 text-center' style={{ width: '40%' }}></hr>

              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>


      </div>
    </div >
  )
}

export default Remainder