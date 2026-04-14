import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [rotationLog, setRotationLog] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem("token");
                const [usersRes, logRes] = await Promise.all([
                    axios.get("http://localhost:5000/users/all-users", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get("http://localhost:5000/users/rotation-log", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                setUsers(usersRes.data.users);
                setRotationLog(logRes.data.log);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch admin dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-[#ececec] font-sans pb-20">
            <nav className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-black">
                <div className='text-white uppercase text-sm font-bold flex items-center gap-10'>
                <Link to="/" className='text-yellow-100'>Home</Link>
                <span className='text-white text-sm font-bold'>ADMIN DASHBOARD</span>

                </div>
                <div className="flex items-center gap-6">
                    <span className="text-xs text-zinc-500 font-medium tracking-widest uppercase">
                        Admin: <span className="text-emerald-400">{user?.name}</span>
                    </span>
                    <button
                        onClick={logout}
                        className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded hover:bg-zinc-200 transition-colors uppercase"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="p-10 max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">User Database</h1>
                    <p className="text-zinc-500 text-sm">Manage and monitor all registered accounts within the system.</p>
                </header>

                <div className="bg-[#141414] border border-zinc-800 overflow-hidden mb-16">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/40 border-b border-zinc-800">
                                    <th className="px-6 py-4 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Username</th>
                                    <th className="px-6 py-4 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Email Address</th>
                                    <th className="px-6 py-4 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Role</th>
                                    <th className="px-6 py-4 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Account ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-zinc-600 italic">Initializing database link...</td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-zinc-600 italic">No registered users found.</td>
                                    </tr>
                                ) : (
                                    users.map((u) => (
                                        <tr key={u._id} className="hover:bg-zinc-800/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{u.name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-zinc-400 font-mono tracking-tight">{u.email}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold  ${u.role === 'Admin' ? 'text-lime-400' : 'text-zinc-400 '
                                                    }`}>
                                                    {u.role || 'USER'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] text-zinc-600 font-mono select-none">{u._id}</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <header className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Key Rotation History</h2>
                    <p className="text-zinc-500 text-sm">Review the cryptographic evolution and scheduled rotation events.</p>
                </header>

                <div className="bg-[#141414] border border-zinc-800 p-8 overflow-hidden">
                    <pre className="text-xs text-zinc-400 font-mono leading-relaxed whitespace-pre-wrap">
                        {rotationLog || (loading ? "Retrieving rotation logs..." : "No rotation history available.")}
                    </pre>
                </div>

                <footer className="mt-8 flex items-center justify-between text-[10px] text-white uppercase tracking-widest font-bold">
                    <div className=''>Total Records: {users.length}</div>
                </footer>
            </main>
        </div>
    );
};

export default AdminDashboard;
