import { useContext } from "react";
import { StoreContext } from "../../Components/Context/StoreContext";
import { useNavigate } from "react-router-dom";


const Cart = () => {
    const navigate=useNavigate();
    const { food_list, CartItems, RemoveFromCart,TotalCartPrice } = useContext(StoreContext);
    console.log(CartItems);
    return (
        <div className="flex flex-col gap-y-10">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {food_list.map((food, index) => {
                            if (CartItems[food._id] > 0) {
                                return <tr key={index} className="hover:bg-orange-200  rounded-xl my-2">
                                    <td className="max-w-11"><img src={food.image} className="rounded-xl" alt="" /></td>
                                    <td>{food.name}</td>
                                    <td>{food.price}</td>
                                    <td>{CartItems[food._id]} </td>
                                    <td><button onClick={() => (RemoveFromCart(food._id))} className="btn btn-active btn-ghost">X</button></td>
                                </tr>
                            }
                        })}



                    </tbody>
                </table>
            </div>
            <div className="flex flex-row  justify-between">
                <div className="flex flex-col gap-y-4">
                    <h2 className="text-3xl font-semibold text-center">Card Details</h2>
                    <div className="flex flex-wrap gap-x-5"><h2 className="w-36">Sub Total</h2><h2>{TotalCartPrice()}</h2></div>
                    <div className="flex flex-wrap gap-x-5"><h2 className="w-36">Delivery Charge</h2><h2>{25}</h2></div>
                    <div className="flex flex-wrap gap-x-5"><h2 className="w-36">Total Charge</h2><h2>{25+TotalCartPrice()}</h2></div>
                    <button onClick={()=>navigate('/placeOrder')} className="btn btn-active">Proceed to Payment</button>
                </div>
                <div>
                    <form action="" className="flex flex-row gap-x-1">
                    <input
                        type="text"
                        placeholder="Enter Code"
                        className="input input-bordered input-warning w-full max-w-xs" />
                        <button className="btn btn-active bg-orange-500 text-black">Submit</button>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default Cart;