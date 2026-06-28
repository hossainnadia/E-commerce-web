import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";

const Login = () => {
    const { loginUser, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle Email & Password Login Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Please enter both email and password!");
            return;
        }

        try {
            // ফায়ারবেস লগইন ফাংশন কল (এটি একটি প্রমিজ)
            await loginUser(email, password);

            setSuccess("Login Successful! Redirecting...");
            setTimeout(() => navigate("/"), 1500);

        } catch (err) {
            console.error("Login Error:", err);
            // ভুল ইমেইল বা পাসওয়ার্ডের এরর মেসেজ সুন্দরভাবে হ্যান্ডেল করা
            if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
                setError("Invalid email or password. Please try again.");
            } else {
                setError(err.message.replace("Firebase: ", ""));
            }
        }
    };

    // Handle Google Popup Login Trigger
    const handleGoogleLogin = async () => {
        setError("");
        setSuccess("");

        try {
            // গুগল পপআপ লগইন কল
            await loginWithGoogle();

            setSuccess("Google Login Successful!");
            setTimeout(() => navigate("/"), 1500);

        } catch (err) {
            console.error("Google Login Error:", err);
            if (err.code === "auth/popup-closed-by-user") {
                setError("Login process was closed. Please try again.");
            } else {
                setError(err.message.replace("Firebase: ", ""));
            }
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-25">
            <div className="max-w-md w-full bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-900/5 space-y-6">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
                    <p className="text-slate-500 font-medium text-sm">Please enter your credentials to log in</p>
                </div>

                {/* Status Alert Messages */}
                {error && (
                    <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3.5 rounded-xl flex items-center gap-2 text-sm font-bold animate-shake">
                        <AlertCircle className="w-4 h-4 shrink-0" /> <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 p-3.5 rounded-xl flex items-center gap-2 text-sm font-bold">
                        <CheckCircle className="w-4 h-4 shrink-0" /> <span>{success}</span>
                    </div>
                )}

                {/* Traditional Credentials Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="email"
                                placeholder="example@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-violet-600 focus:bg-white rounded-xl text-sm font-semibold outline-none transition-all text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-violet-600 focus:bg-white rounded-xl text-sm font-semibold outline-none transition-all text-slate-800"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-black rounded-xl shadow-lg transition-all transform hover:scale-[0.99] cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>

                {/* Visual "Or" Section Divider */}
                <div className="relative flex py-2 items-center text-slate-300">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase">Or continue with</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Firebase Google Auth Alternative Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer"
                >
                    {/* Google Vector Icon */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Sign in with Google
                </button>

                {/* Footer Link Alternative */}
                <p className="text-center text-sm font-semibold text-slate-500">
                    New to our shop?{" "}
                    <Link to="/register" className="text-violet-600 hover:underline font-bold">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;