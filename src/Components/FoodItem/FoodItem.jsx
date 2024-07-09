import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../Context/StoreContext";
const FoodItem = ({ food }) => {
    const rating = (<div className="rating">
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            defaultChecked />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
    </div>)
    const {AddToCart,CartItems,RemoveFromCart}=useContext(StoreContext);

    return (
        <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} transition={{ duration: 1 }} className="flex flex-col gap-2 justify-start items-start">
            <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                src={food.image} className="rounded-xl" alt="" />
            <div className="flex flex-wrap gap-x-4 align-middle items-center">
                <img src={assets.remove_icon_red} onClick={() => RemoveFromCart(food._id)} alt="" />
                <h2 className="text-sm font-bold">{CartItems[food._id]}</h2>
                <img src={assets.add_icon_green} onClick={() => AddToCart(food._id) } alt="" />
            </div>
            <h2 className="text-2xl font-semibold text-orange-500 ">{food.name}</h2>
            {rating}
            <p className="font-thin text-black text-sm ">{food.description}</p>
            <h2 className="font-bold text-xl">{food.price}$</h2>
        </motion.div>
    );
};

export default FoodItem;