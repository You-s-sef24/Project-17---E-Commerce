import { useParams } from "react-router-dom";
import { products } from "./backend/products";
import Navbar from "./Navbar";
import Toast from "./Toast";
import { useContext, useState } from "react";
import { CartContext } from "./contexts/CartContext";

export default function SearchResults() {
    const [showToast, setShowToast] = useState();
    const { cart, saveCart } = useContext(CartContext);
    const { keyword } = useParams();
    const lowerKeyword = keyword?.toLowerCase();

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

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(lowerKeyword);
    });
    const renderFilteredProducts = filteredProducts.map((product) => {
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
        );
    });

    return (
        <div>
            <Navbar page={'Search Results'} />
            <div className='container-fluid products'>
                <div className='row d-flex '>
                    {renderFilteredProducts}
                </div>
                {showToast && <Toast msg={"Item added successfully"} showToast={showToast} />}
            </div>
        </div>
    );
}