import React, { useState } from 'react';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState({ message: '', isSuccess: false });
    const navigate = useNavigate();


    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            const user = auth.currentUser;
            const token = await user.getIdToken();
            if (token) {
                setVisible({ message: 'Successfully Loged in', isSuccess: true });
                setTimeout(() => {
                    setVisible({ message: '', isSuccess: false });
                    navigate('/home');
                }, 2000);
            } else {
                setVisible({ message: 'Credentials not Valid', isSuccess: false });
                setTimeout(() => {
                    setVisible({ message: '', isSuccess: false });
                }, 2000);
            }
        } catch (error) {
            console.error(`Error signing in: ${error.code} - ${error.message}`);
        }
    };

    return (
        <div className="row h-100">
            <div className="col-10 col-md-6 m-auto">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSignIn}>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="p-3 text-center">
                        <button type="submit" className="btn btn-primary px-4">Sign In</button>
                    </div>
                </form>
                {visible.message &&
                    <Alert class={visible.isSuccess ? 'success' : 'danger'} message={visible.message} />
                }
            </div>
        </div>
    );
};

export default SignIn;
