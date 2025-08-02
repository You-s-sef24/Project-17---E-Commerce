import './Profile.css'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Profile() {
    const { currentUser, saveCurrentUser, isLoggedIn, saveUsers, users } = useContext(UserContext);
    const [editProfileData, setEditProfileData] = useState({ firstName: '', lastName: '', phone: '', address: '', email: '', password: '', confPassword: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/home');
        } else {
            setEditProfileData(currentUser);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        document.title = 'Profile';
    }, []);

    function saveProfileInfo() {
        saveCurrentUser({ ...currentUser, ...editProfileData });
        const updatedUsers = users.map((user) =>
            user.email === currentUser.email ? { ...user, ...editProfileData } : user
        );
        saveUsers(updatedUsers);
    }

    function changePassword() {
        if (editProfileData.password === editProfileData.confPassword && editProfileData.password.length >= 8) {
            const updatedUser = { ...currentUser, password: editProfileData.password };
            saveCurrentUser(updatedUser);

            const updatedUsers = users.map((user) =>
                user.email === currentUser.email ? updatedUser : user
            );
            saveUsers(updatedUsers);
        } else {
            alert("Passwords must match and be at least 8 characters");
        }
    }

    if (!isLoggedIn)
        return null;

    return (
        <div>
            <Navbar page={'profile'} />
            <div className='container profile border rounded p-3'>
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Change Information
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body d-flex flex-column gap-1 bg-light">
                                <div className='d-flex gap-1'>
                                    <div className='form-floating w-100'>
                                        <input type='text' className='form-control' name="formId1" id="formId1" placeholder='' required value={editProfileData.firstName} onChange={(e) => {
                                            setEditProfileData({ ...editProfileData, firstName: e.target.value });
                                        }} />
                                        <label htmlFor="formId1">First Name</label>
                                    </div>
                                    <div className='form-floating w-100'>
                                        <input type='text' className='form-control' name="formId2" id="formId2" placeholder='' required value={editProfileData.lastName} onChange={(e) => {
                                            setEditProfileData({ ...editProfileData, lastName: e.target.value });
                                        }} />
                                        <label htmlFor="formId2">Last Name</label>
                                    </div>
                                </div>
                                <div className='form-floating'>
                                    <input type='tel' className='form-control' name="formId3" id="formId3" placeholder='' pattern='[0-9]{11}' required value={editProfileData.phone} onChange={(e) => {
                                        setEditProfileData({ ...editProfileData, phone: e.target.value });
                                    }} />
                                    <label htmlFor="formId3">Phone number</label>
                                </div>
                                <div className='form-floating w-100'>
                                    <input type='text' className='form-control' name="formId4" id="formId4" placeholder='' required value={editProfileData.address} onChange={(e) => {
                                        setEditProfileData({ ...editProfileData, address: e.target.value });
                                    }} />
                                    <label htmlFor="formId4">Address</label>
                                </div>
                                <div className='d-flex align-self-end mt-2'>
                                    <button className='btn btn-outline-success' onClick={() => { saveProfileInfo() }}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Change Password
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body d-flex flex-column bg-light gap-1">
                                <div className='form-floating'>
                                    <input type='password' className='form-control' name="formId5" id="formId5" placeholder='' minLength={8} value={editProfileData.password} onChange={(e) => {
                                        setEditProfileData({ ...editProfileData, password: e.target.value });
                                    }} />
                                    <label htmlFor="formId5">Password</label>
                                </div>
                                <div className='form-floating w-100'>
                                    <input type='password' className='form-control' name="formId6" id="formId6" placeholder='' minLength={8} value={editProfileData.confPassword} onChange={(e) => {
                                        setEditProfileData({ ...editProfileData, confPassword: e.target.value });
                                    }} />
                                    <label htmlFor="formId6">Confirm Password</label>
                                </div>
                                <div className='d-flex align-self-end mt-2'>
                                    <button className='btn btn-outline-success' onClick={() => { changePassword() }}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}