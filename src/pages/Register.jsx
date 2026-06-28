import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";

const Register = () => {
    const { createUser } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => { // async যুক্ত করা হলো
        e.preventDefault();
        setError("");
        setSuccess("");

        // বেসিক ফিল্ড চেক
        if (!name || !email || !password) {
            setError("Please fill in all fields!");
            return;
        }

        // ফায়ারবেস রুল অনুযায়ী পাসওয়ার্ড মিনিমাম ৬ ক্যারেক্টার হতে হবে
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            // সঠিক অর্ডারে পাঠানো হলো: (email, password, name)
            await createUser(email, password, name);

            setSuccess("Registration Successful! Redirecting...");

            // অ্যাকাউন্ট তৈরি সফল হলে ২ সেকেন্ড পর সরাসরি ড্যাশবোর্ডে নিয়ে যাবে
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

        } catch (err) {
            console.error("Firebase Auth Error:", err.message);
            // ফায়ারবেসের হিজিবিজি এরর মেসেজ ক্লিন করে ইউজারকে দেখানো হচ্ছে
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered!");
            } else if (err.code === "auth/invalid-email") {
                setError("Invalid email address format!");
            } else {
                setError(err.message.replace("Firebase: ", ""));
            }
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-25">
            <div className="max-w-md w-full bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-900/5 space-y-6">

                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h2>
                    <p className="text-slate-500 font-medium text-sm">Join us today to explore premium products</p>
                </div>

                {/* Status Notifications */}
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

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name Input */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-violet-600 focus:bg-white rounded-xl text-sm font-semibold outline-none transition-all text-slate-800"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
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

                    {/* Password Input */}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-black rounded-xl shadow-lg transition-all transform hover:scale-[0.99] cursor-pointer"
                    >
                        Register Now
                    </button>
                </form>

                {/* Redirect Link */}
                <p className="text-center text-sm font-semibold text-slate-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-violet-600 hover:underline font-bold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;