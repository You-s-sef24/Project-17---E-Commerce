import { useContext, useEffect, useState } from 'react';
import './SignUp.css'
import { UserContext } from './contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function SignUp() {
    const [signUpData, setSignUpData] = useState({ firstName: '', lastName: '', phone: '', address: '', email: '', password: '', confPassword: '' });
    const { isLoggedIn, saveCurrentUser, saveUsers, users, saveLogin } = useContext(UserContext)
    const navigate = useNavigate();
    const filled = Boolean(
        signUpData.firstName &&
        signUpData.email &&
        signUpData.lastName &&
        signUpData.password &&
        signUpData.confPassword &&
        signUpData.phone &&
        signUpData.address
    );
    const correctPass = signUpData.password === signUpData.confPassword ;

    useEffect(() => {
        document.title = 'Sign up';
    }, []);
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    function handleSignUp() {
        const found = users.find(user => user.email === signUpData.email);
        if (found) {
            alert('User with this email already exists');
            return;
        }
        if (filled && correctPass) {
            const userWithOrders = { ...signUpData, orders: [] };
            saveCurrentUser(userWithOrders);
            saveLogin(true);
            saveUsers([...users, userWithOrders]);
            navigate('/');
        }
    }

    return (
        <div>
            <Navbar />
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <form className='row justify-content-center align-items-center flex-column shadow rounded p-3 w-50' autoComplete="off" onSubmit={(e) => {
                    e.preventDefault();
                    handleSignUp();
                }}>
                    <h1 className='text-success text-center fw-bold'>Sign up</h1>
                    <hr />
                    <div className='d-flex flex-column gap-2 mb-3'>
                        <div className='d-flex gap-2'>
                            <div className='form-floating w-100'>
                                <input type='text' className='form-control' name="formId1" id="formId1" placeholder='' required value={signUpData.firstName} onChange={(e) => {
                                    setSignUpData({ ...signUpData, firstName: e.target.value });
                                }} />
                                <label htmlFor="formId1">First Name</label>
                            </div>
                            <div className='form-floating w-100'>
                                <input type='text' className='form-control' name="formId2" id="formId2" placeholder='' required value={signUpData.lastName} onChange={(e) => {
                                    setSignUpData({ ...signUpData, lastName: e.target.value });
                                }} />
                                <label htmlFor="formId2">Last Name</label>
                            </div>
                        </div>
                        <div className='form-floating'>
                            <input type='tel' className='form-control' name="formId3" id="formId3" placeholder='' required value={signUpData.phone} onChange={(e) => {
                                setSignUpData({ ...signUpData, phone: e.target.value });
                            }} />
                            <label htmlFor="formId3">Phone number</label>
                        </div>
                        <div className='form-floating'>
                            <input type='text' className='form-control' name="formId7" id="formId7" placeholder='' required value={signUpData.address} onChange={(e) => {
                                setSignUpData({ ...signUpData, address: e.target.value });
                            }} />
                            <label htmlFor="formId7">Address</label>
                        </div>
                        <div className='form-floating'>
                            <input type='email' className='form-control' name="formId4" id="formId4" placeholder='' required value={signUpData.email} onChange={(e) => {
                                setSignUpData({ ...signUpData, email: e.target.value });
                            }} />
                            <label htmlFor="formId4">Email</label>
                        </div>
                        <div className='form-floating'>
                            <input type='password' className={`form-control ${correctPass && signUpData.password !== '' ? 'is-valid' : ''}`} name="formId5" id="formId5" placeholder='' minLength={8} required value={signUpData.password} autoComplete="off" onChange={(e) => {
                                setSignUpData({ ...signUpData, password: e.target.value });
                            }} />
                            <label htmlFor="formId5">Password</label>
                        </div>
                        <div className='form-floating'>
                            <input type='password' className={`form-control ${correctPass && signUpData.confPassword !== '' ? 'is-valid' : ''}`} name="formId6" id="formId6" placeholder='' minLength={8} required value={signUpData.confPassword} onChange={(e) => {
                                setSignUpData({ ...signUpData, confPassword: e.target.value });
                            }} />
                            <label htmlFor="formId6">Confirm Password</label>
                        </div>
                    </div>
                    <button className={`btn btn-outline-success w-25`} disabled={!filled} type='submit'>Sign up</button>
                </form>
            </div>
        </div>
    );
}