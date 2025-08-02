import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Cart from './Cart';
import Profile from './Profile';
import Checkout from './Checkout';
import Orders from './Orders';
import SearchResults from './SearchResults';

function App() {
    return (
        <div className='bg-light'>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path='/search/:keyword' element={<SearchResults />} />
            </Routes>
        </div>
    );
}

export default App;