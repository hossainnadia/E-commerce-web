import React from "react";
import { useCart } from "../context/CartContext"; // টোটাল প্রাইস ট্র্যাকিংয়ের জন্য
import { ClipboardList, CheckCircle2, Clock, Truck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Order = () => {
    // ডামি অর্ডার ডেটা (ভবিষ্যতে আপনি এটি আপনার OrderContext থেকে রিপ্লেস করতে পারবেন)
    const dummyOrders = [
        { id: "ORD-98342", date: "25 June 2026", total: 129.99, status: "Delivered", items: 3 },
        { id: "ORD-97120", date: "28 June 2026", total: 45.50, status: "In Transit", items: 1 },
    ];

    const getStatusStyle = (status) => {
        if (status === "Delivered") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white py-12 rounded-xl">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">

                {/* Header */}
                <div className="flex items-center space-x-3 border-b border-slate-800 pb-6 mb-10">
                    <div className="bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-2.5 rounded-xl shadow-lg">
                        <ClipboardList className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">Your Orders</h1>
                        <p className="text-slate-400 text-xs mt-0.5">Track and manage your recent store purchases</p>
                    </div>
                </div>

                {dummyOrders.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/60 p-8">
                        <p className="text-slate-400 mb-4">No orders placed yet.</p>
                        <Link to="/products" className="inline-flex items-center text-xs font-bold text-violet-400 hover:underline">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {dummyOrders.map((order) => (
                            <div key={order.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition hover:border-slate-700/60">

                                {/* Left Side Info */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm font-black text-slate-200">{order.id}</span>
                                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400">Placed on: <span className="text-slate-300 font-medium">{order.date}</span></p>
                                    <p className="text-xs text-slate-400">Total Items: <span className="text-slate-300 font-medium">{order.items}</span></p>
                                </div>

                                {/* Tracking Progress Map (Visual Indicator) */}
                                <div className="hidden lg:flex items-center space-x-8 text-xs text-slate-400">
                                    <div className="flex items-center space-x-2 text-violet-400 font-medium">
                                        <CheckCircle2 className="w-4 h-4" /> <span>Confirmed</span>
                                    </div>
                                    <div className="w-8 h-0.5 bg-slate-800" />
                                    <div className={`flex items-center space-x-2 ${order.status !== "Delivered" ? "text-amber-400 animate-pulse" : "text-violet-400"}`}>
                                        <Truck className="w-4 h-4" /> <span>Shipping</span>
                                    </div>
                                    <div className="w-8 h-0.5 bg-slate-800" />
                                    <div className={`flex items-center space-x-2 ${order.status === "Delivered" ? "text-emerald-400" : "text-slate-600"}`}>
                                        <CheckCircle2 className="w-4 h-4" /> <span>Delivered</span>
                                    </div>
                                </div>

                                {/* Right Side Cost / Action */}
                                <div className="flex md:flex-col justify-between items-center md:items-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-800/80">
                                    <div className="text-left md:text-right">
                                        <p className="text-xs text-slate-400 font-medium">Total Amount</p>
                                        <p className="text-lg font-black text-violet-400">${order.total.toFixed(2)}</p>
                                    </div>
                                    <button className="mt-2 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl transition border border-slate-700/50 cursor-pointer">
                                        View Details
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Order;