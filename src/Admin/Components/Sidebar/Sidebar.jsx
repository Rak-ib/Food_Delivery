import { RxDashboard } from "react-icons/rx";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import {
  FaUtensils,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaStore,
  FaTags,
  FaWallet,
  FaBell,
  FaShieldAlt
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    food: false,
    orders: false,
    users: false
  });

  // Check if current route matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Check if any child route is active
  const isParentActive = (paths) => {
    return paths.some(path => location.pathname.startsWith(path));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    {
      title: "Overview",
      items: [
        {
          path: "/admin",
          icon: RxDashboard,
          label: "Dashboard",
          badge: null
        },
        {
          path: "/admin/analytics",
          icon: FaChartBar,
          label: "Analytics",
          badge: null
        }
      ]
    },
    {
      title: "Food Management",
      key: "food",
      expandable: true,
      items: [
        {
          path: "/admin/add_food",
          icon: IoMdAddCircleOutline,
          label: "Add New Food",
          badge: null
        },
        {
          path: "/admin/food_list",
          icon: FaUtensils,
          label: "Food Items",
          badge: "24"
        },
        {
          path: "/admin/categories",
          icon: FaTags,
          label: "Categories",
          badge: null
        },
        {
          path: "/admin/inventory",
          icon: FaStore,
          label: "Inventory",
          badge: "Low Stock"
        }
      ]
    },
    {
      title: "Orders",
      key: "orders",
      expandable: true,
      items: [
        {
          path: "/admin/order_list",
          icon: FaClipboardList,
          label: "All Orders",
          badge: "12"
        },
        {
          path: "/admin/pending_orders",
          icon: FaClock,
          label: "Pending Orders",
          badge: "3"
        },
        {
          path: "/admin/order_history",
          icon: FaHistory,
          label: "Order History",
          badge: null
        }
      ]
    },
    {
      title: "User Management",
      key: "users",
      expandable: true,
      items: [
        {
          path: "/admin/customers",
          icon: FaUsers,
          label: "Customers",
          badge: "156"
        },
        {
          path: "/admin/delivery_staff",
          icon: FaTruck,
          label: "Delivery Staff",
          badge: null
        },
        {
          path: "/admin/admins",
          icon: FaShieldAlt,
          label: "Admin Users",
          badge: null
        }
      ]
    }
  ];

  const bottomItems = [
    {
      path: "/admin/notifications",
      icon: FaBell,
      label: "Notifications",
      badge: "5"
    },
    {
      path: "/admin/payments",
      icon: FaWallet,
      label: "Payments",
      badge: null
    },
    {
      path: "/admin/settings",
      icon: FaCog,
      label: "Settings",
      badge: null
    }
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white w-72 transform transition-all duration-300 z-50 shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <FaStore className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FoodieAdmin</h1>
                <p className="text-xs text-gray-400">Management Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-6">
              {menuItems.map((section, sectionIndex) => (
                <div key={sectionIndex} className="px-4">
                  {/* Section Header */}
                  {section.expandable ? (
                    <button
                      onClick={() => toggleSection(section.key)}
                      className="flex items-center justify-between w-full text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 hover:text-white transition-colors"
                    >
                      <span>{section.title}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          expandedSections[section.key] ? 'rotate-180' : ''
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  ) : (
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {section.title}
                    </h3>
                  )}

                  {/* Menu Items */}
                  <div className={`space-y-1 ${
                    section.expandable && !expandedSections[section.key] ? 'hidden' : ''
                  }`}>
                    {section.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={item.path}
                        onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                          isActive(item.path)
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                            : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className={`text-lg ${
                            isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                          }`} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            isActive(item.path)
                              ? 'bg-white/20 text-white'
                              : item.badge === 'Low Stock' 
                                ? 'bg-red-500/20 text-red-400' 
                                : 'bg-orange-500/20 text-orange-400'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700">
            <div className="p-4 space-y-1">
              {bottomItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`text-lg ${
                      isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Logout Button */}
            <div className="p-4 pt-2">
              <button className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/10 text-gray-300 hover:text-red-400 w-full transition-all duration-200 group border border-gray-700 hover:border-red-500/30">
                <FaSignOutAlt className="text-lg group-hover:text-red-400" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>

            {/* Footer */}
            <div className="p-4 pt-2 border-t border-gray-700">
              <div className="text-xs text-gray-500 text-center">
                <p>© 2024 FoodieAdmin</p>
                <p>Version 2.1.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Additional icons import for the expanded functionality
import { FaClock, FaHistory, FaTruck } from "react-icons/fa";

export default Sidebar;