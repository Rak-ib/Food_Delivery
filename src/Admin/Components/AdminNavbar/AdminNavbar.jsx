import { FiMenu, FiBell, FiLogOut, FiSettings, FiUser, FiSearch, FiMaximize2 } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const AdminNavbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState([
    { id: 1, type: 'order', message: 'New order #1234 received', time: '2 min ago', unread: true },
    { id: 2, type: 'warning', message: 'Inventory low on Chicken Pizza', time: '15 min ago', unread: true },
    { id: 3, type: 'info', message: 'System update completed', time: '1 hour ago', unread: false },
    { id: 4, type: 'order', message: 'Order #1230 completed', time: '2 hours ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;
  
  // Get current page title and breadcrumb from route
  const getPageInfo = () => {
    const pathParts = location.pathname.split('/').filter(part => part);
    const currentPage = pathParts[pathParts.length - 1] || 'admin';
    
    const pageMap = {
      'admin': { title: 'Dashboard', breadcrumb: ['Admin', 'Dashboard'] },
      'add_food': { title: 'Add New Food Item', breadcrumb: ['Admin', 'Food Management', 'Add Food'] },
      'food_list': { title: 'Food Items', breadcrumb: ['Admin', 'Food Management', 'Food List'] },
      'categories': { title: 'Categories', breadcrumb: ['Admin', 'Food Management', 'Categories'] },
      'inventory': { title: 'Inventory Management', breadcrumb: ['Admin', 'Food Management', 'Inventory'] },
      'order_list': { title: 'All Orders', breadcrumb: ['Admin', 'Orders', 'All Orders'] },
      'pending_orders': { title: 'Pending Orders', breadcrumb: ['Admin', 'Orders', 'Pending'] },
      'order_history': { title: 'Order History', breadcrumb: ['Admin', 'Orders', 'History'] },
      'customers': { title: 'Customer Management', breadcrumb: ['Admin', 'Users', 'Customers'] },
      'delivery_staff': { title: 'Delivery Staff', breadcrumb: ['Admin', 'Users', 'Delivery Staff'] },
      'admins': { title: 'Admin Users', breadcrumb: ['Admin', 'Users', 'Admins'] },
      'analytics': { title: 'Analytics Dashboard', breadcrumb: ['Admin', 'Analytics'] },
      'notifications': { title: 'Notification Center', breadcrumb: ['Admin', 'Notifications'] },
      'payments': { title: 'Payment Management', breadcrumb: ['Admin', 'Payments'] },
      'settings': { title: 'System Settings', breadcrumb: ['Admin', 'Settings'] },
    };
    
    return pageMap[currentPage] || { title: 'Admin Panel', breadcrumb: ['Admin'] };
  };

  const { title, breadcrumb } = getPageInfo();

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'order': return '🛍️';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="navbar bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      {/* Left Section - Sidebar Toggle, Breadcrumb and Search */}
      <div className="flex-1 flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="btn btn-ghost btn-circle lg:hidden hover:bg-gray-100"
        >
          <FiMenu className="text-xl text-gray-600" />
        </button>
        
        {/* Breadcrumb and Title */}
        <div className="hidden sm:flex flex-col">
          <div className="text-xs text-gray-500 breadcrumbs p-0 min-h-0">
            <ul className="text-xs">
              {breadcrumb.map((crumb, index) => (
                <li key={index} className={index === breadcrumb.length - 1 ? 'text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text font-semibold' : ''}>
                  {crumb}
                </li>
              ))}
            </ul>
          </div>
          <h1 className="text-lg font-semibold text-gray-800 -mt-1">
            {title}
          </h1>
        </div>

        {/* Mobile title only */}
        <h1 className="text-lg font-semibold text-gray-800 sm:hidden">
          {title}
        </h1>
        
        {/* Search Bar */}
        <div className="hidden md:flex relative ml-auto mr-4">
          <input
            type="text"
            placeholder="Search orders, food items..."
            className="input input-sm bg-gray-50 border-gray-200 w-64 pl-8 focus:outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-2.5 top-2.5 text-gray-400 text-sm" />
        </div>
      </div>
      
      {/* Right Section - Admin Controls */}
      <div className="flex-none">
        <div className="flex items-center gap-2">
          {/* Fullscreen Toggle */}
          <button 
            onClick={toggleFullscreen}
            className="btn btn-ghost btn-circle btn-sm hover:bg-gray-100 hidden lg:flex"
            title="Toggle Fullscreen"
          >
            <FiMaximize2 className="text-lg text-gray-600" />
          </button>

          {/* Notifications */}
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle btn-sm hover:bg-gray-100 relative">
              <FiBell className="text-lg text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <div className="dropdown-content mt-3 z-[1] bg-white shadow-xl rounded-lg border w-80 border-gray-100">
              <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-white bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 rounded-full shadow-sm">
                      {unreadCount} new
                    </span>
                  )}
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer transition-colors ${
                      notification.unread ? 'bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-l-orange-400' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 shadow-sm"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t bg-gray-50">
                <button className="w-full text-center text-sm text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text hover:from-orange-600 hover:to-red-600 font-semibold transition-all">
                  View all notifications
                </button>
              </div>
            </div>
          </div>
          
          {/* Admin Profile */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2 cursor-pointer transition-colors">
              <div className="avatar">
                <div className="w-8 rounded-full ring-2 ring-gradient-to-r ring-orange-200">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Admin" />
                </div>
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-800">Sarah Admin</span>
                <span className="text-xs text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text font-medium">Administrator</span>
              </div>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow-xl bg-white rounded-lg border border-gray-100 w-52 mt-2">
              <li className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wide border-b border-gray-100">
                Account
              </li>
              <li>
                <a className="flex items-center gap-3 py-3 px-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 rounded-lg transition-all group">
                  <FiUser className="text-gray-500 group-hover:text-orange-500" />
                  <span className="group-hover:text-gray-800">Profile</span>
                  <span className="ml-auto bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">New</span>
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 py-3 px-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 rounded-lg transition-all group">
                  <FiSettings className="text-gray-500 group-hover:text-orange-500" />
                  <span className="group-hover:text-gray-800">Settings</span>
                </a>
              </li>
              <div className="divider my-1"></div>
              <li>
                <a className="flex items-center gap-3 py-3 px-3 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700 transition-all group">
                  <FiLogOut className="group-hover:text-red-700" />
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;