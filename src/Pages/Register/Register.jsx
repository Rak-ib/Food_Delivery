import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const Register = () => {
    const navigate=useNavigate();
    const handleRegister=async(e)=>{
        e.preventDefault();
        const userName=e.target.userName.value;
        const email=e.target.email.value;
        const password=e.target.password.value;
        const image="null"
        const user={userName,email,password,image};
        console.log(user);
        try {
            const result=await axios.post("http://localhost:5000/user/register",user);
            if(result.data.success){
                toast.success(result.data.message)
                navigate('/');
            }else{
                console.log("hello");
                console.log("hello",result.data.message);
                toast.error(result.data.message)
            }
            
        } catch (error) {
            console.log(error);
        }
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
                    <ToastContainer></ToastContainer>
                    <div className="hero-content">
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form className="card-body" onSubmit={handleRegister}>
                                <div className="form-control">
                                    <label className="label ">
                                        <span className="label-text ">Email </span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label ">
                                        <span className="label-text ">Username</span>
                                    </label>
                                    <input type="text" name="userName" placeholder="username" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                    
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-orange-500 hover:bg-orange-500">Register</button>
                                    <div className="flex flex-row gap-x-5">
                                        <p>If have an account!</p><Link to='/login' className=" link link-hover text-orange-500 hover:text-orange-500">Login</Link>
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

export default Register;