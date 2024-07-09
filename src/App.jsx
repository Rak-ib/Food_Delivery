import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";


const App = () => {
  return (
    <div className=" text-neutral-900 antialiased selection:bg-cyan-300  selection:text-cyan-900">
      <div className="fixed  top-0 -z-10 w-full h-full">
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]">
        </div>
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