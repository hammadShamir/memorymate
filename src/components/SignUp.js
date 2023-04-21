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

    const [isBtnDisabled, setisButtonDisabled] = useState(false);
    const [loadImg, setLoadImg] = useState(false);

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
                setLoadImg(false);
                setisButtonDisabled(false);
                return;
            }

            // Create new user
            const userCredential = await auth.createUserWithEmailAndPassword(email.value, password.value);
            await userCredential.user.updateProfile({
                displayName: `${firstname.value} ${lastname.value}`,
                username: username.value
            });
            
            //cleaningup after successfull login
             email.value = password.value = firstname.value = lastname.value =username.value = ``; 

            toast.success(`User ${username.value} created successfully!`);

            setTimeout(() => {
                navigate('/')
            }, 2000);
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
                

                <form onSubmit={handleSignUp} style={{ position: `relative` }}>
                    <div className="formbold-form-title">
                        <h2 style={{ fontWeight: 'bold', fontSize: '30px' }} className=" mt-2 mb-4">Welcome to MemoryMate!</h2>
                        <p>Please fill in the following information to create your account.</p>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="firstname" className="formbold-form-label"> First name </label>
                            <input type="text" name="firstname" id="firstname" placeholder='First Name' className="formbold-form-input" />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="formbold-form-label"> Last name </label>
                            <input type="text" name="lastname" id="lastname" className="formbold-form-input" placeholder='Last Name' />
                        </div>
                    </div>
                    <div className="formbold-mb-3">
                        <div>
                            <label htmlFor="email" className="formbold-form-label"> Email </label>
                            <input type="email" name="email" id="email" className="formbold-form-input" placeholder='example@gmail.com' />
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="username" className="formbold-form-label">UserName</label>
                            <input type="text" name="username" id="username firstname" placeholder='Username' className="formbold-form-input" />
                        </div>
                        <div>
                            <label htmlFor="password" className="formbold-form-label"> Password </label>
                            <input type="password" name="password" id="password lastname" placeholder='••••••••••' className="formbold-form-input" />
                        </div>
                    </div>
                    <div className="formbold-checkbox-wrapper">
                        <label htmlFor="supportCheckbox" className="formbold-checkbox-label">By clicking on the "Register Now" button, you agree to our terms and conditions.</label>
                    </div>
                    <button style={{ background: isBtnDisabled ? `gray` : `#91c3db`, cursor: isBtnDisabled ? `wait` : `` }} className="formbold-btn btn_lg" disabled={isBtnDisabled}>Register Now</button>
                    <img src={loading} style={{maxWidth:'120px', position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)`, display: loadImg ? `flex` : `none` }} />
                    <br/>
                 <p className='mt-3 mb-3 fw-light'>Already have an account? Click on the "Log In" button to access your account.</p>
                {/* <p className='fw-light mt-5'>If you have any questions or concerns, please contact us at - <span style={{fontStyle:'italic', color:`rgb(250,168,11)`,fontWeight:'bold'}}> memorymate@gmail.com </span> </p> */}
                   
            
                
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
