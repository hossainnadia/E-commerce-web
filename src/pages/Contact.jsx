import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you ${form.name}! Your message has been simulated successfully. 🚀`);
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white py-12 rounded-xl">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-500 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                        Get In Touch
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">Contact Our Support Team</h1>
                    <p className="text-slate-400 text-sm">Have any queries or feedback? Drop us a message and our team will reply within 24 hours.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-stretch">

                    {/* Left 2 Columns: Contact Info Grid */}
                    <div className="md:col-span-2 space-y-4 flex flex-col justify-between">
                        <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-4 flex items-start space-x-4">
                            <div className="p-3 bg-slate-800 text-violet-400 rounded-xl border border-slate-700/50 shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-slate-200">Email Us</h3>
                                <p className="text-xs text-slate-400 mt-1">amarbazart@company.com</p>
                                <p className="text-xs text-slate-500">24/7 Ticket System</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-4 flex items-start space-x-4">
                            <div className="p-3 bg-slate-800 text-fuchsia-400 rounded-xl border border-slate-700/50 shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-slate-200">Call Support</h3>
                                <p className="text-xs text-slate-400 mt-1">+880 1234-567890</p>
                                <p className="text-xs text-slate-500">Mon - Fri, 9am - 6pm</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-4 flex items-start space-x-4">
                            <div className="p-3 bg-slate-800 text-emerald-400 rounded-xl border border-slate-700/50 shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-slate-200">Headquarters</h3>
                                <p className="text-xs text-slate-400 mt-1">Agrabad C/A, Chattogram</p>
                                <p className="text-xs text-slate-500">Bangladesh</p>
                            </div>
                        </div>
                    </div>

                    {/* Right 3 Columns: Interactive Form Box */}
                    <div className="md:col-span-3 bg-slate-900/30 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text" required value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Username"
                                    className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email" required value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="Email Address"
                                    className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Message</label>
                                <textarea
                                    rows="4" required value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder="Type your query here..."
                                    className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm py-3.5 rounded-xl transition shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 cursor-pointer flex items-center justify-center space-x-2 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <Send className="w-4 h-4" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Contact;