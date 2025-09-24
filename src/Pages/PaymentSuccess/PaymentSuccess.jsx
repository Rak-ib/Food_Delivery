import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const orderId = searchParams.get('orderId') || localStorage.getItem('currentOrderId');
                
                if (!orderId) {
                    setLoading(false);
                    return;
                }

                // Verify the order status
                const result = await axios.post('https://food-delivery-alpha-puce.vercel.app/order/verify', {
                    orderId
                }, {
                    withCredentials: true
                });

                console.log('Order verification result:', result.data);

                if (result.data.success) {
                    setOrderDetails(result.data.order);
                } else {
                    console.error('Order verification failed');
                }

                // Clear stored order ID
                localStorage.removeItem('currentOrderId');
                
            } catch (error) {
                console.error('Verification error:', error);
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [searchParams]);

    const handleViewOrders = () => {
        navigate('/orders');
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                    <div className="text-center">
                        <div className="loading loading-dots loading-lg text-orange-500"></div>
                        <p className="mt-4 text-gray-600">Verifying your payment...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg 
                            className="w-10 h-10 text-green-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                    </div>

                    {/* Success Message */}
                    <h2 className="text-2xl font-bold text-green-600 mb-2">
                        Payment Successful!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your order. Your payment has been processed successfully.
                    </p>

                    {/* Order Details */}
                    {orderDetails && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                            <h3 className="font-semibold text-gray-800 mb-2">Order Details</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Order ID:</span>
                                    <span className="font-mono">{orderDetails.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Amount:</span>
                                    <span className="font-semibold">৳{orderDetails.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Status:</span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                        {orderDetails.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button 
                            onClick={handleViewOrders}
                            className="w-full btn bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            View My Orders
                        </button>
                        <button 
                            onClick={handleContinueShopping}
                            className="w-full btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-50"
                        >
                            Continue Shopping
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 text-xs text-gray-500">
                        <p>You will receive an order confirmation shortly.</p>
                        <p>Estimated delivery: 30-45 minutes</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;