import { BackgroundBeams } from "../components/BackgroundBeams"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import axios from "axios"

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post("http://localhost:3001/admin/login", formData);

            localStorage.setItem("token", response.data.token);
            if (response.data.status === "login") {
                toast.success("Login successful");
                navigate("/workspace");
            } else {
                toast.error("Login failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "An error occurred during login");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-full h-screen bg-zinc-950">
            <div className="w-full h-full fixed inset-0 z-0">
                <BackgroundBeams />
            </div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="min-h-screen flex items-center justify-center px-6">
                    <div className="w-[520px] bg-white border border-zinc-200 rounded p-12 flex flex-col space-y-8 shadow-sm">
                        <div className="space-y-2 text-center sm:text-left">
                            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Welcome Back</h2>
                            <p className="text-sm text-zinc-500">Sign in to access your workspace.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-zinc-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all placeholder:text-zinc-400 text-black"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-zinc-700">Password</label>
                                    
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-black text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all placeholder:text-zinc-400"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <div className="flex justify-between items-center text-xs text-zinc-500 pt-2">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Secure Authentication
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login