import { useState, useEffect } from "react";
import axios from "axios";

const KeyRotation = () => {
    const [log, setLog] = useState("Loading logs...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLog = async () => {
            try {
                const response = await axios.get("http://localhost:3001/admin/rotation-log", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setLog(response.data.log);
            } catch (error) {
                setLog("Error fetching rotation logs.");
            } finally {
                setLoading(false);
            }
        };

        fetchLog();
    }, []);

    return (
        <div className="min-h-screen  px-4 md:px-10 pb-20">

            <div className="border-b border-zinc-800 pb-9 pt-6">
                <h1 className="text-white text-5xl md:text-8xl font-bold tracking-tighter uppercase">
                    Key Rotation Log
                </h1>
                <p className="text-zinc-500 text-sm mt-3">
                    Live view of JWT key rotation events on the server.
                </p>
            </div>

            <div className="mt-10">
                {loading ? (
                    <div className="flex items-center gap-3 text-zinc-500 text-sm">
                        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse" />
                        Fetching logs...
                    </div>
                ) : (
                    <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-lg font-mono text-sm text-zinc-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {log}
                    </div>
                )}
            </div>

        </div>
    );
};

export default KeyRotation;
