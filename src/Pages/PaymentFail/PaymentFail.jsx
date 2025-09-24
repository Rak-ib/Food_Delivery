import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Payment Failed Component
export const PaymentFail = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear any stored order ID on failure
        localStorage.removeItem('currentOrderId');
    }, []);

    const handleRetry = () => {
        navigate('/cart');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                    {/* Failure Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <svg 
                            className="w-10 h-10 text-red-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M6 18L18 6M6 6l12 12" 
                            />
                        </svg>
                    </div>

                    {/* Failure Message */}
                    <h2 className="text-2xl font-bold text-red-600 mb-2">
                        Payment Failed
                    </h2>
                    <p className="text-gray-600 mb-6">
                        We couldn't process your payment. This might be due to insufficient funds, network issues, or payment method problems.
                    </p>

                    {/* Failure Reasons */}
                    <div className="bg-red-50 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-red-800 mb-2">Common reasons for payment failure:</h3>
                        <ul className="text-sm text-red-700 space-y-1">
                            <li>• Insufficient account balance</li>
                            <li>• Network connectivity issues</li>
                            <li>• Incorrect payment details</li>
                            <li>• Payment method temporarily unavailable</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button 
                            onClick={handleRetry}
                            className="w-full btn bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Try Again
                        </button>
                        <button 
                            onClick={handleGoHome}
                            className="w-full btn btn-outline border-gray-400 text-gray-600 hover:bg-gray-50"
                        >
                            Go to Home
                        </button>
                    </div>

                    {/* Support Info */}
                    <div className="mt-6 text-xs text-gray-500">
                        <p>Need help? Contact our support team</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Payment Cancelled Component
export const PaymentCancel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear any stored order ID on cancellation
        localStorage.removeItem('currentOrderId');
    }, []);

    const handleReturnToCart = () => {
        navigate('/cart');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                    {/* Cancel Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg 
                            className="w-10 h-10 text-yellow-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
                            />
                        </svg>
                    </div>

                    {/* Cancel Message */}
                    <h2 className="text-2xl font-bold text-yellow-600 mb-2">
                        Payment Cancelled
                    </h2>
                    <p className="text-gray-600 mb-6">
                        You cancelled the payment process. No charges have been made to your account.
                    </p>

                    {/* Info Box */}
                    <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                            Your items are still in your cart. You can complete your order whenever you're ready.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button 
                            onClick={handleReturnToCart}
                            className="w-full btn bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Return to Cart
                        </button>
                        <button 
                            onClick={handleGoHome}
                            className="w-full btn btn-outline border-gray-400 text-gray-600 hover:bg-gray-50"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};