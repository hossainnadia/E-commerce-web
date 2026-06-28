import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ArrowRight, Star, ShoppingBag, Sparkles, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LeadingPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sliderProducts, setSliderProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);
    const { addToCart } = useCart();

    const [notification, setNotification] = useState("");

    const slideGradients = [
        "from-slate-950 via-indigo-950 to-slate-950",
        "from-slate-950 via-violet-950 to-slate-950",
        "from-slate-950 via-fuchsia-950 to-slate-950"
    ];

    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then(res => res.json())
            .then(data => setCategories(data.slice(0, 5)));

        fetch("https://dummyjson.com/products?limit=8")
            .then(res => res.json())
            .then(data => setSliderProducts(data.products));
    }, []);

    useEffect(() => {
        const url = selectedCategory
            ? `https://dummyjson.com/products/category/${selectedCategory}`
            : "https://dummyjson.com/products?limit=8";

        fetch(url)
            .then(res => res.json())
            .then(data => setProducts(data.products.slice(0, 8)));
    }, [selectedCategory]);

    useEffect(() => {
        if (sliderProducts.length === 0) return;
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev === sliderProducts.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(slideInterval);
    }, [currentSlide, sliderProducts]);

    const nextSlide = () => setCurrentSlide((prev) => (prev === sliderProducts.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? sliderProducts.length - 1 : prev - 1));

    // ─── TK CONVERSION LOGIC FOR CURRENT SLIDE ───
    const currentProduct = sliderProducts[currentSlide];
    const priceInTk = currentProduct ? Math.round(currentProduct.price * 120) : 0;
    const originalPriceInTk = currentProduct
        ? Math.round((currentProduct.price / (1 - currentProduct.discountPercentage / 100)) * 120)
        : 0;

    return (
        /* 🛠️ কন্টেইনারের max-w-8xl সরিয়ে w-full এবং px প্যাডিং ০ করা হয়েছে যাতে স্ক্রিন ফুল-উইডথ পায় */
        <div className="space-y-16 pb-20  relative w-full overflow-hidden">

            {/* ─── FLOATING TOAST NOTIFICATION ─── */}
            {notification && (
                <div className="fixed bottom-10 right-5 z-100 bg-slate-900 text-white border border-violet-500 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
                    <CheckCircle className="w-5 h-5 text-violet-400" />
                    <span className="text-sm font-semibold">{notification}</span>
                </div>
            )}

            {/* ─── EXTRA UNIQUE FLOATING HERO SLIDER (FULL WIDTH) ─── */}
            {sliderProducts.length > 0 && (
                /* 🛠️ rounded-3xl সরিয়ে ফুল-উইডথ ফ্ল্যাট এজ দেওয়া হয়েছে এবং দুই ধারের বর্ডার বাদ দেওয়া হয়েছে */
                <div className="relative overflow-hidden w-full border-b border-slate-900 shadow-2xl group/slider">

                    {/* 🛠️ ভেতরের কন্টেন্টকে সুবিন্যস্ত করতে max-w-7xl ও mx-auto সেট করা হয়েছে কিন্তু ব্যাকগ্রাউন্ড ফুল উইডথ থাকবে */}
                    <div className={`bg-gradient-to-r ${slideGradients[currentSlide % slideGradients.length]} min-h-[500px] md:min-h-[580px] flex flex-col md:flex-row items-center justify-between relative transition-all duration-700 ease-in-out gap-8 px-6 md:px-16`}>

                        {/* মেইন কন্টেন্ট র্যাপার (এটি টেক্সট এবং ইমেজকে স্ক্রিনের অতিরিক্ত সাইডে যাওয়া থেকে আটকাবে) */}
                        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 py-10">

                            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />

                            {/* Slide Text Content */}
                            <div className="max-w-md md:max-w-xl space-y-5 md:space-y-6 relative z-10 text-center md:text-left order-2 md:order-1 px-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider bg-violet-500/10 border border-violet-500/30 text-violet-400">
                                    <Sparkles className="w-4 h-4" />
                                    {currentProduct.discountPercentage}% OFF
                                </span>

                                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                                    {currentProduct.title}
                                </h1>

                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                                    {currentProduct.description}
                                </p>

                                {/* ─── UPDATED PRICE SECTION IN TK ─── */}
                                <div className="flex items-center justify-center md:justify-start gap-6">
                                    {/* বর্তমান অফার প্রাইস টাকায় */}
                                    <span className="text-xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                        Tk {priceInTk.toLocaleString('en-IN')}
                                    </span>
                                    {/* আগের অরিজিনাল প্রাইস টাকায় (স্ট্রাইক-থ্রু) */}
                                    {currentProduct.discountPercentage > 0 && (
                                        <span className="text-base text-slate-500 line-through">
                                            Tk {originalPriceInTk.toLocaleString('en-IN')}
                                        </span>
                                    )}
                                </div>

                                {/* View Details Button */}
                                <div className="pt-2">
                                    <Link
                                        to={`/products/${currentProduct.id}`}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm px-6 py-4 rounded-xl shadow-lg shadow-violet-600/30 hover:scale-[1.03] hover:shadow-violet-600/50 transition-all cursor-pointer group"
                                    >
                                        <ShoppingBag className="w-4 h-4 text-violet-200 group-hover:animate-bounce" />
                                        View Details
                                    </Link>
                                </div>
                            </div>

                            {/* Slide Large Floating Image */}
                            <div className="w-64 h-64 md:w-[420px] md:h-[420px] flex items-center justify-center order-1 md:order-2 relative z-10 group transition-all duration-500 px-4">
                                <img
                                    src={currentProduct.thumbnail}
                                    alt={currentProduct.title}
                                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_25px_rgba(139,92,246,0.25)] transform group-hover:scale-105 group-hover:rotate-2 hover:translate-y-[-8px] transition-all duration-500 ease-out cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ─── PREMIUM WIDE SLIDER CONTROLS ─── */}
                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-950/70 hover:bg-violet-600 border border-slate-800 hover:border-violet-500 text-white w-14 h-14 rounded-2xl transition-all duration-300 hidden md:flex items-center justify-center backdrop-blur-md shadow-xl hover:shadow-violet-600/40 hover:scale-110 cursor-pointer z-20"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-950/70 hover:bg-violet-600 border border-slate-800 hover:border-violet-500 text-white w-14 h-14 rounded-2xl transition-all duration-300 hidden md:flex items-center justify-center backdrop-blur-md shadow-xl hover:shadow-violet-600/40 hover:scale-110 cursor-pointer z-20"
                    >
                        <ArrowRight className="w-6 h-6" />
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
            )}

        </div>
    );
};

export default LeadingPage;