import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // ─── ১. পেজ লোড হওয়ার সময় LocalStorage থেকে ডাটা নেওয়া ───
    const [cart, setCart] = useState(() => {
        const localData = localStorage.getItem("shopping_cart");
        return localData ? JSON.parse(localData) : [];
    });

    // ─── ২. কার্ট চেঞ্জ হলেই স্বয়ংক্রিয়ভাবে LocalStorage-এ সেভ করা ───
    useEffect(() => {
        localStorage.setItem("shopping_cart", JSON.stringify(cart));
    }, [cart]);

    // প্রোডাক্ট কার্টে যোগ করার ফাংশন
    const addToCart = (product) => {
        setCart((prevCart) => {
            const isExist = prevCart.find((item) => item.id === product.id);
            if (isExist) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // কার্ট থেকে প্রোডাক্ট পুরোপুরি মুছে ফেলার ফাংশন
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // কার্টের প্রোডাক্টের পরিমাণ (Quantity) বাড়ানো বা কমানোর ফাংশন
    const updateQuantity = (id, type) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === id) {
                    const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
                    return { ...item, quantity: newQty < 1 ? 1 : newQty };
                }
                return item;
            })
        );
    };

    // কার্টের মোট মূল্য এবং মোট আইটেম সংখ্যা হিসাব করা
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);