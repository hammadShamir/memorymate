import React, { useEffect, useState } from 'react'
import db, { auth } from '../Firebase';
import '../cssfiles/appointment.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// images
import loading from '../images/loading.gif'

const Appointment = () => {

  const [isBtnDisabled, setisButtonDisabled] = useState(false);
  const [loadImg, setLoadImg] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    email: "",
    date: "",
    time: "",
    Address: "",
    drName: "",
  });
  const [appointData, setappointData] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
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
  useEffect(() => {
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
    fetchAppointments();
  }, []);


  console.log(appointData);







  return (

    <div className="formbold-main-wrapper">

      <div className="formbold-form-wrapper">
        <h2 style={{ fontWeight: 'bold', fontSize: '30px' }} className="  mb-4">Appointment Booking Form</h2>
        <hr />
        <form style={{ position: `relative` }}>
          <div class="formbold-mb-5">
            <label for="name" class="formbold-form-label"> Full Name </label>
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
                />
              </div>
            </div>
          </div>

          <div className="formbold-mb-5">
            <label htmlFor="name" className="formbold-form-label"> Address </label>
            <input
              type="text"
              name="area"
              id="area"
              placeholder="Enter Address"
              className="formbold-form-input"
              onChange={(e) => {
                setFormData(
                  { ...formData, address: e.target.value }
                )
              }}
            />
          </div>

          <div className="formbold-mb-5">
            <label htmlFor="name" className="formbold-form-label"> Doctor Name </label>
            <input
              type="text"
              name="drName"
              id="drName"
              placeholder="Enter Doctor Name"
              className="formbold-form-input"
              onChange={(e) => {
                setFormData(
                  { ...formData, drName: e.target.value }
                )
              }}
            />
          </div>

          <div>
            <button onClick={handleSubmit} style={{ background: isBtnDisabled ? `gray` : `#91c3db`, cursor: isBtnDisabled ? `wait` : `` }} class="formbold-btn">Book Appointment</button>
          </div>
          <div>
            <button style={{ background: isBtnDisabled ? `gray` : `#91c3db`, cursor: isBtnDisabled ? `wait` : `` }} class="formbold-btn">View Appointment</button>
          </div>
          <img src={loading} style={{ position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)`, display: loadImg ? `flex` : `none` }} />
        </form>
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




























    // <div>
    //     <form >
    //         <div>
    //             <label htmlFor="firstname" className="formbold-form-label">
    //                 Name
    //             </label>
    //             <input
    //                 type="text"
    //                 name="firstname"
    //                 id="firstname"
    //                 placeholder=' Name...'
    //                 className="formbold-form-input"
    //                 onChange={(e) => {
    //                     setFormData(
    //                         { ...formData, name: e.target.value }
    //                     )
    //                 }}
    //             />
    //         </div>
    //         <div>
    //             <label htmlFor="firstname" className="formbold-form-label">
    //                 Age
    //             </label>
    //             <input
    //                 type="text"
    //                 name="firstname"
    //                 id="firstname"
    //                 placeholder='Age...'
    //                 className="formbold-form-input"
    //                 onChange={(e) => {
    //                     setFormData(
    //                         { ...formData, age: e.target.value }
    //                     )
    //                 }}
    //             />
    //         </div>
    //         <div>
    //             <label htmlFor="firstname" className="formbold-form-label">
    //                 city
    //             </label>
    //             <input
    //                 type="text"
    //                 name="firstname"
    //                 id="firstname"
    //                 placeholder='City...'
    //                 className="formbold-form-input"
    //                 onChange={(e) => {
    //                     setFormData(
    //                         { ...formData, city: e.target.value }
    //                     )
    //                 }}
    //             />
    //         </div>
    //         <button onClick={handleSubmit} className="formbold-btn btn_lg">Register Now</button>
    //     </form>
    // </div>
  )
}

export default Appointment
