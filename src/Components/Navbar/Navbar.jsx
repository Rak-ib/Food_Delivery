import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const Navbar = () => {
  const { currentUser, SignOut } = useContext(StoreContext);
  const [activeMenu, setActiveMenu] = useState("home");
  const navigate = useNavigate();
  const { TotalCartPrice } = useContext(StoreContext);

  const handleLogOut = async () => {
    try {
      await SignOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  if (!currentUser) {
    console.log("No user logged in");
  } else {
    console.log("Current User:", currentUser);
  }

  const menuItems = [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'menu', label: 'Menu', to: '#menu' },
    { id: 'contact', label: 'Contact Us', to: '#footer' }
  ];

  const userMenu = (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-orange-400/20 transition-colors">
        <div className="w-10 rounded-full ring-2 ring-orange-400">
          <img
            alt={currentUser?.userName || "User Avatar"}
            src={currentUser?.image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-white rounded-lg z-[1] mt-3 p-2 shadow-lg border border-orange-100 min-w-[160px]">
        <li>
          <Link
            to='/userOrder'
            className="hover:bg-orange-50 text-gray-700 font-medium"
          >
            My Orders
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="hover:bg-orange-50 text-gray-700 font-medium"
          >
            Settings
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogOut}
            className="hover:bg-red-50 text-red-600 font-medium w-full text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  const cartItemCount = TotalCartPrice() > 0 ? 1 : 0; // You might want to get actual item count

  return (
    <div className="navbar bg-gradient-to-r from-orange-400 to-orange-500 px-5 lg:px-20 shadow-md">
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-orange-400/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-lg z-[1] mt-3 w-52 p-2 shadow-lg border border-orange-100">
            {menuItems.map((item) => (
              <li key={item.id} onClick={() => setActiveMenu(item.id)}>
                <Link
                  to={item.to}
                  className={`font-medium transition-colors ${activeMenu === item.id
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-700 hover:bg-orange-50"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand */}
        <Link to="/" className="btn btn-ghost text-xl font-bold text-white hover:bg-orange-400/20">
          🍽️ FeelHungry
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {menuItems.map((item) => (
            <li key={item.id} onClick={() => setActiveMenu(item.id)}>
              <Link
                to={item.to}
                className={`font-medium transition-all duration-200 ${activeMenu === item.id
                    ? "bg-orange-600 text-white shadow-md"
                    : "text-white hover:bg-orange-400/30"
                  }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end lg:gap-4 gap-2">
        {/* Search */}
        <div className="form-control">
          <input
            type="text"
            placeholder="Search foods..."
            className="input input-sm bg-white/90 placeholder-gray-500 border-2 border-white/20 focus:border-white focus:bg-white rounded-full w-32 lg:w-40 transition-all duration-200"
          />
        </div>

        {/* Cart */}
        <button
          onClick={() => navigate('/cart')}
          className="btn btn-ghost btn-circle hover:bg-orange-400/20 transition-colors relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* User menu or Sign in */}
        {currentUser ? userMenu : (
          <Link
            to="/login"
            className="btn btn-sm bg-white text-orange-500 border-2 border-white hover:bg-orange-50 hover:border-orange-200 font-semibold transition-all duration-200 rounded-full"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;