import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Star, Search, SlidersHorizontal, CheckCircle, ShoppingBag, Plus, Minus } from "lucide-react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // ফিল্টার, সার্চ ও সর্টিং স্টেটস
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [notification, setNotification] = useState("");

    // CartContext থেকে কার্ট এবং প্রয়োজনীয় ফাংশন রিসিভ করা হলো
    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

    // Fetch Categories and attach a sample product image for UI
    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then(async (data) => {
                const limitedCategories = data.slice(0, 10);

                const categoriesWithImages = await Promise.all(
                    limitedCategories.map(async (cat) => {
                        try {
                            const res = await fetch(`https://dummyjson.com/products/category/${cat.slug}?limit=1`);
                            const productData = await res.json();
                            return {
                                ...cat,
                                image: productData.products[0]?.thumbnail || "https://via.placeholder.com/150"
                            };
                        } catch {
                            return { ...cat, image: "https://via.placeholder.com/150" };
                        }
                    })
                );
                setCategories(categoriesWithImages);
            });
    }, []);

    // Fetch Products based on category
    useEffect(() => {
        const url = selectedCategory
            ? `https://dummyjson.com/products/category/${selectedCategory}`
            : "https://dummyjson.com/products?limit=40";

        fetch(url)
            .then((res) => res.json())
            .then((data) => setProducts(data.products));
    }, [selectedCategory]);

    // কার্ট থেকে নির্দিষ্ট প্রোডাক্টের কোয়ান্টিটি চেক করার ফাংশন
    const getProductQuantity = (productId) => {
        const cartItem = cart.find((item) => item.id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    const handleDecreaseQuantity = (productId, productTitle) => {
        const currentQty = getProductQuantity(productId);
        if (currentQty <= 1) {
            removeFromCart(productId);
            setNotification(`${productTitle} removed from cart! 🗑️`);
            setTimeout(() => setNotification(""), 2000);
        } else {
            updateQuantity(productId, "dec");
        }
    };

    const handleAddToCart = (product) => {
        if (getProductQuantity(product.id) === 0) {
            addToCart(product);
            setNotification(`${product.title} added to cart! 🎉`);
            setTimeout(() => setNotification(""), 2000);
        }
    };

    // ক্লায়েন্ট সাইড সার্চ এবং প্রাইস সর্টিং লজিক
    const filteredAndSortedProducts = products
        .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "low-to-high") return a.price - b.price;
            if (sortBy === "high-to-low") return b.price - a.price;
            return 0;
        });

    return (
        <div className="space-y-18 pb-20 max-w-8xl mx-auto px-4 md:px-8">

            {/* ─── TOAST NOTIFICATION ─── */}
            {notification && (
                <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white border border-violet-500 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
                    <CheckCircle className="w-5 h-5 text-violet-400" />
                    <span className="text-sm font-semibold">{notification}</span>
                </div>
            )}

            {/* ─── PAGE HEADER & SEARCH-FILTER BAR ─── */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-8 pt-4 gap-4">
                <div className="relative w-full md:flex-grow max-w-2xl">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-violet-500 text-sm transition-all shadow-sm bg-slate-900 text-white appearance-none cursor-pointer font-medium"
                    />
                </div>

                <div className="relative w-full md:w-52 shrink-0">
                    <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-violet-500 text-sm transition-all shadow-sm bg-slate-900 text-white appearance-none cursor-pointer font-medium"
                    >
                        <option value="">Sort by Price</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* ─── FULL WIDTH CATEGORIES SCROLLER ─── */}
            <div className="space-y-4 w-full overflow-hidden">
                <h3 className="text-xl font-black uppercase tracking-widest text-slate-900 text-center mb-8 md:text-left">
                    Filter by Categories
                </h3>
                <div className="flex overflow-x-auto gap-4 pb-3 scrollbar-none snap-x w-full">
                    <button
                        onClick={() => setSelectedCategory("")}
                        className="group flex flex-col items-center gap-4 cursor-pointer focus:outline-none w-full snap-start"
                    >
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center border transition-all duration-300 shadow-md ${!selectedCategory ? 'border-violet-600 bg-violet-50 scale-105 shadow-violet-600/10' : 'border-slate-200 bg-slate-50 group-hover:border-slate-400'}`}>
                            <ShoppingBag className={`w-8 h-88 ${!selectedCategory ? 'text-violet-600' : 'text-slate-600'}`} />
                        </div>
                        <span className={`text-sm font-bold tracking-wide transition-colors ${!selectedCategory ? 'text-violet-600 font-extrabold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                            All
                        </span>
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className="group flex flex-col items-center gap-4 cursor-pointer focus:outline-none w-full snap-start"
                        >
                            <div className={`w-20 h-20 rounded-full overflow-hidden border transition-all duration-300 bg-white shadow-md relative ${selectedCategory === cat.slug ? 'border-violet-600 scale-105 shadow-violet-600/20 ring-4 ring-violet-50' : 'border-slate-200 group-hover:border-slate-400 group-hover:scale-105'}`}>
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-black/5 transition-opacity ${selectedCategory === cat.slug ? 'opacity-0' : 'group-hover:opacity-0'}`} />
                            </div>
                            <span className={`text-xs font-bold transition-colors truncate w-20 text-center capitalize ${selectedCategory === cat.slug ? 'text-violet-600 font-extrabold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                {cat.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── DYNAMIC PRODUCTS GRID ─── */}
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Our Products
            </h1>

            <div>
                {filteredAndSortedProducts.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50">
                        <p className="text-slate-400 font-medium">No products found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredAndSortedProducts.map((product) => {
                            const quantity = getProductQuantity(product.id);

                            return (
                                <div
                                    key={product.id}
                                    className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative"
                                >
                                    <div>
                                        {/* Product Image Section */}
                                        <div className="relative bg-slate-50 rounded-xl overflow-hidden mb-4 p-4 aspect-square flex items-center justify-center">

                                            {/* 🎯 API থেকে আসা ডাইনামিক ডিসকাউন্ট পার্সেন্টেজ ব্যাজ */}
                                            {product.discountPercentage && product.discountPercentage > 0 && (
                                                <div className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm z-10 animate-pulse">
                                                    {Math.round(product.discountPercentage)}% OFF
                                                </div>
                                            )}

                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                className="max-h-44 max-w-full object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="font-bold text-slate-800 hover:text-violet-600 line-clamp-1 transition-colors text-base"
                                        >
                                            {product.title}
                                        </Link>

                                        {/* Dynamic Star Rating */}
                                        <div className="flex items-center space-x-1 my-1.5 text-amber-500">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <span className="text-xs font-bold text-slate-600">{product.rating}</span>
                                        </div>

                                        <p className="text-slate-500 text-xs line-clamp-2 mt-1 mb-4">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Price and Action Buttons */}
                                    <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-50 gap-2">
                                        <span className="text-base font-black text-slate-990">Tk {Math.round(product.price * 120)}</span>

                                        {/* ─── HOVER SLIDE IN/OUT ACTION BUTTON ─── */}
                                        <div className="relative w-32 h-10 overflow-hidden rounded-xl group/btn cursor-pointer shadow-sm hover:shadow-md transition-all duration-300">
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="absolute inset-0 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center transition-transform duration-300 group-hover/btn:-translate-y-full whitespace-nowrap"
                                            >
                                                {quantity > 0 ? `${quantity}` : "Add to Cart"}
                                            </button>

                                            <div
                                                className="absolute inset-0 bg-slate-900 text-white flex items-center justify-between translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDecreaseQuantity(product.id, product.title);
                                                    }}
                                                    className="h-full px-3 transition-colors flex items-center bg-slate-900 justify-center text-white"
                                                    disabled={quantity === 0}
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>

                                                <span className="text-xs font-black select-none">
                                                    {quantity}
                                                </span>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (quantity === 0) {
                                                            handleAddToCart(product);
                                                        } else {
                                                            updateQuantity(product.id, "inc");
                                                        }
                                                    }}
                                                    className="h-full px-3 transition-colors flex items-center justify-center text-white"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;