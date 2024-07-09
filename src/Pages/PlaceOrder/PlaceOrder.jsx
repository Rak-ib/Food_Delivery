import { useContext } from "react";
import { StoreContext } from "../../Components/Context/StoreContext";


const PlaceOrder = () => {
    const {TotalCartPrice}=useContext(StoreContext);
    return (
        <div className="flex flex-row my-[15vh] gap-2">
            <div className="w-1/2 items-start  border-r-2 border-orange-500">
                <h2 className="text-left font-semibold text-3xl text-orange-500 pb-5">Enter Your Details</h2>
                <form action="" className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3" >
                        <input type="text" name="" placeholder="First name" className="input input-bordered input-error w-1/3" id="" />
                        <input type="text" name="" placeholder="Last name" className="input input-bordered input-error w-1/3" id="" />

                    </div>
                    <div>
                        <input type="email" name="" placeholder="@Email.com" className="input input-bordered input-error w-2/3"  id="" />
                    </div>
                    <div>
                        <input type="text" name="" placeholder="Street" className="input input-bordered input-error w-2/3"  id="" />
                    </div>
                    <div className="flex flex-row gap-3" >
                        <input type="text" name="" placeholder="City" className="input input-bordered input-error w-1/3" id="" />
                        <input type="text" name="" placeholder="Zip code" className="input input-bordered input-error w-1/3" id="" />

                    </div>
                    <div>
                        <input type="text" name="" placeholder="Mobile Number" className="input input-bordered input-error w-2/3"  id="" />
                    </div>

                </form>
            </div>
            <div className="w-1/2 items-start ">
            <div className="flex flex-col gap-y-4 ">
                    <h2 className="text-3xl font-semibold text-center text-orange-500">Card Details</h2>
                    <div className="flex flex-wrap gap-x-5 justify-between border-b-2 border-gray-300"><h2 className="w-36">Sub Total</h2><h2>{TotalCartPrice()}</h2></div>
                    <div className="flex flex-wrap gap-x-5 border-b-2 justify-between border-gray-300"><h2 className="w-36">Delivery Charge</h2><h2>{25}</h2></div>
                    <div className="flex flex-wrap gap-x-5 border-b-2 justify-between border-gray-300"><h2 className="w-36">Total Charge</h2><h2>{25+TotalCartPrice()}</h2></div>
                    <button  className="btn btn-active bg-orange-500 hover:bg-orange-500">Proceed to Payment</button>
                </div>
            </div>

        </div>
    );
};

export default PlaceOrder;