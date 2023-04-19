import React, { useState } from 'react'
import db, { auth } from '../Firebase';
import '../cssfiles/appointment.css'


const Appointment = () => {
  const [formData, setFormData] = useState({

    name: "",
    phone: "",
    age: "",
    email: "",
    date: "",
    time: "",
    Address: "",
    drName: "",
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    const uid = auth.currentUser.uid;

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

    db.collection("users")
      .doc(uid)
      .collection("appointments")
      .add(appointmentData)
      .then(() => {
        alert("Appointment Added Successfully");
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      })
  };
  return (

    <div class="formbold-main-wrapper">

      <div class="formbold-form-wrapper">
        <h2 style={{ fontWeight: 'bold', fontSize: '30px' }} className="  mb-4">Appointment Booking Form</h2>
        <hr />
        <form >
          <div class="formbold-mb-5">
            <label for="name" class="formbold-form-label"> Full Name </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              class="formbold-form-input"
              onChange={(e) => {
                setFormData(
                  { ...formData, name: e.target.value }
                )
              }}
            />
          </div>
          <div class="formbold-mb-5">
            <label for="phone" class="formbold-form-label"> Phone Number </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
              class="formbold-form-input"
              onChange={(e) => {
                setFormData(
                  { ...formData, phone: e.target.value }
                )
              }}
            />
          </div>
          <div class="formbold-mb-5">
            <label for="email" class="formbold-form-label"> Age in Years </label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Enter your age"
              class="formbold-form-input"
              onChange={(e) => {
                setFormData(
                  { ...formData, age: e.target.value }
                )
              }}
            />
          </div>
          <div class="flex flex-wrap formbold--mx-3">
            <div class="w-full sm:w-half formbold-px-3">
              <div class="formbold-mb-5 w-full">
                <label for="date" class="formbold-form-label"> Date </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  class="formbold-form-input"
                  onChange={(e) => {
                    setFormData(
                      { ...formData, date: e.target.value }
                    )
                  }}
                />
              </div>
            </div>
            <div class="w-full sm:w-half formbold-px-3">
              <div class="formbold-mb-5">
                <label for="time" class="formbold-form-label"> Time </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  class="formbold-form-input"
                  onChange={(e) => {
                    setFormData(
                      { ...formData, time: e.target.value }
                    )
                  }}
                />
              </div>
            </div>
          </div>

          <div class="formbold-mb-5">
            <label for="name" class="formbold-form-label"> Address </label>
            <input
              type="text"
              name="area"
              id="area"
              placeholder="Enter Address"
              class="formbold-form-input"
              onChange={(e) => {
                setFormData(
                  { ...formData, address: e.target.value }
                )
              }}
            />
          </div>

          <div class="formbold-mb-5">
            <label for="name" class="formbold-form-label"> Doctor Name </label>
            <input
              type="text"
              name="drName"
              id="drName"
              placeholder="Enter Doctor Name"
              class="formbold-form-input"
              onChange={(e) => {
                setFormData(
                  { ...formData, drName: e.target.value }
                )
              }}
            />
          </div>

          <div>
            <button onClick={handleSubmit} class="formbold-btn">Book Appointment</button>
          </div>
        </form>
      </div>
    </div>




























    // <div>
    //     <form >
    //         <div>
    //             <label for="firstname" className="formbold-form-label">
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
    //             <label for="firstname" className="formbold-form-label">
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
    //             <label for="firstname" className="formbold-form-label">
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
