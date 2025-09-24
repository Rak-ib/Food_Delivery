import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentCallback = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('Processing payment...');
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get parameters from URL
                const paymentID = searchParams.get('paymentID');
                const status = searchParams.get('status');
                const orderId = searchParams.get('orderId') || localStorage.getItem('currentOrderId');

                console.log('Callback params:', { paymentID, status, orderId });

                if (!paymentID) {
                    setStatus('error');
                    setMessage('Payment ID not found');
                    setLoading(false);
                    return;
                }

                if (status === 'success') {
                    // Execute the payment
                    const result = await axios.post('http://localhost:5000/order/bkash/execute', {
                        paymentID,
                        orderId
                    }, {
                        withCredentials: true
                    });

                    console.log('Execute payment result:', result.data);

                    if (result.data.success) {
                        setStatus('success');
                        setMessage('Payment completed successfully!');
                        
                        // Clear stored order ID
                        localStorage.removeItem('currentOrderId');
                        
                        // Redirect to success page after 3 seconds
                        setTimeout(() => {
                            navigate('/orders');
                        }, 3000);
                    } else {
                        setStatus('error');
                        setMessage('Payment execution failed');
                    }
                } else if (status === 'failure') {
                    setStatus('error');
                    setMessage('Payment was cancelled or failed');
                } else {
                    setStatus('error');
                    setMessage('Unknown payment status');
                }
            } catch (error) {
                console.error('Callback error:', error);
                setStatus('error');
                setMessage('Error processing payment');
            } finally {
                setLoading(false);
            }
        };

        handleCallback();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                {loading ? (
                    <div className="text-center">
                        <div className="loading loading-dots loading-lg text-orange-500"></div>
                        <p className="mt-4 text-gray-600">{message}</p>
                    </div>
                ) : (
                    <div className="text-center">
                        {status === 'success' ? (
                            <>
                                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-green-600 mb-2">Payment Successful!</h2>
                                <p className="text-gray-600 mb-4">{message}</p>
                                <p className="text-sm text-gray-500">Redirecting to your orders...</p>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-red-600 mb-2">Payment Failed</h2>
                                <p className="text-gray-600 mb-4">{message}</p>
                                <button 
                                    onClick={() => navigate('/cart')}
                                    className="btn bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    Try Again
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentCallback;