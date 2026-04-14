import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/users";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            if (res.data) {
                toast.success("Login Successful");
                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.accessToken);
                
                
                if (res.data.user.role === "Admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
                return true;
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.errors?.[0]?.msg || error.response?.data?.error || "Login Failed");
            return false;
        }
    };

    const signup = async (name, email, password, role) => {
        try {
            const res = await axios.post(`${API_URL}/register`, { name, email, password, role });
            if (res.data) {
                toast.success("Signup Successful. Please Login.");
                navigate("/login");
                return true;
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.errors?.[0]?.msg || error.response?.data?.error || "Signup Failed");
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
        toast.success("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
