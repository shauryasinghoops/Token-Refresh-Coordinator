import { useAuth } from "../context/AuthContext.jsx"

const Profile = () => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    return (
        <div className='w-full min-h-screen bg-black text-white px-6 sm:px-10 lg:px-16 py-10 font-mono selection:bg-white selection:text-black'>

            <header className='border-b border-zinc-800 pb-10 mb-10'>
                <h1 className='text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9] break-words'>
                    {user?.name}
                </h1>
            </header>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16'>

                <section className='space-y-10 p-6 sm:p-8 lg:p-10 border border-zinc-800'>
                    <div className="flex flex-col gap-6 sm:gap-8">

                        <div className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-zinc-300 hover:text-white transition-all break-words">
                            {user?.name}
                        </div>

                        <div className="text-2xl sm:text-3xl lg:text-4xl font-black lowercase text-zinc-300 hover:text-white transition-all break-words">
                            {user?.email}
                        </div>

                        <div className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-zinc-300 hover:text-white transition-all break-words">
                            {user?.role}
                        </div>

                        <div className="text-lg sm:text-xl lg:text-2xl font-bold uppercase text-zinc-500 hover:text-zinc-300 transition-all break-all">
                            {user?._id}
                        </div>

                    </div>
                </section>

                <section className='flex flex-col border border-zinc-800 p-6 sm:p-8 lg:p-10 bg-zinc-900/5 backdrop-brightness-125'>
                    
                    <div className='flex justify-between items-start mb-6'>
                        <h3 className='text-xs uppercase font-bold tracking-widest text-zinc-400'>
                            Token
                        </h3>
                    </div>

                    <div className='flex-1 bg-white border border-zinc-900 p-4 sm:p-6 text-[10px] sm:text-xs text-black leading-relaxed break-all select-all font-mono h-48 sm:h-56 lg:h-64 overflow-auto'>
                        {token}
                    </div>

                </section>

            </div>
        </div>
    )
}

export default Profile;