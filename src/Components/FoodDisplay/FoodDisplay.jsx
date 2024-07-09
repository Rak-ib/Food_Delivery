import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";


const FoodDisplay = ({category}) => {
    const {food_list}=useContext(StoreContext);
    console.log(food_list);
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-5">
            {food_list.map((food,index)=>{
                if(category==="All"||category==food.category)
                return <FoodItem key={index} food={food}></FoodItem>
            })}
        </div>
    );
};

export default FoodDisplay;