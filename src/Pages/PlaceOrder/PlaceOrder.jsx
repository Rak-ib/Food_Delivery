
import { useContext } from "react";
import { StoreContext } from "../../Components/Context/StoreContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const PlaceOrder = () => {
    const { TotalCartPrice, foods, loading, CartItems } = useContext(StoreContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-dots loading-lg"></div>
            </div>
        );
    }

 

    const handleOrder = async (e) => {
    e.preventDefault();
    
    // Get form data
    const address = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        street: e.target.street.value,
        city: e.target.city.value,
        zipCode: e.target.zipCode.value,
        mobile: e.target.mobile.value
    };

    // Build order items
    let orderItems = [];
    foods.forEach((food) => {
        if (CartItems[food._id] > 0) {
            orderItems.push({
                foodId: food._id,
                name: food.name,
                price: food.price,
                quantity: CartItems[food._id]
            });
        }
    });

    if (TotalCartPrice() > 0) {
        try {
            const totalAmount = TotalCartPrice() + 25;
            
            // Single API call that handles both order creation and payment initiation
            const result = await axios.post('https://server-food-delivery-new.vercel.app/order/placeOrder', {
                address,
                items: orderItems,
                amount: totalAmount,
                paymentMethod: 'sslcommerz'
            }, {
                withCredentials: true
            });

            console.log("Place order response:", result.data);

            if (result.data.success && result.data.sessionUrl) {
                // Store order ID for callback verification
                localStorage.setItem('currentOrderId', result.data.orderId);
                
                // Redirect to SSLCommerz payment gateway
                window.location.href = result.data.sessionUrl;
            } else {
                toast.error(result.data.message || "Payment initiation failed");
            }
        } catch (error) {
            console.error("Order error:", error);
            toast.error(error.response?.data?.message || "Failed to place order");
        }
    } else {
        toast.info("Please select items to place an order");
    }
};

    return (
        <form onSubmit={handleOrder}>
            <ToastContainer />
            <div className="flex flex-row my-[15vh] gap-2 max-w-7xl mx-auto px-4">
                
                <div className="w-1/2 items-start border-r-2 border-orange-500 pr-6">
                    <h2 className="text-left font-semibold text-3xl text-orange-500 pb-5">
                        Enter Your Details
                    </h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-3">
                            <input 
                                required 
                                type="text" 
                                name="firstName" 
                                placeholder="First name" 
                                className="input input-bordered input-error w-1/2" 
                            />
                            <input 
                                required 
                                type="text" 
                                name="lastName" 
                                placeholder="Last name" 
                                className="input input-bordered input-error w-1/2" 
                            />
                        </div>
                        <div>
                            <input 
                                required 
                                type="email" 
                                name="email" 
                                placeholder="Email@example.com" 
                                className="input input-bordered input-error w-full" 
                            />
                        </div>
                        <div>
                            <input 
                                required 
                                type="text" 
                                name="street" 
                                placeholder="Street Address" 
                                className="input input-bordered input-error w-full" 
                            />
                        </div>
                        <div className="flex flex-row gap-3">
                            <input 
                                required 
                                type="text" 
                                name="city" 
                                placeholder="City" 
                                className="input input-bordered input-error w-1/2" 
                            />
                            <input 
                                required 
                                type="text" 
                                name="zipCode" 
                                placeholder="Zip code" 
                                className="input input-bordered input-error w-1/2" 
                            />
                        </div>
                        <div>
                            <input 
                                required 
                                type="tel" 
                                name="mobile" 
                                placeholder="Mobile Number (+880)" 
                                className="input input-bordered input-error w-full"
                                pattern="[0-9+\-\s]+"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="w-1/2 items-start pl-6">
                    <div className="flex flex-col gap-y-4">
                        <h2 className="text-3xl font-semibold text-center text-orange-500">
                            Order Summary
                        </h2>
                        
                        {/* Order items preview */}
                        <div className="max-h-40 overflow-y-auto mb-4">
                            {foods.filter(food => CartItems[food._id] > 0).map((food) => (
                                <div key={food._id} className="flex justify-between items-center py-1 text-sm">
                                    <span className="truncate">{food.name}</span>
                                    <span className="ml-2">
                                        {CartItems[food._id]} × ৳{food.price}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-x-5 justify-between border-b-2 border-gray-300 py-2">
                            <h2 className="font-medium">Sub Total</h2>
                            <h2>৳{TotalCartPrice()}</h2>
                        </div>
                        <div className="flex flex-wrap gap-x-5 border-b-2 justify-between border-gray-300 py-2">
                            <h2 className="font-medium">Delivery Charge</h2>
                            <h2>৳25</h2>
                        </div>
                        <div className="flex flex-wrap gap-x-5 border-b-2 justify-between border-gray-300 font-semibold text-lg py-2">
                            <h2>Total Amount</h2>
                            <h2 className="text-orange-500">৳{TotalCartPrice() + 25}</h2>
                        </div>
                        
                        {/* Payment method info */}
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <h3 className="font-medium text-orange-700 mb-2">Payment Method</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">SSL</span>
                                </div>
                                <span className="text-sm text-gray-700">
                                    Secure payment via SSLCommerz (bKash, Card, Mobile Banking)
                                </span>
                            </div>
                        </div>
                        
                        <button 
                            type="submit"
                            className="btn bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 text-lg"
                            disabled={TotalCartPrice() === 0}
                        >
                            Proceed to Payment (৳{TotalCartPrice() + 25})
                        </button>
                        
                        {TotalCartPrice() === 0 && (
                            <p className="text-center text-gray-500 text-sm">
                                Please add items to your cart to proceed
                            </p>
                        )}
                    </div>
                </div>

            </div>
        </form>
    );
};

export default PlaceOrder;