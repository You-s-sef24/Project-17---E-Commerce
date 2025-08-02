import { useState, useContext, useEffect } from 'react';
import './Checkout.css';
import Navbar from './Navbar';
import Toast from './Toast';
import { CartContext } from './contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

export default function Checkout() {
    const { cart, saveCart } = useContext(CartContext);
    const { currentUser, saveCurrentUser } = useContext(UserContext);
    const [orderDetails, setOrderDetails] = useState({
        orderId: '',
        orderItems: [],
        date: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        Governorate: '',
        zipCode: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [showToast, setShowToast] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();
    const filled = [
        orderDetails.firstName,
        orderDetails.lastName,
        orderDetails.address,
        orderDetails.Governorate,
        orderDetails.city,
        orderDetails.email,
        orderDetails.phone,
        orderDetails.phone,
        orderDetails.cardNumber,
        orderDetails.expiryDate,
        orderDetails.cvv,
    ].every(Boolean);

    useEffect(() => {
        if (cart.length === 0 && !orderPlaced) {
            navigate('/');
        }
    }, [cart, orderPlaced, navigate]);

    useEffect(() => {
        if (currentUser) {
            const orderId = Date.now();
            const today = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            setOrderDetails(prev => ({
                ...prev,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                phone: currentUser.phone,
                address: currentUser.address,
                email: currentUser.email,
                orderId: orderId,
                orderItems: cart,
                date: today
            }));
        }
    }, [currentUser, cart]);

    function handleSubmit(e) {
        e.preventDefault();
        const updatedOrders = Array.isArray(currentUser.orders)
            ? [...currentUser.orders, orderDetails]
            : [orderDetails];

        const updatedUser = {
            ...currentUser,
            orders: updatedOrders
        };
        saveCart([]);
        saveCurrentUser(updatedUser);
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setOrderPlaced(true);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            navigate('/orders');
        }, 2500);
    }

    return (
        <div>
            <Navbar page={'checkout'} />
            <form className='container-fluid checkout' autoComplete="off" onSubmit={(e) => { handleSubmit(e) }}>
                <h2 className='fw-bold mb-3'>Review and Pay ({cart.length} Items)</h2>
                <h3 className='text-success fw-bold'>Shipping</h3>
                <div className='d-flex flex-column gap-1'>
                    <div className='d-flex gap-2'>
                        <div className='form-floating w-100'>
                            <input type='text' className='form-control' name="formId1" id="formId1" placeholder='' required value={orderDetails.firstName} onChange={(e) => {
                                setOrderDetails({ ...orderDetails, firstName: e.target.value });
                            }} />
                            <label htmlFor="formId1">First Name</label>
                        </div>
                        <div className='form-floating w-100'>
                            <input type='text' className='form-control' name="formId2" id="formId2" placeholder='' required value={orderDetails.lastName} onChange={(e) => {
                                setOrderDetails({ ...orderDetails, lastName: e.target.value });
                            }} />
                            <label htmlFor="formId2">Last Name</label>
                        </div>
                    </div>
                    <div className='form-floating w-100'>
                        <input type='text' className='form-control' name="formId3" id="formId3" placeholder='' required value={orderDetails.address} onChange={(e) => {
                            setOrderDetails({ ...orderDetails, address: e.target.value });
                        }} />
                        <label htmlFor="formId3">Address</label>
                    </div>
                    <div className='d-flex gap-2'>
                        <div className='form-floating w-100'>
                            <input type='text' className='form-control' name="formId5" id="formId5" placeholder='' required value={orderDetails.Governorate} onChange={(e) => {
                                setOrderDetails({ ...orderDetails, Governorate: e.target.value });
                            }} />
                            <label htmlFor="formId5">Governorate</label>
                        </div>
                        <div className='form-floating w-100'>
                            <input type='text' className='form-control' name="formId4" id="formId4" placeholder='' required value={orderDetails.city} onChange={(e) => {
                                setOrderDetails({ ...orderDetails, city: e.target.value });
                            }} />
                            <label htmlFor="formId4">City</label>
                        </div>
                    </div>
                    <div className='form-floating w-100'>
                        <input type='text' className='form-control' name="formId6" id="formId6" placeholder='' required={false} value={orderDetails.zipCode} onChange={(e) => {
                            setOrderDetails({ ...orderDetails, zipCode: e.target.value });
                        }} />
                        <label htmlFor="formId6">Zip code</label>
                    </div>
                    <div className='form-floating w-100'>
                        <input type='email' className='form-control' name="formId7" id="formId7" placeholder='' required value={orderDetails.email} onChange={(e) => {
                            setOrderDetails({ ...orderDetails, email: e.target.value });
                        }} />
                        <label htmlFor="formId7">Email</label>
                    </div>
                    <div className='form-floating w-100 mb-2'>
                        <input type='tel' className='form-control' name="formId8" id="formId8" placeholder='' required value={orderDetails.phone} onChange={(e) => {
                            setOrderDetails({ ...orderDetails, phone: e.target.value });
                        }} />
                        <label htmlFor="formId8">Phone number</label>
                    </div>
                    <h3 className='text-success fw-bold'>Payment</h3>
                    <div className='form-floating w-100'>
                        <input type='text' inputMode='numeric' pattern='\d*' className='form-control' name="formId9" id="formId9" placeholder='' required value={orderDetails.cardNumber} onChange={(e) => {
                            setOrderDetails({ ...orderDetails, cardNumber: e.target.value });
                        }} />
                        <label htmlFor="formId9">Card Number</label>
                    </div>
                    <div className='d-flex gap-2 mb-3'>
                        <div className='form-floating w-100'>
                            <input type='text' pattern='\d{2}/\d{2}' className='form-control' name="formId10" id="formId10" placeholder='' required value={orderDetails.expiryDate} onChange={(e) => {
                                setOrderDetails({ ...orderDetails, expiryDate: e.target.value });
                            }} />
                            <label htmlFor="formId10">MM/YY</label>
                        </div>
                        <div className='form-floating w-100'>
                            <input type='text' className='form-control' name="formId11" id="formId11" placeholder='' required value={orderDetails.cvv} onChange={(e) => {
                                setOrderDetails({ ...orderDetails, cvv: e.target.value });
                            }} />
                            <label htmlFor="formId11">CVV</label>
                        </div>
                    </div>
                    <div className='d-flex ms-auto gap-1 mb-4'>
                        <Link to={'/cart'}>
                            <button className='btn btn-secondary'>Cancel</button>
                        </Link>
                        <button type='submit' disabled={!filled} className='btn btn-outline-success'>Place Order</button>
                    </div>
                </div>
            </form>
            <Toast msg={"Order placed successfully!"} showToast={showToast} />
        </div>
    );
}