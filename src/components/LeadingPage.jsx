import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ArrowRight, ShoppingBag, Sparkles, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LeadingPage = () => {
    const [sliderProducts, setSliderProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [notification, setNotification] = useState("");

    // API থেকে প্রোডাক্ট লোড করা
    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=8")
            .then(res => res.json())
            .then(data => setSliderProducts(data.products));
    }, []);

    // অটো-স্লাইডার লজিক
    useEffect(() => {
        if (sliderProducts.length === 0) return;
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev === sliderProducts.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(slideInterval);
    }, [sliderProducts]);

    const nextSlide = () => setCurrentSlide((prev) => (prev === sliderProducts.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? sliderProducts.length - 1 : prev - 1));

    const currentProduct = sliderProducts[currentSlide];

    // প্রাইস ক্যালকুলেশন (দশমিক যেন না থাকে)
    const priceInTk = currentProduct ? Math.round(currentProduct.price * 120) : 0;

    // অরিজিনাল প্রাইস ক্যালকুলেশন (ডিসকাউন্ট থাকলে)
    const originalPriceInTk = currentProduct
        ? Math.round((currentProduct.price / (1 - currentProduct.discountPercentage / 100)) * 120)
        : 0;

    const slideGradients = [
        "from-slate-950 via-indigo-950 to-slate-950",
        "from-slate-950 via-violet-950 to-slate-950",
        "from-slate-950 via-fuchsia-950 to-slate-950"
    ];

    if (!currentProduct) return null; // ডেটা লোড না হওয়া পর্যন্ত খালি রাখা

    return (
        <div className="relative w-full overflow-hidden">

            {/* ─── FLOATING TOAST NOTIFICATION ─── */}
            {notification && (
                <div className="fixed bottom-10 right-5 z-50 bg-slate-900 text-white border border-violet-500 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
                    <CheckCircle className="w-5 h-5 text-violet-400" />
                    <span className="text-sm font-semibold">{notification}</span>
                </div>
            )}

            {/* ─── HERO SLIDER (FULL WIDTH) ─── */}
            <div className="relative overflow-hidden w-full border-b border-slate-800 shadow-2xl group/slider">
                <div className={`bg-gradient-to-r ${slideGradients[currentSlide % slideGradients.length]} min-h-[500px] md:min-h-[580px] flex items-center justify-center relative transition-all duration-700 ease-in-out px-6 md:px-16`}>

                    <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 py-10">
                        {/* গ্র্যাডিয়েন্ট ইফেক্ট */}
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

                        {/* Slide Text Content */}
                        <div className="max-w-md md:max-w-xl space-y-6 relative z-10 text-center md:text-left order-2 md:order-1 px-4">
                            {currentProduct.discountPercentage > 0 && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-violet-500/10 border border-violet-500/30 text-violet-400">
                                    <Sparkles className="w-4 h-4" />
                                    {Math.round(currentProduct.discountPercentage)}% OFF
                                </span>
                            )}

                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                                {currentProduct.title}
                            </h1>

                            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                                {currentProduct.description}
                            </p>

                            {/* PRICE SECTION */}
                            <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
                                <span className="text-xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                    Tk {priceInTk.toLocaleString('en-IN')}
                                </span>
                                {currentProduct.discountPercentage > 0 && (
                                    <span className="text-base text-slate-500 line-through">
                                        Tk {originalPriceInTk.toLocaleString('en-IN')}
                                    </span>
                                )}
                            </div>

                            <div className="pt-2">
                                <Link
                                    to={`/products/${currentProduct.id}`}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg shadow-violet-600/30 hover:scale-[1.03] hover:shadow-violet-600/50 transition-all cursor-pointer group"
                                >
                                    <ShoppingBag className="w-4 h-4 text-violet-200 group-hover:animate-bounce" />
                                    View Details
                                </Link>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="w-64 h-64 md:w-[420px] md:h-[420px] flex items-center justify-center order-1 md:order-2 relative z-10 group cursor-pointer">
                            <img
                                src={currentProduct.thumbnail}
                                alt={currentProduct.title}
                                className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_25px_rgba(139,92,246,0.25)] group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 ease-out"
                            />
                        </div>
                    </div>
                </div>

                {/* SLIDER CONTROLS */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900/50 hover:bg-violet-600 border border-slate-700 text-white w-12 h-12 rounded-xl transition-all hidden md:flex items-center justify-center backdrop-blur-md z-20"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-900/50 hover:bg-violet-600 border border-slate-700 text-white w-12 h-12 rounded-xl transition-all hidden md:flex items-center justify-center backdrop-blur-md z-20"
                >
                    <ArrowRight className="w-5 h-5" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20">
                    {sliderProducts.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? "w-8 bg-violet-500" : "w-2 bg-slate-800"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeadingPage;