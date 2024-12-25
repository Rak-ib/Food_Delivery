import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const FoodList = () => {
    const [food, setFood] = useState([]);

    const getFoods = async () => {
        const result = await axios.get("http://localhost:5000/food/food_list");
        setFood(result.data);
    }
    
    const removeFoodItem=async(foodId)=>{
        const result=await axios.delete(`http://localhost:5000/food/remove/${foodId}`)
        // console.log(result.data);
        await getFoods();
        if(result.data.success){
            toast.success(result.data.message)
        }else{
            toast.error(result.data.message);
        }
        
    }

    useEffect(() => {
        getFoods();
    }, []);

    if (!food) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className=" h-full p-6 bg-white rounded-lg shadow-lg"><ToastContainer></ToastContainer>
                <table className="" >
                    {/* head */}
                    <thead >
                        <tr className="lg:w-[75vw] mx-auto flex flex-row justify-between ">
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {food.map((foodItem, index) => {
                            
                                return <tr key={index} className="hover:bg-orange-200  rounded-xl my-6 items-center flex flex-row justify-between">
                                    <td className="max-w-11"><img src={foodItem.image} className="rounded-xl w-36" alt="" /></td>
                                    <td>{foodItem.name}</td>
                                    <td>{foodItem.category}</td>
                                    <td>{foodItem.price} </td>
                                    <td><button onClick={() => (removeFoodItem(foodItem._id))}
                                     className="btn btn-active btn-ghost">X</button></td>
                                </tr> 
                        })}
                    </tbody>
                </table>
        </div>
    );
};

export default FoodList;
