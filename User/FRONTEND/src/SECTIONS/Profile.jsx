import { useAuth } from "../context/AuthContext.jsx"

const Profile = () => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    return (
        <div className='w-full h-full bg-black text-white p-16 font-mono selection:bg-white selection:text-black'>

            <header className='border-b border-zinc-800 pb-16 mb-16'>
                <h1 className='text-8xl font-black tracking-tighter uppercase leading-[0.8]'>
                    {user?.name}
                </h1>
            </header>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-24'>

                
                <section className='space-y-16 p-10 border border-zinc-800'>
                    <div className="flex flex-col gap-10">
                        <div className="text-5xl font-black uppercase text-zinc-300 hover:text-white transition-all">
                            {user?.name}
                        </div>

                        <div className="text-5xl font-black lowercase text-zinc-300 hover:text-white transition-all">
                            {user?.email}
                        </div>

                        <div className="text-5xl font-black uppercase text-zinc-300 hover:text-white transition-all ">
                            {user?.role}
                        </div>

                        <div className="text-3xl font-bold uppercase text-zinc-500 hover:text-zinc-300 transition-all">
                            {user?._id}
                        </div>
                    </div>
                </section>

                
                <section className='flex flex-col border border-zinc-800 p-10 bg-zinc-900/5 backdrop-brightness-125'>
                    <div className='flex justify-between items-start mb-12'>
                        <h3 className='text-white text-xs uppercase font-bold tracking-widest'>Token</h3>
                    </div>

                    <div className='flex-1 bg-white border border-zinc-900 p-8 text-[11px] text-black leading-relaxed break-all select-all font-mono h-64 '>
                        {token}
                    </div>

                </section>
            </div>
        </div>
    )
}

export default Profile;