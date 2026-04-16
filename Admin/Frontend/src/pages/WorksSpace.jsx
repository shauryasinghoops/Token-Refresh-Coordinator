import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useLocation } from "react-router-dom"
import Display from "../sections/Display"
import System from "../sections/System"
import KeyRotation from "../sections/KeyRotation"


const WorksSpace = () => {

    const isdisplay = useLocation().pathname === '/workspace/display';
    const issystem = useLocation().pathname === '/workspace/system';
    const isworkspace = useLocation().pathname === '/workspace';
    const iskeyrotation = useLocation().pathname === '/workspace/key-rotation';
    
    return (
        <div className="w-full h-screen bg-black flex flex-col overflow-hidden">
            <div className="shrink-0">
                <Navbar />
            </div>

            <div className="flex flex-1 w-full overflow-hidden">
                <div className="shrink-0 h-full">
                    <Sidebar />
                </div>

                <div className="flex-1 h-full overflow-y-auto bg-black p-12">
                    <div className="h-full">
                        
                        {isworkspace && <Display/>}
                        {isdisplay && <Display />}
                        {issystem && <System />}
                        {iskeyrotation && <KeyRotation />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorksSpace
