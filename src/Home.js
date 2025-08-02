import { useContext, useEffect, useState } from 'react';
import './Home.css'
import { products } from './backend/products'
import { CartContext } from './contexts/CartContext';
import Navbar from './Navbar';
import Toast from './Toast';
import { UserContext } from './contexts/UserContext';


export default function Home() {
    const { cart, saveCart } = useContext(CartContext);
    const [showToast, setShowToast] = useState(false);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        document.title = 'EzBuy';
        console.log(currentUser);

    }, [currentUser]);

    function addToCart(product) {
        const found = cart.find((p) => p.product.id === product.id);
        if (!found) {
            saveCart([...cart, { product, quantity: 1 }]);
        } else {
            const updatedCart = cart.map((p) => {
                if (p.product.id === product.id) {
                    return { ...p, quantity: p.quantity + 1 };
                }
                return p;
            });
            saveCart(updatedCart);
        }
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    }

    const itemsList = products.map((product) => {
        return (
            <div className='d-flex col-12 col-sm-6 col-md-4 col-lg-3 mb-3' key={product.id}>
                <div className="card w-100">
                    <img className="card-img-top" src={product.image} alt="Title" />
                    <div className="card-body d-flex flex-column">
                        <h4 className="card-title">{product.name}</h4>
                        <div className='d-flex justify-content-between text-success mt-auto'>
                            <p className="card-text fw-bold m-0">{(product.priceCents / 100).toFixed(2)}$</p>
                            <div className='d-flex align-items-center mb-3'>
                                <i className='bxr bx-star'></i>
                                <p className='card-text'>{product.rating.count}</p>
                            </div>
                        </div>
                        <button className='btn btn-outline-success mt-auto' onClick={() => { addToCart(product) }}>Add to cart</button>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div>
            <Navbar page={'home'} />
            <div className='container-fluid products'>
                <div className='row d-flex '>
                    {itemsList}
                </div>
                {showToast && <Toast msg={"Item added successfully"} showToast={showToast} />}
            </div>
        </div>
    );
}