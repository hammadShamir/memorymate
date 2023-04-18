import React, { useState } from 'react';
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Logged in successfully');
      
      navigate("/appointment");
      

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row h-100">
      <div className="col-10 col-md-6 m-auto mt-5">
        <h2 style={{ fontWeight: 'bold', fontSize: '30px' }} className=" mt-5 mb-4 text-center">Login</h2>
        <form onSubmit={handleSignIn}>
          <div className="formbold-mb-3">
            <div>
              <label htmlFor="email" className="formbold-form-label"> Email </label>
              <input
                type="email"
                name="email"
                id="email"
                className="formbold-form-input"
                placeholder='Email...'
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
                id="password lastname"
                placeholder='Password...'
                className="formbold-form-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div className="p-3 text-center  mb-2">
            <button type="submit" className="formbold-btn btn_lg">Sign In</button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default SignIn;


