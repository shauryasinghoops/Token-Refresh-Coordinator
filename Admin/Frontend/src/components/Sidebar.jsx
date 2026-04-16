import { Link } from 'react-router-dom'
import { FaUser, FaKey } from 'react-icons/fa'

const Sidebar = () => {



    return (
        <div className="w-64 h-full bg-black border-r border-zinc-800 flex flex-col gap-2 text-white px-4 py-9 gap-4">

            <Link
                to="/workspace/display"
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm font-medium text-md text-white hover:text-black hover:bg-white transition-colors
                
            `}
            >
                <FaUser />
                Display Users
            </Link>

            <Link
                to="/workspace/key-rotation"
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm font-medium text-md text-white hover:text-black hover:bg-white transition-colors
                
                `}
            >
                <FaKey />
                Key Rotation Log
            </Link>

            <Link
                to="/workspace/system"
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm font-medium text-md text-white hover:text-black hover:bg-white transition-colors
                    
                `}
            >
                <FaUser />
                System Design
            </Link>

        </div>
    )
}

export default Sidebar