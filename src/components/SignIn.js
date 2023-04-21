import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase';
import { useNavigate, Link } from 'react-router-dom';

import loading from '../images/loading.gif'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const intialValue = ``;

function SignIn() {

  const [isBtnDisabled, setisButtonDisabled] = useState(false);
  const [loadImg, setLoadImg] = useState(false);

  const [email, setEmail] = useState(intialValue);
  const [password, setPassword] = useState(intialValue);

  const navigate = useNavigate();
  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoadImg(true);
    setisButtonDisabled(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      const token = await user.getIdToken();
      
      localStorage.setItem('accessToken', token);
      
      // cleanup form values
      setEmail(intialValue); setPassword(intialValue);
      toast.success(`Logged in Successfully`);
      setLoadImg(false);
      setisButtonDisabled(false);
      setTimeout(() => {
        navigate('/home')
      }, 1000);

    } catch (error) {
      console.log(error.message);
      toast.error(`Email or Password is Incorrect`);
      setPassword(intialValue);
      setLoadImg(false);
      setisButtonDisabled(false);
    }
  };

  useEffect(() => {
    localStorage.removeItem("accessToken")
  }, [])

  return (
    <div className="row h-100">
      <div className="col-10 col-md-6 m-auto ">
        <h2 style={{  fontSize: '30px', color: `#07074d` }} className="fw-bold mt-5 ">Welcome to MemoryMate</h2>
        <p className=' fw-light mb-4'>An Application for Dementia patients.</p>
        <p className='mt-3 fw-lighter fs-6'>Please sign in to continue.</p>
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
          <img src={loading} style={{maxWidth:'120px', position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)`, display: loadImg ? `flex` : `none` }} />
       
        <p className='mt-3 mb-5 fw-light'>If you don't have an account, then <Link  className='fw-bold text-success' to='/signup'>Register here</Link></p>
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


