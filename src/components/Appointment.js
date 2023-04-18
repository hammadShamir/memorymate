import React, { useState } from 'react'
import db from '../Firebase';
const Appointment = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        city: "",
        day: "",
        time: "",
        drName: "",
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        db.collection('appointments').add({
            name: formData.name,
            age: formData.age,
            city: formData.city
        })
            .then(() => {
                console.log("Appointment Added Successfully");
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            })
    };
    return (
        <div>
            <form >
                <div>
                    <label for="firstname" className="formbold-form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder=' Name...'
                        className="formbold-form-input"
                        onChange={(e) => {
                            setFormData(
                                { ...formData, name: e.target.value }
                            )
                        }}
                    />
                </div>
                <div>
                    <label for="firstname" className="formbold-form-label">
                        Age
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder='Age...'
                        className="formbold-form-input"
                        onChange={(e) => {
                            setFormData(
                                { ...formData, age: e.target.value }
                            )
                        }}
                    />
                </div>
                <div>
                    <label for="firstname" className="formbold-form-label">
                        city
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder='City...'
                        className="formbold-form-input"
                        onChange={(e) => {
                            setFormData(
                                { ...formData, city: e.target.value }
                            )
                        }}
                    />
                </div>
                <button onClick={handleSubmit} className="formbold-btn btn_lg">Register Now</button>
            </form>
        </div>
    )
}

export default Appointment
