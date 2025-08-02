import './Navbar.css';
import { UserContext } from "./contexts/UserContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./contexts/CartContext";

export default function Navbar({ page }) {
    const { cart, saveCart } = useContext(CartContext);
    const { currentUser, saveCurrentUser, isLoggedIn, saveLogin } = useContext(UserContext);
    const [search, setSearch] = useState("");
    const hideSearchPages = ['cart', 'profile', 'orders', 'checkout'];
    const navigate = useNavigate();

    function handleLogout() {
        saveLogin(false);
        saveCurrentUser(null);
        saveCart([]);
        navigate('/home');
    }

    function handleSearch(e) {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search/${encodeURIComponent(search.trim())}`);
        }
    }

    return (
        <nav className="navbar bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand text-white fw-bold fs-3" to="/home">EzBuy</Link>

                {!hideSearchPages.includes(page)
                    ? (
                        <form className="col-6 d-flex input-group w-50" onSubmit={handleSearch}>
                            <input className="form-control" type="search" placeholder="What are you looking for?" value={search} onChange={(e) => {
                                setSearch(e.target.value);;
                            }} />
                            <button type='sumbit' className='btn btn-light'><img src='/images/icons/search-icon.png' className='w-50' alt='search' /></button>
                        </form>
                    ) : ('')}


                <div className="d-flex align-items-center gap-3">
                    {
                        isLoggedIn ?
                            (<div className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white fw-bold"
                                    to={'/home'}
                                    id="dropdownId"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    Welcome, {currentUser?.firstName}
                                </Link>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownId"
                                >
                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                    <Link className="dropdown-item" to="/orders">Orders</Link>
                                    <hr className="m-0" />
                                    <button className="dropdown-item" onClick={() => { handleLogout() }}>Logout</button>
                                </div>
                            </div>) :
                            (<div>
                                <Link to={"/login"}>
                                    <button className="btn btn-success">Sign in</button>
                                </Link>
                            </div>)
                    }
                    {page !== 'checkout' ? (
                        <div>
                            <Link className="nav-link position-relative" to="/cart">
                                <img className="w-75" src='../images/icons/cart-icon.png' alt="" ></img>
                                <span className="noti">{cart.length}</span>
                            </Link>
                        </div>
                    ) : ('')
                    }
                </div>
            </div>
        </nav>
    );
}