import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import PrivateRoute from "./components/PrivateRoute";

// ─── কাস্টম পেজ লেআউট (কন্টেইনার ও প্যাডিং) ───
const PageLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 max-w-8xl">
      {children}
    </div>
  );
};

function App() {
  const { user } = useAuth(); // বর্তমান লগইন ইউজার স্টেট

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* ইউজার লগইন থাকলে তবেই ন্যাভবার দেখাবে */}
        {user && <Navbar />}

        {/* মেইন কন্টেইনার */}
        <main className="flex-grow w-full">
          <Routes>
            {/* অথেন্টিকেশন পেজসমূহ (লগইন করা থাকলে এগুলো আর দেখা যাবে না, সরাসরি হোম পেজে পাঠাবে) */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />

            {/* সব প্রাইভেট পেজ (হোম পেজসহ সবকিছু এখন প্রোটেক্টড, লগইন ছাড়া অ্যাক্সেস নাই) */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <PageLayout><Products /></PageLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <PrivateRoute>
                  <PageLayout><ProductDetails /></PageLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <PageLayout><Contact /></PageLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <PageLayout><Cart /></PageLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/order"
              element={
                <PrivateRoute>
                  <PageLayout><Order /></PageLayout>
                </PrivateRoute>
              }
            />

            {/* ─── ড্যাশবোর্ড ও সাব-রাউট কনফিগারেশন ───
              এখানে '/*' দেওয়ার কারণে ড্যাশবোর্ডের ভেতরের nested routes (orders, profile) পারফেক্টলি কাজ করবে।
              ফুল-স্ক্রিন প্রিমিয়াম সাইডবার লেআউট বজায় রাখার জন্য এখান থেকে <PageLayout> সরানো হয়েছে।
            */}
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* ভুল কোনো ইউআরএল লিখলে লগইন স্ট্যাটাস অনুযায়ী রিডাইরেক্ট করবে */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
          </Routes>
        </main>

        {/* ইউজার লগইন থাকলে তবেই ফুটার দেখাবে */}
        {user && <Footer />}
      </div>
    </Router>
  );
}

export default App;