import { useAuth } from "../context/AuthContext.jsx"
import Sd from "../assets/SD1.png"
const SystemDesign = () => {
    const { user } = useAuth();
    return (
        <div className='w-full h-full bg-black px-10 py-15'>
            <div className="w-full h-full text-xl flex items-center justify-center font-medium  text-black bg-white ">
                <img src={Sd} alt="System Design" className="w-full h-full" />

            </div>


        </div>
    )
}

export default SystemDesign