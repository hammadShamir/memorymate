import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase';
import { useNavigate, Link } from 'react-router-dom';

import loading from '../images/loading.gif'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const intialValue = ``;

function SignIn() {

  // State hook to track the screen size
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Effect hook to update the screen size state whenever the screen is resized
  useEffect(() => {
    const handleResize = () => {      
      setIsSmallScreen((prevIsSmallScreen) => window.innerWidth < 500);
      console.log(window.innerWidth )
      if(window.innerWidth < 600){
          setIsSmallScreen(true);
      }else {
          setIsSmallScreen(false);
      }
    }

    // Register the handleResize function as an event listener for resize events
    window.addEventListener('resize', handleResize);
    // Call the handleResize function immediately to set the initial screen size
    handleResize();
    // Unregister the handleResize function as an event listener when the component is unmounted
    return () => {
        window.removeEventListener('resize', handleResize);
      };
  },[setIsSmallScreen]);

  // State hooks to track the disabled state and loading state of the sign in button
  const [isBtnDisabled, setisButtonDisabled] = useState(false);
  const [loadImg, setLoadImg] = useState(false);

  // State hooks to track the user's email and password input values
  const [email, setEmail] = useState(intialValue);
  const [password, setPassword] = useState(intialValue);

  // React Router hook to navigate to different pages in the app
  const navigate = useNavigate();

  // Function to handle the sign in form submission
  const handleSignIn = async (event) => {
    event.preventDefault();
    // Set the loading and disabled states for the sign in button to prevent multiple clicks while processing
    setLoadImg(true);
    setisButtonDisabled(true);

    try {
      // Attempt to sign in with the user's email and password
      await auth.signInWithEmailAndPassword(email, password);
      // Get the user object and generate an access token
      const user = auth.currentUser;
      const token = await user.getIdToken();
      // Store the access token in local storage
      localStorage.setItem('accessToken', token);
      // Reset the email and password input values and display a success message
      setEmail(intialValue);
      setPassword(intialValue);
      toast.success(`Logged in Successfully`);
      // Reset the loading and disabled states for the sign in button and navigate to the home page after a short delay
      setLoadImg(false);
      setisButtonDisabled(false);
      setTimeout(() => {
        navigate('/home')
      }, 1000);

    } catch (error) {
      // Log any errors and display an error message to the user
      console.log(error.message);
      toast.error(`Email or Password is Incorrect`);
      // Reset the password input value and loading and disabled states for the sign in button
      setPassword(intialValue);
      setLoadImg(false);
      setisButtonDisabled(false);
    }
  };

  // Effect hook to remove any access tokens from local storage when the component is mounted
  useEffect(() => {
    localStorage.removeItem("accessToken")
  }, [])


  return (
    <div className="row h-100">
      <div className="col-10 col-md-6 m-auto ">
        <h2 style={{  color: `#07074d` }} className={isSmallScreen ? `fw-bold mt-5 fs-1 text-center` :`fw-bold mt-5 fs-1 ml-auto` }>Welcome to Memory Mate! <br/> <span  className='fw-light fs-4 text-right'>for Dementia patients</span></h2>
        <p className={isSmallScreen ? `fw-light mt-3 mb-4 text-center` :`fw-light mt-3 mb-4` } >Please enter your credentials to access your account.</p>
        {/* <p className='mt-3 fw-lighter fs-6'>Please enter your credentials to access your account.</p> */}
        <form onSubmit={handleSignIn} style={{ position: `relative` }}>
          <div className="formbold-mb-3">
            <div>
              <label htmlFor="email" className="formbold-form-label"> Email </label>
              <input
                type="email"
                name="email"
                id="email"
                className="formbold-form-input"
                placeholder='example@gmail.com'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="formbold-mb-3">
            <div>
              <label htmlFor="password" className="formbold-form-label"> Password </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder='••••••••••'
                className="formbold-form-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div className=" text-center  mb-2">
            <button style={{ background: isBtnDisabled ? `gray` : `#91c3db`, cursor: isBtnDisabled ? `wait` : `` }} className="formbold-btn btn_lg" disabled={isBtnDisabled} type="submit" >Sign In</button>
          </div>
          <img src={loading} style={{maxWidth:'120px', position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)`, display: loadImg ? `flex` : `none` }} alt='' />
       
        <p className='mt-3 mb-5 fw-light'>Don't have an account yet? Click on the "<Link  className='fw-bold text-success' to='/signup'>Sign Up</Link>" button to create one.</p>
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
  );
}

export default SignIn;


