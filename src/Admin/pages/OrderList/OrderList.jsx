import axios from "axios";
import { useEffect, useState } from "react";
import { assets } from "../../../assets/admin_assets/assets";
const OrderList = () => {

    const [orders, setOrders] = useState([])

    const myOrders = async () => {
        const result = await axios.get('http://localhost:5000/order/orderList')
        console.log(result.data.orders);
        if (result.data.success)
            setOrders(result.data.orders);
    }
    useEffect(() => {
        myOrders();
    }, [])

    if (!orders || orders.length === 0) {
        return (
            <div className="text-xl text-center items-center mt-10 mx-auto">
                <h2 className="text-2xl">No Order Yet</h2>


            </div>
        )
    }


    return (
        <div className="flex flex-col mt-16 border-orange-300 pt-4 border-t-2">
            {
                orders.map((order, index) => {
                    return (
                        <div key={index} className="flex flex-row gap-10 pb-6 pt-4 border-b-2 border-orange-300 w-full justify-between">
                            <img src={assets.parcel_icon} alt="" />
                            <h2>
                                {order.items.map((item, indx) => {
                                    if (indx !== order.items.length) return item.name + "->" + item.quantity + "  "
                                })}
                            </h2>
                            <h2>Date:{order.date}</h2>
                            <select className="select select-secondary ">
                                <option >Pick your favorite language</option>
                                <option>Java</option>
                                <option>Go</option>
                                <option>C</option>
                                <option>C#</option>
                                <option>C++</option>
                                <option>Rust</option>
                                <option>JavaScript</option>
                                <option>Python</option>
                            </select>
                        </div>
                    )
                })
            }

        </div>
    );
};

export default OrderList;