import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { StoreContext } from "../../Components/Context/StoreContext";

const Register = () => {
    const { SignUp } = useContext(StoreContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    // Password strength validation
    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            minLength,
            hasUpper,
            hasLower,
            hasNumber,
            hasSpecial,
            isStrong: minLength && hasUpper && hasLower && hasNumber && hasSpecial
        };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!formData.userName.trim()) {
            newErrors.userName = 'Username is required';
        } else if (formData.userName.length < 3) {
            newErrors.userName = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.userName)) {
            newErrors.userName = 'Username can only contain letters, numbers, and underscores';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else {
            const passwordCheck = validatePassword(formData.password);
            if (!passwordCheck.isStrong) {
                newErrors.password = 'Password must meet all requirements';
            }
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        
        try {
            const user = {
                userName: formData.userName.trim(),
                email: formData.email.toLowerCase().trim(),
                password: formData.password,
                image: "null"
            };

            console.log('Registration attempt for:', user.userName);
            
            const result = await SignUp(user);
            
            if (result.data?.success) {
                toast.success(result.data.message || "Registration successful!");
                navigate('/', { replace: true });
            } else {
                toast.error(result.data?.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = validatePassword(formData.password);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 text-neutral-900 antialiased selection:bg-orange-200 selection:text-orange-900">
            <ToastContainer />
            
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
                                Join FeelHungry
                            </h1>
                            <p className="text-gray-600">
                                Create your account and start your food journey
                            </p>
                        </div>

                        {/* Register Card */}
                        <div className="card bg-white/80 backdrop-blur-sm shadow-2xl border border-orange-100">
                            <div className="card-body p-8">
                                <form onSubmit={handleRegister} className="space-y-6">
                                    {/* Email Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-gray-700">Email Address</span>
                                        </label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email address" 
                                            className={`input input-bordered border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-white/50 ${
                                                errors.email ? 'border-red-400 focus:border-red-400' : ''
                                            }`}
                                            required 
                                            disabled={isLoading}
                                        />
                                        {errors.email && (
                                            <label className="label">
                                                <span className="label-text-alt text-red-500">{errors.email}</span>
                                            </label>
                                        )}
                                    </div>

                                    {/* Username Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-gray-700">Username</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="userName"
                                            value={formData.userName}
                                            onChange={handleInputChange}
                                            placeholder="Choose a username" 
                                            className={`input input-bordered border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-white/50 ${
                                                errors.userName ? 'border-red-400 focus:border-red-400' : ''
                                            }`}
                                            required 
                                            disabled={isLoading}
                                        />
                                        {errors.userName && (
                                            <label className="label">
                                                <span className="label-text-alt text-red-500">{errors.userName}</span>
                                            </label>
                                        )}
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
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="Create a strong password" 
                                                className={`input input-bordered w-full pr-12 border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-white/50 ${
                                                    errors.password ? 'border-red-400 focus:border-red-400' : ''
                                                }`}
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
                                        {errors.password && (
                                            <label className="label">
                                                <span className="label-text-alt text-red-500">{errors.password}</span>
                                            </label>
                                        )}
                                        
                                        {/* Password Strength Indicator */}
                                        {formData.password && (
                                            <div className="mt-2 space-y-1">
                                                <div className="text-xs text-gray-600">Password requirements:</div>
                                                <div className="grid grid-cols-2 gap-1 text-xs">
                                                    <div className={`${passwordStrength.minLength ? 'text-green-600' : 'text-gray-400'}`}>
                                                        ✓ At least 8 characters
                                                    </div>
                                                    <div className={`${passwordStrength.hasUpper ? 'text-green-600' : 'text-gray-400'}`}>
                                                        ✓ Uppercase letter
                                                    </div>
                                                    <div className={`${passwordStrength.hasLower ? 'text-green-600' : 'text-gray-400'}`}>
                                                        ✓ Lowercase letter
                                                    </div>
                                                    <div className={`${passwordStrength.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                                                        ✓ Number
                                                    </div>
                                                    <div className={`${passwordStrength.hasSpecial ? 'text-green-600' : 'text-gray-400'} col-span-2`}>
                                                        ✓ Special character (!@#$%^&*)
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-gray-700">Confirm Password</span>
                                        </label>
                                        <input 
                                            type="password" 
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Confirm your password" 
                                            className={`input input-bordered border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-white/50 ${
                                                errors.confirmPassword ? 'border-red-400 focus:border-red-400' : ''
                                            }`}
                                            required 
                                            disabled={isLoading}
                                        />
                                        {errors.confirmPassword && (
                                            <label className="label">
                                                <span className="label-text-alt text-red-500">{errors.confirmPassword}</span>
                                            </label>
                                        )}
                                    </div>

                                    {/* Terms and Conditions */}
                                    <div className="form-control">
                                        <label className="label cursor-pointer justify-start">
                                            <input type="checkbox" className="checkbox checkbox-orange mr-3" required disabled={isLoading} />
                                            <span className="label-text text-sm text-gray-600">
                                                I agree to the{' '}
                                                <Link to="/terms" className="text-orange-500 hover:text-orange-600 underline">
                                                    Terms of Service
                                                </Link>{' '}
                                                and{' '}
                                                <Link to="/privacy" className="text-orange-500 hover:text-orange-600 underline">
                                                    Privacy Policy
                                                </Link>
                                            </span>
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
                                            {isLoading ? 'Creating Account...' : 'Create Account'}
                                        </button>
                                    </div>

                                    {/* Divider */}
                                    <div className="divider text-gray-500">or</div>

                                    {/* Social Registration */}
                                    <div className="space-y-3">
                                        <button 
                                            type="button" 
                                            className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
                                            disabled={isLoading}
                                        >
                                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                            </svg>
                                            Sign up with Google
                                        </button>
                                    </div>
                                </form>

                                {/* Login Link */}
                                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <Link 
                                            to="/login" 
                                            className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                                        >
                                            Sign in instead
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;