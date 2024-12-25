import axios from "axios";
import { useEffect, useState } from "react";

const UserOrder = () => {
    const [orders, setOrders] = useState([])
    const myOrders = async () => {
        const result = await axios.get('http://localhost:5000/order/userOrder', { withCredentials: true })
        console.log(result.data.order);
        if (result.data.success)
            setOrders(result.data.order);
    }
    useEffect(() => {
        myOrders();
    }, [])


    if (orders.length === 0) {
        return (
            <div className="text-xl text-center items-center mt-10 mx-auto">
                <h2 className="text-2xl">Wait!</h2>

            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="flex flex-row justify-between ">
                        <th className="w-[5vw]">Order no</th>
                        <th className="min-w-[30vw]" >Items</th>
                        <th className="w-[15vw] text-center" >status</th>
                        <th className="w-[15vw] text-center">Check status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        orders.map((order, index) => {
                            return (
                                <tr className="flex flex-row justify-between" key={index}>
                                    <th className="w-[5vw]">{index+1}</th>
                                    <td className="min-w-[30vw]">{order.items.map((item,indx)=>{
                                        if(indx!==order.items.length-1)return item.name+"s("+item.quantity+")  "
                                    })}</td>
                                    <td className="w-[15vw] text-center">{order.status}</td>
                                    <td className="w-[15vw] text-center"><button className="btn btn-ghost">check status</button></td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>
        </div>
    );
};

export default UserOrder;