import React, { useState } from 'react'
import { auth } from '../Firebase'
import Alert from '../components/Alert'
import { useNavigate,Link } from 'react-router-dom'

// images
import register from '../images/register1.png'
// css
import '../cssfiles/signup.css'

const SignUp = () => {
  const navigate = useNavigate()
  const [alert, setAlert] = useState({ type: '', message: '' })
  const handleSignUp = async (e) => {
    e.preventDefault()
    const { firstname, lastname, email, username, password } = e.target.elements
    try {
      await auth.createUserWithEmailAndPassword(email.value, password.value)
      await auth.currentUser.updateProfile({
        displayName: `${firstname.value} ${lastname.value}`
      })
      navigate('/')
    } catch (error) {
      setAlert({ type: 'danger', message: error.message })
    }
  }

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrappe">
        <img  src={register} alt='register ' />
        <form onSubmit={handleSignUp}>
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
          <button className="formbold-btn btn_lg">Register Now</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
