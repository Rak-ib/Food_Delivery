import {  useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const FoodDisplay = ({category}) => {
    const {foods,loading,Toast,setToast}=useContext(StoreContext)
    // const [foods, setFoods] = useState([]);
    // const getFoods = async () => {
    //     const result = await axios.get("http://localhost:5000/food/food_list");
    //     console.log("ok");
    //     setFoods(result.data.message);
    // }
    
    // useEffect(()=>{
    //     getFoods();
    // },[])
    
    if(Toast!=="false"){
        toast.info(Toast);
        setToast("false")
    }

    if(loading){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-dots loading-lg"></div>
            </div>
        );
    }

    return (
        <div><ToastContainer></ToastContainer>
            <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-5">
            {foods.map((food,index)=>{
                if(category==="All"||category==food.category)
                return <FoodItem key={index} food={food}></FoodItem>
            })}
        </div>
        </div>
    );
};

export default FoodDisplay;