import React, { useState } from 'react'
import { auth } from '../Firebase'
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [visible, setVisible] = useState({ message: '', isSuccess: false });
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;

        try {
            // Check if email already exists
            const emailExists = await auth.fetchSignInMethodsForEmail(email.value);
            if (emailExists.length > 0) {
                setVisible({ message: 'Email already exists!', isSuccess: false });
                setTimeout(() => {
                    setVisible({ message: '', isSuccess: false });
                }, 2000);
                return;
            }

            // Create new user
            await auth.createUserWithEmailAndPassword(email.value, password.value);
            setVisible({ message: 'User created successfully!', isSuccess: true });
            setTimeout(() => {
                setVisible({ message: '', isSuccess: false });
                navigate('/signin');
            }, 2000);
        } catch (error) {
            setVisible({ message: error.message, isSuccess: false });
        }
    };

    return (
        <div className="row h-100">
            <div className="col-10 col-md-6 m-auto ">
                <h2 className="text-center">Create an Account</h2>
                <form onSubmit={handleSignUp}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="First Name" name='fname' />
                        <label htmlFor="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Last Name" name='lname' />
                        <label htmlFor="floatingInput">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" Username" name='username' />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="p-3 text-center">
                        <button type="submit" className="btn btn-primary px-4">Sign Up</button>
                    </div>

                </form>
                {visible.message &&
                    <Alert className={visible.isSuccess ? 'success' : 'danger'} message={visible.message} />
                }
            </div>
        </div>
    )
}

export default SignUp
