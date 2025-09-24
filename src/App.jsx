import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <div className="text-neutral-900 antialiased selection:bg-orange-300 selection:text-orange-900">
      <div className="fixed top-0 -z-10 w-full h-full">
        <div className="absolute top-0 -z-10 h-full w-full bg-gradient-to-br from-orange-50 to-red-50">
          {/* Primary warm food-themed gradient blob */}
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(255,154,0,0.3)] opacity-60 blur-[80px]"></div>
          {/* Secondary accent blob */}
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] w-[300px] -translate-x-[60%] translate-y-[40%] rounded-full bg-[rgba(239,68,68,0.2)] opacity-50 blur-[60px]"></div>
        </div>
      </div>
      <div className="container mx-auto mt-3">
        <Navbar/>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

// Alternative Color Schemes:

// 1. FRESH GREEN (Healthy/Organic feel)
const AppGreen = () => {
  return (
    <div className="text-neutral-900 antialiased selection:bg-green-300 selection:text-green-900">
      <div className="fixed top-0 -z-10 w-full h-full">
        <div className="absolute top-0 -z-10 h-full w-full bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(34,197,94,0.3)] opacity-60 blur-[80px]"></div>
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] w-[300px] -translate-x-[60%] translate-y-[40%] rounded-full bg-[rgba(16,185,129,0.2)] opacity-50 blur-[60px]"></div>
        </div>
      </div>
      <div className="container mx-auto mt-3">
        <Navbar/>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

// 2. WARM YELLOW (Comfort food feel)
const AppYellow = () => {
  return (
    <div className="text-neutral-900 antialiased selection:bg-yellow-300 selection:text-yellow-900">
      <div className="fixed top-0 -z-10 w-full h-full">
        <div className="absolute top-0 -z-10 h-full w-full bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(251,191,36,0.4)] opacity-60 blur-[80px]"></div>
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] w-[300px] -translate-x-[60%] translate-y-[40%] rounded-full bg-[rgba(245,158,11,0.3)] opacity-50 blur-[60px]"></div>
        </div>
      </div>
      <div className="container mx-auto mt-3">
        <Navbar/>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

// 3. MODERN BLUE (Clean, trustworthy feel)
const AppBlue = () => {
  return (
    <div className="text-neutral-900 antialiased selection:bg-blue-300 selection:text-blue-900">
      <div className="fixed top-0 -z-10 w-full h-full">
        <div className="absolute top-0 -z-10 h-full w-full bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(59,130,246,0.3)] opacity-60 blur-[80px]"></div>
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] w-[300px] -translate-x-[60%] translate-y-[40%] rounded-full bg-[rgba(99,102,241,0.2)] opacity-50 blur-[60px]"></div>
        </div>
      </div>
      <div className="container mx-auto mt-3">
        <Navbar/>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;