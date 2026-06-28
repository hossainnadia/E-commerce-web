import React from "react";
import { Link } from "react-router-dom";
import { Layers, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 font-sans">
            {/* ─── MAIN FOOTER CONTENT ─── */}
            <div className="container mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Column 1: Brand Info */}
                <div className="space-y-4">
                    <Link to="/" className="flex items-center space-x-2 group w-max">
                        <div className="bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                            <Layers className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black bg-gradient-to-r from-white via-slate-200 to-violet-400 bg-clip-text text-transparent tracking-tight">
                            AmarBazar <span className="text-violet-500">.</span>
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed text-slate-400">
                        We are committed to making your everyday shopping easy, safe, and fast. Standing by your side with high-quality products.
                    </p>

                    {/* Raw SVG Social Icons (Safe & Fast) */}
                    <div className="flex space-x-3 pt-2">
                        {/* Facebook */}
                        <a href="#" className="p-2 bg-slate-800/60 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg border border-slate-700/50 transition duration-300">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
                            </svg>
                        </a>
                        {/* X (formerly Twitter) */}
                        <a href="#" className="p-2 bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700/50 transition duration-300">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a href="#" className="p-2 bg-slate-800/60 hover:bg-pink-600 text-slate-300 hover:text-white rounded-lg border border-slate-700/50 transition duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        {/* Linkedin */}
                        <a href="#" className="p-2 bg-slate-800/60 hover:bg-blue-500 text-slate-300 hover:text-white rounded-lg border border-slate-700/50 transition duration-300">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
                        Quick Navigation
                    </h3>
                    <ul className="space-y-2.5 text-sm">
                        {[
                            { name: "Home", path: "/" },
                            { name: "All Products", path: "/products" },
                            { name: "Your Orders", path: "/order" },
                            { name: "Contact Us", path: "/contact" }
                        ].map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} className="hover:text-violet-400 transition flex items-center group w-max">
                                    <span className="w-0 group-hover:w-1.5 h-1.5 bg-violet-500 rounded-full transition-all duration-200 mr-0 group-hover:mr-2" />
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Customer Support */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
                        Customer Service
                    </h3>
                    <ul className="space-y-2.5 text-sm">
                        {["Track Order", "Privacy Policy", "Terms & Conditions", "FAQ & Help"].map((item, idx) => (
                            <li key={idx}>
                                <a href="#" className="hover:text-violet-400 transition flex items-center justify-between group">
                                    <span>{item}</span>
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition text-violet-500" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 4: Contact & Info */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
                        Contact Office
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start space-x-3">
                            <MapPin className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                            <span>Agrabad C/A, Chattogram, Bangladesh</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Phone className="w-4 h-4 text-fuchsia-500 shrink-0" />
                            <span>+880 1234-567890</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>amarbazar@company.com</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* ─── BOTTOM BAR (COPYRIGHT) ─── */}
            <div className="border-t border-slate-800/80 bg-slate-950/40 py-6">
                <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {currentYear} <span className="text-slate-200 font-semibold">AmarBazar</span>. All rights reserved.</p>
                    <div className="flex space-x-6 text-slate-500">
                        <a href="#" className="hover:text-slate-400 transition">Security</a>
                        <a href="#" className="hover:text-slate-400 transition">Cookies</a>
                        <a href="#" className="hover:text-slate-400 transition">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;