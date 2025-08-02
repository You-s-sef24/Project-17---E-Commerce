import './Cart.css'
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./contexts/CartContext";
import { Link } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Navbar from './Navbar';
import Toast from './Toast';

export default function Cart() {
    const { cart, saveCart } = useContext(CartContext);
    const { isLoggedIn } = useContext(UserContext);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        document.title = 'Cart';
    }, []);

    function totalPrice() {
        let total = 0;
        cart.forEach((item) => {
            total += (item.quantity * item.product.priceCents);
        });
        return (total / 100).toFixed(2);
    }

    function totalQuantity() {
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity;
        });
        return total;
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map((i) => {
            if (i.product.id === id) {
                return { ...i, quantity: i.quantity + 1 };
            }
            return i;
        });
        saveCart(updatedCart);
    }

    function decreaseQuantity(id) {
        const item = cart.find((i) => i.product.id === id);
        if (item && item.quantity > 1) {
            const updatedCart = cart.map((i) => {
                if (i.product.id === id) {
                    return { ...i, quantity: i.quantity - 1 };
                }
                return i;
            });
            saveCart(updatedCart);
        }
    }

    function remove(id) {
        const updatedCart = cart.filter((i) => {
            return i.product.id !== id;
        });
        saveCart(updatedCart);

        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    }

    if (cart.length === 0) {
        return (
            <div className='container-fluid cart-items'>
                <Navbar page={'cart'} />
                <div className='text-center mt-5'>
                    <h2 className=''>Your cart is empty</h2>
                    <Link to={'/home'}>
                        <button className='btn btn-outline-success'>Go to Home</button>
                    </Link>
                </div>
            </div>
        )
    }

    const itemsList = cart.map((item) => {
        return (
            <div className='row border rounded mb-3 p-3 mx-1' key={item.product.id}>
                <div className='col-3'>
                    <img src={item.product.image} className='w-100' alt='img' />
                </div>
                <div className='col'>
                    <h3 className=''>{item.product.name}</h3>
                    <p className='fw-bold text-success'>{(item.product.priceCents / 100).toFixed(2)}$</p>
                    <div className='d-flex align-items-center'>
                        <p className='m-0'>Quantity: {item.quantity}</p>
                        <div className='d-flex ms-auto gap-1'>
                            <button className='btn btn-outline-success' onClick={() => { increaseQuantity(item.product.id) }}>+</button>
                            <button className='btn btn-outline-success' onClick={() => { decreaseQuantity(item.product.id) }}>-</button>
                            <button className='btn btn-outline-success' onClick={() => { remove(item.product.id) }}><i className="bx bxs-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <Navbar page={'cart'} />
            <div className="container-fluid cart-items">
                <div className='border rounded mb-3 p-3'>
                    <h2 className='text-center fw-bold'>Cart Summary</h2>
                    <div className='row fw-bold'>
                        <div className='col'>
                            <p className='m-0'>Item(s):</p>
                        </div>
                        <div className='col text-end'>
                            <p className='m-0'>{totalQuantity()}</p>
                        </div>
                    </div>
                    <hr className='m-1' />
                    <div className='row fw-bold'>
                        <div className='col'>
                            <p className='m-0'>Total Price:</p>
                        </div>
                        <div className='col text-end'>
                            <p className='m-0'>{totalPrice()}$</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        <Link to={isLoggedIn ? '/checkout' : '/login'}>
                            <button className={`btn btn-outline-success`}>Place your order</button>
                        </Link>
                    </div>
                </div>

                {itemsList}
                {showToast && <Toast msg={"Item removed"} showToast={showToast} />}
            </div>
        </div>
    );
}