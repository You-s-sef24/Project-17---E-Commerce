import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    function saveCart(product) {
        localStorage.setItem('cart', JSON.stringify(product));
        setCart(product);
    }

    return (
        <CartContext.Provider value={{ cart, saveCart }}>
            {children}
        </CartContext.Provider>
    );
}
