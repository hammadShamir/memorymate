import { React, useState } from 'react'
import db, { auth } from '../Firebase';
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

import '../cssfiles/remainder.css'

const Remainder = () => {

  const [optSmModal, setOptSmModal] = useState(false);
  const toggleShow = () => setOptSmModal(!optSmModal);

  const [isBtnDisabled, setisButtonDisabled] = useState(false);
  const [loadImg, setLoadImg] = useState(false);
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    time: "",
    startDate: "",
    endDate: "",
  });
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
      endDate: formData.endDate
    }
    //Storing Reminder 
    await db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("reminder")
      .add(reminderData)
      .then(() => {
        toast.success(`Reminder Added Successfully!`);
        setLoadImg(false);
        setisButtonDisabled(false);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        toast.error('Failed to set Reminder');
        setLoadImg(false);
        setisButtonDisabled(false);
      })
  }


  return (
    < div className="formbold-main-wrapper">

      <div style={{ maxWidth: '700px', position: 'relative' }} className="formbold-form-wrapper">
        <div className="formbold-form-title">
          <button onClick={toggleShow} className="formbold-btn button_relative">+</button>

          <h3>Medication Remainder List</h3>
          <p>Keep your health on track with our reminder.<br /> Never forget a dose again with our app</p>
        </div>

        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope='col'>Medication Name</th>
              <th scope='col'>Dosage</th>
              <th scope='col'>Frequency</th>
              <th scope='col'>Start Date</th>
              <th scope='col'>End Date</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>

            <tr>
              <td>Lipitor</td>
              <td>10mg</td>
              <td>Daily</td>
              <td>2022-02-01</td>
              <td>2022-03-01</td>
            </tr>
            <tr>
              <td>Aspirin</td>
              <td>81mg</td>
              <td>Daily</td>
              <td>2022-01-15</td>
              <td>2022-05-15</td>
            </tr>
            <tr>
              <td>Nexium</td>
              <td>40mg</td>
              <td>Daily</td>
              <td>2022-02-01</td>
              <td>2022-04-30</td>
            </tr>
            <tr>
              <td>Zyrtec</td>
              <td>10mg</td>
              <td>Daily</td>
              <td>2022-01-01</td>
              <td>2022-06-01</td>
            </tr>
            <tr>
              <td>Tylenol</td>
              <td>500mg</td>
              <td>As needed</td>
              <td>2022-02-15</td>
              <td>2022-03-15</td>
            </tr>
            <tr>
              <td>Benadryl</td>
              <td>25mg</td>
              <td>As needed</td>
              <td>2022-01-01</td>
              <td>2022-06-01</td>
            </tr>
            <tr>
              <td>Flonase</td>
              <td>50mcg</td>
              <td>Daily</td>
              <td>2022-02-01</td>
              <td>2022-03-31</td>
            </tr>
            <tr>
              <td>Prozac</td>
              <td>20mg</td>
              <td>Daily</td>
              <td>2022-01-01</td>
              <td>2022-07-01</td>
            </tr>
            <tr>
              <td>Metformin</td>
              <td>1000mg</td>
              <td>Daily</td>
              <td>2022-02-01</td>
              <td>2022-08-01</td>
            </tr>
            <tr>
              <td>Amoxicillin</td>
              <td>500mg</td>
              <td>Twice a day</td>
              <td>2022-01-15</td>
              <td>2022-01-22</td>
            </tr>

          </MDBTableBody>
        </MDBTable>









        <MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}>
          <MDBModalDialog size='md'>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Remainder Medication Form</MDBModalTitle>
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
                        placeholder='Enter your medication name...'
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
                      <input type="text" name="dosage" id="Dosage" placeholder='Dosage...' className="formbold-form-input" onChange={(e) => {
                        setFormData(
                          { ...formData, dosage: e.target.value }
                        )
                      }} />
                    </div>
                    <div title='Specify how often you need to take medication e.g. daily, weekly, monthly, etc.'>
                      <label htmlFor="Frequency" className="formbold-form-label">Frequency </label>
                      <input type="text" name="frequency" id="Frequency" className="formbold-form-input" placeholder='Frequency...' onChange={(e) => {
                        setFormData(
                          { ...formData, frequency: e.target.value }
                        )
                      }} />
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
                        placeholder='Medication time...'
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
                      <input type="date" name="startdate" id="startDate" placeholder='Start Date...' className="formbold-form-input" onChange={(e) => {
                        setFormData(
                          { ...formData, startDate: e.target.value }
                        )
                      }} />
                    </div>
                    <div title='Enter the date you want to stop taking the medication.'>
                      <label htmlFor="endDate" className="formbold-form-label">End Date </label>
                      <input type="date" name="enddate" id="endDate" className="formbold-form-input" placeholder='End Date...' onChange={(e) => {
                        setFormData(
                          { ...formData, endDate: e.target.value }
                        )
                      }} />
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

      </div>
    </div>
  )
}

export default Remainder