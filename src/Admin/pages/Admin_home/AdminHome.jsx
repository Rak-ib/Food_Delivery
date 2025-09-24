import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";

const AdminHome = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Handle body scroll when sidebar is open on mobile
    useEffect(() => {
        if (window.innerWidth < 1024) {
            document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isSidebarOpen]);

    // Close sidebar when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
                document.body.style.overflow = 'auto';
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 antialiased selection:bg-gradient-to-r selection:from-orange-200 selection:to-red-200 selection:text-gray-900">
            {/* Modern Background with Admin Theme */}
            <div className="fixed top-0 -z-10 w-full h-full">
                <div className="absolute top-0 -z-10 h-full w-full bg-gradient-to-br from-gray-50 via-orange-50/30 to-red-50/30">
                    {/* Primary gradient blob */}
                    <div className="absolute bottom-auto left-auto right-0 top-0 h-[600px] w-[600px] -translate-x-[30%] translate-y-[10%] rounded-full bg-gradient-to-r from-orange-300/20 to-red-300/20 opacity-60 blur-[100px] animate-pulse">
                    </div>
                    {/* Secondary accent blob */}
                    <div className="absolute bottom-auto left-auto right-0 top-0 h-[400px] w-[400px] -translate-x-[60%] translate-y-[50%] rounded-full bg-gradient-to-r from-red-300/15 to-orange-300/15 opacity-50 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}>
                    </div>
                    {/* Bottom left accent */}
                    <div className="absolute bottom-0 left-0 h-[300px] w-[300px] translate-x-[-20%] translate-y-[20%] rounded-full bg-gradient-to-r from-orange-200/10 to-red-200/10 opacity-40 blur-[60px]">
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="relative flex min-h-screen">
                {/* Sidebar */}
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col lg:ml-72 transition-all duration-300">
                    {/* Admin Navbar */}
                    <AdminNavbar toggleSidebar={toggleSidebar} />
                    
                    {/* Main Content */}
                    <main className="flex-1 overflow-auto">
                        <div className="p-6 lg:p-8">
                            {/* Content Container with subtle background */}
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 min-h-[calc(100vh-8rem)]">
                                <div className="p-6 lg:p-8">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Loading Overlay (optional - for future use) */}
            {/* <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] hidden">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-gradient-to-r border-t-from-orange-500 border-t-to-red-500 rounded-full animate-spin"></div>
                        <p className="text-gray-600 font-medium">Loading...</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default AdminHome;