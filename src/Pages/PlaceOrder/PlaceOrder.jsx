import { useContext } from "react";
import { StoreContext } from "../../Components/Context/StoreContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const PlaceOrder = () => {
    const {TotalCartPrice,foods,loading,CartItems}=useContext(StoreContext);

    if(loading){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-dots loading-lg"></div>
            </div>
        );
    }

    const handleOrder=async(e)=>{
        e.preventDefault();
        const firstName=e.target.firstName.value;
        const lastName=e.target.lastName.value;
        const email=e.target.email.value;
        const street=e.target.street.value;
        const city=e.target.city.value;
        const zipCode=e.target.zipCode.value;
        const mobile=e.target.mobile.value;
        const address={firstName,lastName,email,street,zipCode,city,mobile}
        console.log(address);
        let orderItems=[]
        foods.map((food)=>{
            if(CartItems[food._id]&&CartItems[food._id]>0){
                let item=food;
                item["quantity"]=CartItems[food._id];
                orderItems.push(item)
            }
        })
        if(TotalCartPrice()>0){
            const result=await axios.post('http://localhost:5000/order/placeOrder',{address,items:orderItems,amount:TotalCartPrice()+5},{withCredentials:true})
        // console.log();
        console.log("from place order:", result);
        if(result.data.success){
            const {session_url}=result.data;
            window.location.replace(session_url)
        }
        }else{
            toast.info("Please select Items")
        }
        

    }

    return (
        <form action="" onSubmit={handleOrder}><ToastContainer></ToastContainer>
        <div className="flex flex-row my-[15vh] gap-2">
            
            <div className="w-1/2 items-start  border-r-2 border-orange-500">
                <h2 className="text-left font-semibold text-3xl text-orange-500 pb-5">Enter Your Details</h2>
                <div action="" className="flex flex-col gap-3" >
                    <div className="flex flex-row gap-3" >
                        <input required type="text" name="firstName" placeholder="First name" className="input input-bordered input-error w-1/3" id="" />
                        <input required type="text" name="lastName" placeholder="Last name" className="input input-bordered input-error w-1/3" id="" />

                    </div>
                    <div>
                        <input required type="email" name="email" placeholder="@Email.com" className="input input-bordered input-error w-2/3"  id="" />
                    </div>
                    <div>
                        <input required type="text" name="street" placeholder="Street" className="input input-bordered input-error w-2/3"  id="" />
                    </div>
                    <div className="flex flex-row gap-3" >
                        <input required type="text" name="city" placeholder="City" className="input input-bordered input-error w-1/3" id="" />
                        <input required type="text" name="zipCode" placeholder="Zip code" className="input input-bordered input-error w-1/3" id="" />

                    </div>
                    <div>
                        <input required type="text" name="mobile" placeholder="Mobile Number" className="input input-bordered input-error w-2/3"  id="" />
                    </div>

                </div>
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
        </form>
    );
};

export default PlaceOrder;