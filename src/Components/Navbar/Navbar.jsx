import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";


const Navbar = () => {
  const [menu, SetMenu] = useState("menu")
  const navigate =useNavigate();
  const {TotalCartPrice}=useContext(StoreContext);
  return (

    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li onClick={()=>SetMenu("home")}><a className={menu == "home" ? "bg-orange-500 hover:bg-orange-500" : "hover:bg-orange-500"}>Home</a></li>
            <li onClick={()=>SetMenu("menu")}><a className={menu == "menu" ? "bg-orange-500 hover:bg-orange-500" : "hover:bg-orange-500"}>Menu</a></li>
            <li onClick={()=>SetMenu("contact")}><a className={menu == "contact" ? "bg-orange-500 hover:bg-orange-500" : "hover:bg-orange-500"}>Contact Us</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li onClick={()=>SetMenu("home")}><Link to="/" className={menu == "home" ? "bg-orange-500 hover:bg-orange-500" : "hover:bg-orange-500"}>Home</Link></li>
          <li onClick={()=>SetMenu("menu")}><a href="#menu" className={menu == "menu" ? "bg-orange-500 hover:bg-orange-500" : "hover:bg-orange-500"}>Menu</a></li>
          <li onClick={()=>SetMenu("contact")}><a href="#footer" className={menu == "contact" ? "bg-orange-500 hover:bg-orange-500" : "hover:bg-orange-500"}>Contact Us</a></li>
        </ul>
      </div>
      <div className="navbar-end lg:gap-4">
        <div className="form-control  ">
          <input type="text" placeholder="Search" className="border-2 px-2 rounded-full lg:w-32 lg:h-10 border-orange-500" />
        </div>
        <button onClick={()=>navigate('/cart')} className="btn btn-ghost btn-circle hover:bg-orange-500">
          <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
            <span className={TotalCartPrice()>0?"badge badge-xs bg-orange-500 indicator-item":"hidden"}></span>
          </div>
        </button>
        <button className="shadow-sm  border-2 rounded-full hover:bg-orange-500 border-orange-500 w-20 h-11 py-0 my-0">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;