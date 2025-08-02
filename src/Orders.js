import './Orders.css';
import { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { UserContext } from "./contexts/UserContext";
import { Link, useNavigate } from 'react-router-dom';

export default function Orders() {
    const { currentUser, isLoggedIn } = useContext(UserContext);
    const orders = currentUser?.orders || [];
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Orders';
        if (!isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);

    const ordersList = orders.map((order) => {
        let totalPrice = 0;
        const Items = order.orderItems.map((item) => {
            const itemName = item.product.name;
            const itemPrice = item.product.priceCents;
            const itemQuantity = item.quantity;
            totalPrice += itemPrice * itemQuantity;
            return (
                <div className='d-flex justify-content-between' key={item.product.id}>
                    <h5 className='fw-bold'>{itemName} (x{itemQuantity})</h5>
                    <h5 className='fw-bold text-success'>{((itemPrice * itemQuantity) / 100).toFixed(2)}$</h5>
                </div>
            );
        });

        return (
            <div className="border shadow rounded p-3 mb-4" key={order.orderId}>
                <div className='d-flex justify-content-between'>
                    <h4 className='fw-bold text-success m-0'>Order ID: {order.orderId}</h4>
                    <div className='d-flex align-items-center gap-1'>
                        <h4 className='m-0'><i className='bxr  bx-calendar-alt text-success'></i></h4>
                        <h4 className='fw-bold'>Date: {order.date}</h4>
                    </div>
                </div>
                <hr />
                <div className='d-flex justify-content-between mb-3'>
                    <div className='d-flex align-items-center gap-1'>
                        <i className='bxr text-success bx-location'  ></i>
                        <p className='fw-bold m-0'>Location: {order.address} / {order.city} / {order.Governorate}</p>
                    </div>
                    <div className='d-flex align-items-center gap-1'>
                        <i className='bxr bx-phone text-success'></i>
                        <p className='fw-bold m-0'>Phone Number: {order.phone}</p>
                    </div>
                </div>
                <h3 className='fw-bold'>Items:</h3>
                {Items}
                <hr />
                <div className='d-flex justify-content-between text-success'>
                    <h3 className='fw-bold'>Total Price: </h3>
                    <h3 className='fw-bold'>{(totalPrice / 100).toFixed(2)}$</h3>
                </div>
            </div>
        );
    });

    if (!isLoggedIn)
        return null;
    if (orders.length === 0) {
        return (
            <div className='container-fluid orders'>
                <Navbar page={'orders'} />
                <div className='text-center mt-5'>
                    <h2 className=''>No orders yet</h2>
                    <Link to={'/home'}>
                        <button className='btn btn-outline-success'>Go to Home</button>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Navbar page={'orders'} />
            <div className="container-fluid orders">
                <h1 className='text-center text-success fw-bold'>My Orders</h1>
                <hr />
                {ordersList}
            </div>
        </div>
    );
}