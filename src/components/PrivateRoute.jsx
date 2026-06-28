import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // ফায়ারবেস যখন ইউজার স্টেট লোড করবে, তখন একটি সুন্দর স্পিনার দেখাবে
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-200/20">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-violet-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    // ইউজার লগইন থাকলে পেজটি রেন্ডার হবে
    if (user) {
        return children;
    }

    // লগইন না থাকলে সরাসরি লগইন পেজে রিডাইরেক্ট করবে
    return <Navigate to="/login" replace />;
};

export default PrivateRoute;