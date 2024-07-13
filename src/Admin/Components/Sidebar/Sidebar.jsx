import { RxDashboard } from "react-icons/rx";
import { IoMdAddCircleOutline } from "react-icons/io";
// import { BsLayoutTextSidebarReverse } from "react-icons/bs";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleSidebar}
            />
            <div
                className={`pt-10 fixed inset-y-0 left-0 bg-white text-black w-64 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-4">
                    {/* <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">Menu</span>
                        <BsLayoutTextSidebarReverse
                            onClick={toggleSidebar}
                            className="text-xl hover:cursor-pointer"
                        />
                    </div> */}
                    <div className="flex items-center mt-5 space-x-2 p-2 hover:bg-gray-200 cursor-pointer border-b-2 border-gray-400 ">
                        <RxDashboard className="text-2xl"></RxDashboard>
                        <span>Dashboard</span>
                    </div>
                    <div className="flex items-center mt-5 space-x-2 p-2 hover:bg-gray-200 cursor-pointer border-b-2 border-gray-400">
                        <IoMdAddCircleOutline className="text-2xl"></IoMdAddCircleOutline>
                        <span>Add food</span>
                    </div>
                    <div className="flex items-center mt-5 space-x-2 p-2 hover:bg-gray-200 cursor-pointer border-b-2 border-gray-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
                        <span>Subscriptions</span>
                    </div>
                    <div className="flex items-center mt-5 space-x-2 p-2 hover:bg-gray-200 cursor-pointer border-b-2 border-gray-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 14h-4v-2h4v2zm0-4h-4V6h4v6z" /></svg>
                        <span>Library</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
