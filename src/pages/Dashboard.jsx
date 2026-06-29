import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
    Layers,
    ShoppingBag,
    User,
    Settings,
    LogOut,
    Menu,
    X,
    ArrowUpRight,
    Sparkles
} from 'lucide-react';

// ─── সাব-পেজ কম্পোনেন্টসমূহ ───
const OverviewPage = () => (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-16 text-center max-w-lg w-full shadow-2xs relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        <div className="h-12 w-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Layers size={20} className="text-indigo-600" />
        </div>
        <h3 className="text-base font-bold text-gray-900 tracking-tight flex items-center justify-center gap-1.5">
            <Sparkles size={16} className="text-amber-500" />
            Overview Architecture Complete
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto mt-2">
            Welcome to your main console. Fully integrated with react-router nested paths.
        </p>
    </div>
);

const OrdersPage = () => (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 max-w-2xl w-full shadow-2xs">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShoppingBag size={20} className="text-indigo-600" /> My Orders
        </h3>
        <div className="border-2 border-dashed border-gray-100 rounded-xl p-8 text-center text-xs text-gray-400">
            No recent orders found. URL Routing is active.
        </div>
    </div>
);

const ProfilePage = () => (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 max-w-md w-full shadow-2xs">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User size={20} className="text-indigo-600" /> Account Profile
        </h3>
        <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xl">
                NH
            </div>
            <div>
                <h4 className="text-sm font-bold text-gray-900">Nadia Hossain</h4>
                <p className="text-xs text-gray-400">nadia@example.com</p>
            </div>
        </div>
    </div>
);

const SettingsPage = () => (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 max-w-md w-full shadow-2xs">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings size={20} className="text-indigo-600" /> System Settings
        </h3>
        <p className="text-xs text-gray-400 mb-4">Configure your profile security preference keys here.</p>
    </div>
);

// ─── মেইন ড্যাশবোর্ড কম্পোনেন্ট ───
const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Overview', icon: Layers, path: '/dashboard' },
        { name: 'Orders', icon: ShoppingBag, path: '/dashboard/orders' },
        { name: 'Profile', icon: User, path: '/dashboard/profile' },
        { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 flex flex-col md:flex-row antialiased">

            {/* --- MOBILE ACCENT HEADER --- */}
            <div className="md:hidden bg-[#0b1329] px-6 py-4 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md">
                        <Layers size={18} />
                    </div>
                    <span className="font-bold tracking-tight text-xl text-white">
                        AmarBazar<span className="text-purple-500">.</span>
                    </span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* --- SIDEBAR --- */}
            <div className={`
        fixed inset-y-0 left-0 w-64 bg-[#0b1329] p-6 flex flex-col justify-between z-50
        transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="space-y-10">
                    <div className="hidden md:flex items-center gap-3 px-2">
                        <div className="h-10 w-10 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Layers size={20} />
                        </div>
                        <div>
                            <span className="font-bold tracking-tight text-xl text-white block leading-none">
                                AmarBazar<span className="text-purple-500">.</span>
                            </span>
                            <span className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold mt-1 block">Enterprise</span>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-1.5">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-medium transition-all group ${isActive
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                                            : 'text-indigo-200/70 hover:bg-gray-800/50 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={16} className={isActive ? 'text-white' : 'text-indigo-300/60 group-hover:text-white transition'} />
                                        <span>{item.name}</span>
                                    </div>
                                    {!isActive && <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 text-indigo-300 transition" />}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium text-red-400 hover:bg-red-950/20 transition-all">
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* --- MAIN INTERFACE AREA --- */}
            <main className="flex-1 p-6 md:p-12 max-w-6xl w-full mx-auto flex flex-col justify-between">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
                    <div>
                        <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Secure Guard Active
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mt-2">
                            User Dashboard
                        </h1>
                    </div>
                </div>

                {/* --- NESTED SUB-ROUTES RENDERING --- */}
                <div className="flex-1 flex items-center justify-center py-6">
                    <Routes>
                        <Route path="/" element={<OverviewPage />} />
                        <Route path="orders" element={<OrdersPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="settings" element={<SettingsPage />} />
                    </Routes>
                </div>

                <footer className="text-center text-[10px] text-gray-400 tracking-wide mt-8 pt-4 border-t border-gray-50">
                    Powered by AmarBazar Security Suite &bull; All Rights Reserved 2026
                </footer>
            </main>

        </div>
    );
};

export default Dashboard;