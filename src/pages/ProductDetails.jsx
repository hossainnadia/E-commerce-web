import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Star, ShoppingBag, Plus, Minus, ArrowLeft, CheckCircle, Truck, ShieldCheck, RotateCcw } from "lucide-react";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState("");
    const [notification, setNotification] = useState("");

    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

    useEffect(() => {
        setLoading(true);
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setActiveImage(data.thumbnail);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product details:", err);
                setLoading(false);
            });
    }, [id]);

    const getProductQuantity = (productId) => {
        const cartItem = cart.find((item) => item.id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    const handleAddToCart = () => {
        if (product && getProductQuantity(product.id) === 0) {
            addToCart(product);
            setNotification(`${product.title} added to cart! 🎉`);
            setTimeout(() => setNotification(""), 2000);
        }
    };

    const handleDecreaseQuantity = () => {
        if (!product) return;
        const currentQty = getProductQuantity(product.id);
        if (currentQty <= 1) {
            removeFromCart(product.id);
            setNotification(`${product.title} removed from cart! 🗑️`);
            setTimeout(() => setNotification(""), 2000);
        } else {
            updateQuantity(product.id, "dec");
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20 max-w-7xl mx-auto px-4">
                <p className="text-slate-500 font-medium mb-4">Product not found!</p>
                <Link to="/products" className="inline-flex items-center gap-2 text-violet-600 font-bold hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Products
                </Link>
            </div>
        );
    }

    const quantity = getProductQuantity(product.id);

    // ─── TK CONVERSION LOGIC (Exchange Rate: $1 = 120 TK) ───
    const priceInTk = Math.round(product.price * 120);
    const originalPriceInTk = Math.round((product.price / (1 - product.discountPercentage / 100)) * 120);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">

            {/* TOAST NOTIFICATION */}
            {notification && (
                <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white border border-violet-500 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
                    <CheckCircle className="w-5 h-5 text-violet-400" />
                    <span className="text-sm font-semibold">{notification}</span>
                </div>
            )}

            {/* BACK BUTTON */}
            <Link to="/products" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm group transition-colors">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Products
            </Link>

            {/* PRODUCT CORE INFO SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* LEFT: IMAGE GALLERY */}
                <div className="space-y-4">
                    <div className="bg-slate-50 rounded-3xl p-6 aspect-square flex items-center justify-center border border-slate-100 overflow-hidden group">
                        <img
                            src={activeImage}
                            alt={product.title}
                            className="max-h-[400px] w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`w-20 h-20 rounded-xl border-2 p-2 bg-slate-50 flex items-center justify-center shrink-0 transition-all ${activeImage === img ? 'border-violet-600 ring-4 ring-violet-50 scale-95' : 'border-slate-200 hover:border-slate-400'}`}
                                >
                                    <img src={img} alt="" className="max-h-full object-contain mix-blend-multiply" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT: DETAILS INFO */}
                <div className="space-y-6 lg:pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                            {product.brand || "Generic"}
                        </span>
                        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-violet-50 text-violet-600 rounded-full capitalize">
                            {product.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg font-bold">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{product.rating}</span>
                        </div>
                        <span className="text-slate-300">|</span>
                        <span className={`font-semibold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {product.stock > 0 ? `In Stock (${product.stock} items)` : 'Out of Stock'}
                        </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-base font-medium">
                        {product.description}
                    </p>

                    {/* PRICE SECTION IN TK */}
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100">
                        <div className="space-y-2">
                            <p className="text-xl font-bold text-slate-400 tracking-wider">Total Price</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-slate-900">Tk {priceInTk.toLocaleString('en-IN')}</span>
                                {product.discountPercentage > 0 && (
                                    <span className="text-sm font-bold text-slate-400 line-through">Tk {originalPriceInTk.toLocaleString('en-IN')}</span>
                                )}
                            </div>
                        </div>
                        {product.discountPercentage > 0 && (
                            <span className="bg-rose-50 text-rose-600 font-extrabold text-xs px-3 py-1.5 rounded-xl border border-rose-100">
                                Save {product.discountPercentage}%
                            </span>
                        )}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                        <div className="relative w-full sm:w-48 h-14 overflow-hidden rounded-2xl group/btn cursor-pointer shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all duration-300">

                            <button
                                onClick={handleAddToCart}
                                className="absolute inset-0 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-transform duration-300 group-hover/btn:-translate-y-full whitespace-nowrap"
                                disabled={product.stock === 0}
                            >
                                <ShoppingBag className="w-4 h-4" />
                                {quantity > 0 ? `In Cart (${quantity})` : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                            </button>

                            <div className="absolute inset-0 bg-slate-900 text-white flex items-center justify-between translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDecreaseQuantity();
                                    }}
                                    className="h-full px-5 transition-colors flex items-center bg-slate-900 justify-center text-white hover:text-red-400"
                                    disabled={quantity === 0}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>

                                <span className="text-sm font-black select-none">
                                    {quantity}
                                </span>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (quantity === 0) {
                                            handleAddToCart();
                                        } else {
                                            updateQuantity(product.id, "inc");
                                        }
                                    }}
                                    className="h-full px-5 transition-colors flex items-center justify-center text-white hover:text-green-400"
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TRUST BADGES */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs font-bold text-slate-500">
                        <div className="flex items-center gap-2.5 bg-slate-25 p-3 rounded-xl border border-slate-50">
                            <Truck className="w-4 h-4 text-violet-500 shrink-0" />
                            <span>Free & Fast Delivery</span>
                        </div>
                        <div className="flex items-center gap-2.5 bg-slate-25 p-3 rounded-xl border border-slate-50">
                            <ShieldCheck className="w-4 h-4 text-violet-500 shrink-0" />
                            <span>100% Authentic Product</span>
                        </div>
                        <div className="flex items-center gap-2.5 bg-slate-25 p-3 rounded-xl border border-slate-50">
                            <RotateCcw className="w-4 h-4 text-violet-500 shrink-0" />
                            <span>Easy 7 Days Return</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;