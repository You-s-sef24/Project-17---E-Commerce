import './Login.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Login() {
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const { saveCurrentUser, saveLogin } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Login';
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (signInData.email.trim() === '' && signInData.password.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const matchedUser = allUsers.find(user =>
            user.email.trim().toLowerCase() === signInData.email.trim().toLowerCase() &&
            user.password === signInData.password
        );
        if (matchedUser) {
            saveCurrentUser(matchedUser);
            saveLogin(true);
            navigate('/home');
        } else {
            alert('Wrong email or password');
        }
    }

    return (
        <div>
            <Navbar />
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <form className='row justify-content-center align-items-center flex-column shadow rounded p-3 w-50' onSubmit={(e) => {
                    handleSubmit(e);
                }}>
                    <h1 className='text-success text-center fw-bold'>Sign in</h1>
                    <hr />
                    <div className='d-flex flex-column gap-2 mb-3'>
                        <div className='form-floating'>
                            <input type='email' className='form-control' name="formId1" id="formId1" placeholder='' required onChange={(e) => {
                                setSignInData({ ...signInData, email: e.target.value });
                            }} />
                            <label htmlFor="formId1">Email</label>
                        </div>
                        <div className='form-floating'>
                            <input type='password' className='form-control' name="formId2" id="formId2" placeholder='' required onChange={(e) => {
                                setSignInData({ ...signInData, password: e.target.value });
                            }} />
                            <label htmlFor="formId2">Password</label>
                        </div>
                    </div>
                    <button className='btn btn-outline-success w-25 mb-3' onClick={() => {

                    }}>Sign in</button>
                    <hr />
                    <div className='d-flex justify-content-center gap-3'>
                        <p className='text-success mb-0'>Don't have an account ?</p>
                        <Link className='text-success' to='/signup'>Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}