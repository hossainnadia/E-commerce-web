import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";

const Cart = () => {
    // Context থেকে ডাটা নেওয়া হচ্ছে
    const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

    // একদম সলিড পূর্ণসংখ্যা নিশ্চিত করা
    const roundedTotalItems = Math.round(totalItems || 0);
    const roundedTotalPrice = Math.round(totalPrice || 0);

    // কার্ট খালি থাকলে এই UI দেখাবে
    if (!cart || cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 max-w-md mx-auto">
                <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center shadow-sm animate-pulse">
                    <ShoppingBag className="w-10 h-10 text-slate-400" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your cart is empty</h2>
                    <p className="text-slate-500 text-sm">Looks like you haven't added anything to your cart yet. Explore our top catalog to find premium products.</p>
                </div>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-0.5"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="pb-24 pt-4">
            {/* ─── PAGE HEADER ─── */}
            <div className="border-b border-slate-100 pb-6 mb-10">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Cart</h1>
                <p className="text-slate-500 text-sm mt-1">
                    You have <span className="font-bold text-slate-900">{roundedTotalItems}</span> {roundedTotalItems === 1 ? "item" : "items"} in your cart.
                </p>
            </div>

            {/* ─── MAIN CART LAYOUT ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                {/* 1. LEFT SIDE: CARTS ITEM LIST */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => {
                        const itemQuantity = Math.round(item.quantity || 1);

                        // ১টি প্রোডাক্টের ডিসকাউন্টেড প্রাইস (টাকায়)
                        const singlePriceInTk = Math.round(item.price * 120);

                        // কোয়ান্টিটিসহ টোটাল ডিসকাউন্টেড প্রাইস (টাকায়)
                        const itemTotalInTk = singlePriceInTk * itemQuantity;

                        // ১টি প্রোডাক্টের ডিসকাউন্ট ছাড়া আসল প্রাইস (টাকায়)
                        const singleOriginalPriceInTk = item.discountPercentage > 0
                            ? Math.round(singlePriceInTk / (1 - item.discountPercentage / 100))
                            : singlePriceInTk;

                        // কোয়ান্টিটিসহ টোটাল আসল প্রাইস (টাকায়)
                        const totalOriginalPriceInTk = singleOriginalPriceInTk * itemQuantity;

                        return (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl gap-4 shadow-sm hover:shadow-md transition-all group"
                            >
                                {/* Product Image & Title */}
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden p-2 flex items-center justify-center shrink-0">
                                        <img src={item.thumbnail} alt={item.title} className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-slate-800 line-clamp-1 text-base group-hover:text-violet-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs font-semibold text-slate-400 capitalize">{item.category}</p>

                                        {/* 📱 Mobile View Price Section */}
                                        <div className="flex flex-col sm:hidden">
                                            <span className="text-sm font-black text-slate-900">
                                                Tk {singlePriceInTk.toLocaleString('en-IN')}
                                            </span>
                                            {item.discountPercentage > 0 && (
                                                <span className="text-[10px] font-bold text-slate-400 line-through">
                                                    Tk {singleOriginalPriceInTk.toLocaleString('en-IN')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity Controls & Prices */}
                                <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">

                                    {/* Quantity Adjuster Box */}
                                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden text-slate-900">
                                        <button
                                            onClick={() => updateQuantity(item.id, "dec")}
                                            className="p-2.5 hover:bg-slate-200 transition-colors cursor-pointer text-slate-500 hover:text-slate-900"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>

                                        <span className="px-3 text-sm font-black min-w-[24px] text-center select-none">
                                            {itemQuantity}
                                        </span>

                                        <button
                                            onClick={() => updateQuantity(item.id, "inc")}
                                            className="p-2.5 hover:bg-slate-200 transition-colors cursor-pointer text-slate-500 hover:text-slate-900"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* 💻 Desktop View Total Price Section */}
                                    <div className="text-right hidden sm:flex flex-col justify-center min-w-[100px]">
                                        <p className="text-base font-black text-slate-900">
                                            Tk {itemTotalInTk.toLocaleString('en-IN')}
                                        </p>
                                        {item.discountPercentage > 0 && (
                                            <p className="text-xs font-bold text-slate-400 line-through">
                                                Tk {totalOriginalPriceInTk.toLocaleString('en-IN')}
                                            </p>
                                        )}
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                                        title="Remove item"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 2. RIGHT SIDE: ORDER SUMMARY CARD */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-6 shadow-sm lg:sticky lg:top-6">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Order Summary</h3>

                    {/* Calculations */}
                    <div className="space-y-3 border-b border-slate-200 pb-4 text-sm font-medium text-slate-600">
                        <div className="flex justify-between">
                            <span>Subtotal ({roundedTotalItems} {roundedTotalItems === 1 ? "item" : "items"})</span>
                            <span className="text-slate-900 font-bold">
                                Tk {Math.round(roundedTotalPrice * 120).toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping Fees</span>
                            <span className="text-emerald-600 font-bold">FREE</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax</span>
                            <span className="text-slate-900 font-bold">Tk 0</span>
                        </div>
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between items-baseline">
                        <span className="text-base font-bold text-slate-800">Total Amount</span>
                        <span className="text-2xl font-black text-slate-900">
                            Tk {Math.round(roundedTotalPrice * 120).toLocaleString('en-IN')}
                        </span>
                    </div>

                    {/* Checkout Action Button */}
                    <div className="space-y-3 pt-2">
                        <button
                            onClick={() => alert("Proceeding to payment gateway... 🚀")}
                            className="w-full bg-slate-900 hover:bg-violet-600 text-white font-bold text-sm py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                        >
                            <CreditCard className="w-4 h-4" />
                            Proceed to Checkout
                        </button>

                        <Link
                            to="/products"
                            className="w-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs py-3.5 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Back to Shop
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;