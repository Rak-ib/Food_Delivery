import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../Components/Context/StoreContext";
import { GoogleLogin } from "@react-oauth/google";


const Login = () => {
    const { SignIn,GoogleSignIn } = useContext(StoreContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleGoogleLogin = async (credentialResponse) => {
    try {
      // credentialResponse.credential is the Google ID token

      const result= await GoogleSignIn(credentialResponse.credential);
      if(result.data?.success){
        toast.success(result.data.message || "Login successful!");
        navigate("/", { replace: true });
      } else {
        toast.error(result.data?.message || "Login failed. Please try again.");
      }
        console.log("Google login successful:", result);
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const formData = new FormData(e.target);
            const credentials = {
                name: formData.get('name'),
                password: formData.get('password')
            };

            console.log('Login attempt for:', credentials.name);
            
            const result = await SignIn(credentials);
            
            if (result.data?.success) {
                toast.success(result.data.message || "Login successful!");
                navigate("/", { replace: true });
            } else {
                toast.error(result.data?.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 text-neutral-900 antialiased selection:bg-orange-200 selection:text-orange-900">
            {/* Background decoration */}
            <div className="fixed top-0 -z-10 w-full h-full overflow-hidden">
                <div className="absolute top-0 -z-10 h-full w-full bg-transparent">
                    {/* Primary gradient blob */}
                    <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-gradient-to-r from-orange-300 to-orange-400 opacity-30 blur-[100px] animate-pulse">
                    </div>
                    {/* Secondary gradient blob */}
                    <div className="absolute bottom-auto left-0 right-auto top-[60%] h-[400px] w-[400px] translate-x-[-20%] rounded-full bg-gradient-to-r from-orange-200 to-orange-300 opacity-25 blur-[80px] animate-pulse delay-1000">
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-gray-600">
                                Sign in to your FeelHungry account
                            </p>
                        </div>

                        {/* Login Card */}
                        <div className="card bg-white/80 backdrop-blur-sm shadow-2xl border border-orange-100">
                            <div className="card-body p-8">
                                <form onSubmit={handleLogin} className="space-y-6">
                                    {/* Email/Username Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-gray-700">
                                                Email <span className="text-orange-500 mx-1">/</span> Username
                                            </span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            placeholder="Enter your email or username" 
                                            className="input input-bordered border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-white/50" 
                                            required 
                                            disabled={isLoading}
                                        />
                                    </div>

                                    {/* Password Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-gray-700">Password</span>
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type={showPassword ? "text" : "password"} 
                                                name="password" 
                                                placeholder="Enter your password" 
                                                className="input input-bordered w-full pr-12 border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-white/50" 
                                                required 
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                            >
                                                {showPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <label className="label">
                                            <Link to="/forgot-password" className="label-text-alt link link-hover text-orange-500 hover:text-orange-600">
                                                Forgot password?
                                            </Link>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="form-control mt-8">
                                        <button 
                                            type="submit"
                                            className={`btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-none text-white font-semibold py-3 transition-all duration-200 transform hover:scale-[1.02] shadow-lg ${
                                                isLoading ? 'loading loading-spinner' : ''
                                            }`}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Signing In...' : 'Sign In'}
                                        </button>
                                    </div>

                                    {/* Divider */}
                                    <div className="divider text-gray-500">or</div>

                                    {/* Social Login Options */}
                                    <div className="space-y-3">
                                        <GoogleLogin 
                                            onSuccess={handleGoogleLogin}
                                            onError={() => console.log("Login Failed")}
                                            disabled={isLoading}
                                        >
                                        </GoogleLogin>
                                    </div>
                                </form>

                                {/* Register Link */}
                                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                                    <p className="text-gray-600">
                                        Do not have an account?{' '}
                                        <Link 
                                            to="/register" 
                                            className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                                        >
                                            Create one now
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-8 text-sm text-gray-500">
                            <p>
                                By signing in, you agree to our{' '}
                                <Link to="/terms" className="text-orange-500 hover:text-orange-600">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-orange-500 hover:text-orange-600">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;