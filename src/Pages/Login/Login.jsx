// import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../Components/Context/StoreContext";


const Login = () => {
    const {SignIn}=useContext(StoreContext)
    const navigate=useNavigate()
    const handleLogin=async(e)=>{
        e.preventDefault();
        const name=e.target.name.value;
        const password=e.target.password.value;
        const user={name,password};
        console.log(user);
        const result=await SignIn(user);
        console.log("ok");
        if(result.data.success){
            console.log(result.data.message);
            toast.success(result.data.message);
            navigate("/")
        }
        console.log(result.data.message);
    }

    return (
        <div className=" text-neutral-900 antialiased selection:bg-cyan-300  selection:text-cyan-900">
            <div className="fixed  top-0 -z-10 w-full h-full">
                <div className="absolute top-0 -z-10 h-full w-full bg-white">
                    <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]">
                    </div>
                </div>

            </div>
            <div className="container mx-auto  my-[20vh] ">
                <div className="hero my-auto ">
                    <div className="hero-content">
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form className="card-body" onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label ">
                                        <span className="label-text ">Email <span className="font-bold text-orange-500">/</span>Username</span>
                                    </label>
                                    <input type="text" name="name" placeholder="email / username" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                    
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-orange-500 hover:bg-orange-500">Login</button>
                                    <div className="flex flex-row gap-x-5">
                                        <p>Have no Account?</p><Link to='/register' className=" link link-hover text-orange-500 hover:text-orange-500">Register</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;