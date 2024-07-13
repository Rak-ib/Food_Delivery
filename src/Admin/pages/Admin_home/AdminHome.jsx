import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

const AdminHome = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
        document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
    };

    return (
        <div className="text-neutral-900 antialiased selection:bg-cyan-300 selection:text-cyan-900">
            <div className="fixed top-0 -z-10 w-full h-full">
                <div className="absolute top-0 -z-10 h-full w-full bg-white">
                    <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]">
                    </div>
                </div>
            </div>
                
            <div className="relative  overflow-hidden">
                <div className="flex flex-row align-middle pl-6">
                    <BsLayoutTextSidebarReverse 
                        onClick={toggleSidebar} 
                        className="text-xl my-auto hover:cursor-pointer fixed z-50 top-4 left-4" 
                    />
                    <AdminNavbar />
                </div>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="p-4 container mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
