import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignupForm = () => {
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "User",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, role } = formData;
        
        if (!name || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const success = await signup(name, email, password, role);
            if (!success) setLoading(false);
        } catch {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-[560px] bg-white border border-zinc-200 rounded p-12 flex flex-col space-y-8 shadow-sm">
                <div className="space-y-2 text-center sm:text-left">
                    <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Create Account</h2>
                    <p className="text-sm text-zinc-500">Join our workspace and start building today.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="MAHESH SINGH"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-black"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-700">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full border border-zinc-300 rounded-lg px-3 text-black py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all bg-white"
                            >
                                <option value="User">User</option>
                                
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-black"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full text-black border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <div className="flex justify-between items-center text-xs text-zinc-500 pt-2">
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                        Secure & Minimal
                    </span>
                    <Link to="/login" className="hover:text-zinc-900 font-medium transition-colors">Already have an account? Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;