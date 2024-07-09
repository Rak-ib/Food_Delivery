import pic1 from "../../../src/assets/Screenshot 2024-07-08 022546.png"
import pic2 from "../../../src/assets/Screenshot 2024-07-08 023510.png"
import header_img from "../../assets/frontend_assets/header_img.png"
const Header = () => {
    const short=(<div className="mt-40 pl-6 w-1/2 gap-y-6">
        <p className="text-white text-4xl font-bold">Order Your Favourite Food Here</p>
        <h2 className="text-white mt-6 tracking-tight ">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Error eum perferendis excepturi reprehenderit illum numquam
            fugit fuga repellendus ipsum at, eveniet nihil minima modi fugiat
            voluptas quibusdam eos quod repellat.</h2>
        <button className="btn btn-active hover:bg-orange-500 bg-orange-600 mt-4 ml text-white">View our food</button>
        </div>)
    return (
        <div className="carousel w-full border-b-2 border-orange-500 mt-5 h-[600px] pb-4">
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src={pic1}
                    className="w-full rounded-2xl   " />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between  ">
                    <a href="#slide4" className="btn btn-circle opacity-5">❮</a>
                    <a href="#slide2" className="btn btn-circle opacity-5">❯</a>
                </div>
                <div className="absolute w-full h-[580px] bg-gradient-to-r from-black opacity-85">
                    {short}
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img
                    src={header_img}
                    className="w-full rounded-2xl  " />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-5 hover:opacity-0">
                    <a href="#slide1" className="btn btn-circle opacity-5">❮</a>
                    <a href="#slide3" className="btn btn-circle opacity-5">❯</a>
                </div>
                <div className="absolute w-full h-[570px] bg-gradient-to-r from-black  opacity-85">{short}</div>
                
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src={pic1}
                    className="w-full rounded-2xl " />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-5 hover:opacity-0">
                    <a href="#slide2" className="btn btn-circle opacity-5">❮</a>
                    <a href="#slide4" className="btn btn-circle opacity-5">❯</a>
                </div>
                <div className="absolute w-full h-[560px] bg-gradient-to-r from-black  opacity-85">{short}</div>
                
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img
                    src={pic2}
                    className="w-full rounded-2xl  " />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-5 hover:opacity-0">
                    <a href="#slide3" className="btn btn-circle opacity-5">❮</a>
                    <a href="#slide1" className="btn btn-circle opacity-5">❯</a>
                </div>
                <div className="absolute w-full h-[580px] bg-gradient-to-r from-black  opacity-85">{short}</div>
                
            </div>
        </div>
    );
};

export default Header;