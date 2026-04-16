import { useState, useEffect } from "react";
import axios from "axios";

const Display = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [log, setLog] = useState("Loading logs...");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "/admin/users",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setAllUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchLog = async () => {
            try {
                const response = await axios.get("/admin/rotation-log", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setLog(response.data.log);
            } catch (error) {
                setLog("Error fetching rotation logs.");
            }
        };

        fetchUsers();
        fetchLog();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 px-4 md:px-10 pb-20">
            
            <div className="border-b border-zinc-800 pb-9 pt-6">
                <h1 className="text-white text-5xl md:text-8xl font-bold tracking-tighter uppercase">
                    All Users
                </h1>
            </div>

            <div className="flex flex-col gap-3 mt-5">
                {allUsers.map((user) => (
                    <div
                        key={user._id || user.email}
                        className="group border-b border-zinc-800 p-5 hover:bg-zinc-900/40 transition-all duration-300"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            
                            <div>
                                <span className="md:hidden text-xs text-zinc-500 uppercase mb-1 block">
                                    Name
                                </span>
                                <span className="text-white font-medium">
                                    {user.name}
                                </span>
                            </div>

                            <div>
                                <span className="md:hidden text-xs text-zinc-500 uppercase mb-1 block">
                                    Email
                                </span>
                                <span className="text-zinc-400 text-sm">
                                    {user.email}
                                </span>
                            </div>

                            <div className="md:text-right">
                                <span className="md:hidden text-xs text-zinc-500 uppercase mb-1 block">
                                    Role
                                </span>
                                <span className="inline-flex px-3 py-1 bg-green-100 text-black text-xs font-semibold rounded-full">
                                    {user.role || "User"}
                                </span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20">
                <div className="border-b border-zinc-800 pb-6 mb-8">
                    <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tighter uppercase">
                        Key Rotation Log
                    </h2>
                </div>
                <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-lg font-mono text-sm text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                    {log}
                </div>
            </div>
        </div>
    );
};

export default Display;