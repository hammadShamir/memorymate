import React, { useState, useEffect } from 'react'
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// images
import register from '../images/register1.png'
import loading from '../images/loading.gif'
// css
import '../cssfiles/signup.css'

const SignUp = () => {

    const [isBtnDisabled,setisButtonDisabled] = useState(false);
    const [loadImg ,setLoadImg] = useState(false);

    const navigate = useNavigate()
    const [alert, setAlert] = useState({ type: '', message: '' })
    const handleSignUp = async (e) => {
        e.preventDefault()
        const { email, password, firstname, lastname, username } = e.target.elements;
        try {
            // Check if email already exists
            setisButtonDisabled(true);
            setLoadImg(true);

            const emailExists = await auth.fetchSignInMethodsForEmail(email.value);
            if (emailExists.length > 0) {
                toast.error('Email already exists!');
                return;
            }

            // Create new user
            const userCredential = await auth.createUserWithEmailAndPassword(email.value, password.value);
            await userCredential.user.updateProfile({
                displayName: `${firstname.value} ${lastname.value}`,
                username: username.value
            });
            toast.success(`User ${username.value} created successfully!`);
            setLoadImg(false);
            setisButtonDisabled(false);
        } catch (error) {
            toast.error('Failed to create user!');
            setLoadImg(false);
            setisButtonDisabled(false);
        }
    }
    useEffect(() => {
        localStorage.removeItem("accessToken")
    }, [])

    return (
        <div className="formbold-main-wrapper">
            <div className="formbold-form-wrappe">
                <img src={register} alt='register ' />

                <form onSubmit={handleSignUp} style={{position:`relative`}}>
                    <div className="formbold-form-title">
                        <h2 style={{ fontWeight: 'bold', fontSize: '30px' }} className=" mt-5 mb-4">Register now</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="firstname" className="formbold-form-label"> First name </label>
                            <input type="text" name="firstname" id="firstname" placeholder='First Name...' className="formbold-form-input" />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="formbold-form-label"> Last name </label>
                            <input type="text" name="lastname" id="lastname" className="formbold-form-input" placeholder='Last Name...' />
                        </div>
                    </div>
                    <div className="formbold-mb-3">
                        <div>
                            <label htmlFor="email" className="formbold-form-label"> Email </label>
                            <input type="email" name="email" id="email" className="formbold-form-input" placeholder='Email...' />
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="username" className="formbold-form-label">UserName</label>
                            <input type="text" name="username" id="username firstname" placeholder='Username...' className="formbold-form-input" />
                        </div>
                        <div>
                            <label htmlFor="password" className="formbold-form-label"> Password </label>
                            <input type="password" name="password" id="password lastname" placeholder='Password...' className="formbold-form-input" />
                        </div>
                    </div>
                    <div className="formbold-checkbox-wrapper">
                        <label htmlFor="supportCheckbox" className="formbold-checkbox-label"> By Registering , I agree to the terms, conditions, and policies </label>
                    </div>
                    <button style={{background: isBtnDisabled ? `gray` : `#91c3db`,cursor: isBtnDisabled ? `wait`: ``}} className="formbold-btn btn_lg" disabled={isBtnDisabled}>Register Now</button>
                <img src={loading} style={{position:`absolute`,top:`50%`,left:`50%`,transform:`translate(-50%,-50%)`,display: loadImg ? `flex`:`none` }}/>
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
    )
}

export default SignUp
