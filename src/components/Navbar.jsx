import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart, LogOut, User, Menu, X, Layers, LayoutDashboard } from "lucide-react";

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const { totalItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // ইউনিক অ্যাক্টিভ ইন্ডিকেটর (নিচে একটা ডট বা আন্ডারলাইন এফেক্ট দেবে)
    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsOpen(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <nav className="bg-slate-900 text-white sticky top-0 z-60 shadow-2xl border-b border-slate-800">
            <div className="container mx-auto px-4 md:px-6 py-6 flex justify-between items-center">

                {/* Left Side: Mobile Menu Button & Brand Logo */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-1.5 text-slate-400 hover:text-violet-400 hover:bg-slate-800 rounded-lg transition"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                            <Layers className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black bg-gradient-to-r from-white via-slate-200 to-violet-400 bg-clip-text text-transparent tracking-tight">
                            AmarBazar <span className="text-violet-500">.</span>
                        </span>
                    </Link>
                </div>

                {/* Center: Unique Navigation Links (Desktop Only) */}
                <div className="hidden md:flex space-x-1 font-medium text-sm">
                    {[
                        { name: "Home", path: "/" },
                        { name: "Products", path: "/products" },
                        { name: "Order", path: "/order" },
                        { name: "Contact", path: "/contact" }
                    ].map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-2 rounded-lg transition-all relative ${isActive(link.path)
                                ? "text-violet-400 bg-slate-800/60 font-semibold"
                                : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                                }`}
                        >
                            {link.name}
                            {isActive(link.path) && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Side: Unique Buttons & Controls */}
                <div className="flex items-center space-x-3">

                    {/* Neon Style Cart Icon */}
                    <Link to="/cart" className="relative p-2.5 text-slate-300 hover:text-violet-400 hover:bg-slate-800 rounded-xl transition">
                        <ShoppingCart className="w-5 h-5" />
                        {totalItems > 0 && (
                            <span className="absolute top-1 right-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg shadow-violet-500/50">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* User Auth Controls (Desktop Only) */}
                    <div className="hidden md:flex items-center space-x-3">
                        {user ? (
                            <div className="flex items-center space-x-5 bg-slate-800/40 p-1.5 pl-2.5 rounded-xl border border-slate-800">

                                {/* Dashboard Navigation Link */}
                                <Link to="/dashboard" className={`flex items-center text-xs font-bold ${isActive("/dashboard") ? "text-violet-400" : "text-slate-300 hover:text-white"}`}>

                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-slate-800 hover:bg-red-950/40 text-white  text-xs hover:text-red-400 rounded-lg  hover:border-red-900/50 transition-all flex items-center cursor-pointer"
                                >
                                    Logout
                                </button>

                            </div>

                        ) : (
                            <Link
                                to="/login"
                                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-white rounded-xl group bg-gradient-to-br from-purple-600 to-violet-500 group-hover:from-purple-600 group-hover:to-violet-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-violet-800 shadow-lg shadow-violet-500/20"
                            >
                                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-slate-900 rounded-[10px] group-hover:bg-opacity-0">
                                    Join / Login
                                </span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Profile Icon Shortcut */}
                    <div className="md:hidden">
                        {user ? (
                            <Link to="/dashboard" className="p-2 text-slate-300 hover:text-violet-400 block bg-slate-800 rounded-xl">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="User" className="w-5 h-5 rounded-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5" />
                                )}
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-black shadow-md shadow-violet-600/30"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                </div>
            </div>

            {/* --- Mobile Slide-Down Menu --- */}
            <div
                className={`md:hidden bg-slate-950 border-b border-slate-800 absolute w-full left-0 transition-all duration-300 shadow-2xl ${isOpen ? "opacity-100 visible h-auto py-5" : "opacity-0 invisible h-0 overflow-hidden"
                    }`}
            >
                <div className="flex flex-col space-y-2 px-6 font-medium text-sm">
                    {[
                        { name: "Home", path: "/" },
                        { name: "Products", path: "/products" },
                        { name: "Order", path: "/order" },
                        { name: "Contact", path: "/contact" }
                    ].map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`py-2.5 px-3 rounded-lg flex items-center justify-between ${isActive(link.path) ? "text-violet-400 bg-slate-900 font-bold" : "text-slate-400 hover:text-white"
                                }`}
                        >
                            <span>{link.name}</span>
                            {isActive(link.path) && <span className="w-1.5 h-1.5 bg-violet-500 rounded-full" />}
                        </Link>
                    ))}

                    {user && (
                        <div className="pt-4 border-t border-slate-800/60 flex flex-col space-y-2">
                            <Link
                                to="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className={`py-2.5 px-3 rounded-lg flex items-center text-slate-300 ${isActive("/dashboard") ? "text-violet-400 bg-slate-900" : ""}`}
                            >
                                <LayoutDashboard className="w-4 h-4 mr-2 text-violet-400" />
                                Go to Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-left py-2.5 px-3 text-red-400 hover:bg-red-950/20 rounded-lg flex items-center font-semibold cursor-pointer"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout Account
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;