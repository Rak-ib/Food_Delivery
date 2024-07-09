import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/frontend_assets/assets";
export const StoreContext=createContext(null);
const StoreContextProvider = ({children}) => {

    const [CartItems,SetCartItems]=useState({});
    
    const AddToCart=(item_id)=>{
        console.log(item_id);
        console.log("ok",CartItems[item_id]);
        if(CartItems[item_id]==undefined){
            SetCartItems((prev)=>({...prev,[item_id]:1}))
        }
        else{
            SetCartItems({...CartItems,[item_id]:CartItems[item_id]+1})
        }
    }
    const RemoveFromCart=(item_id)=>{
        if(CartItems[item_id]>0)
        SetCartItems({...CartItems,[item_id]:CartItems[item_id]-1})
    }
    const TotalCartPrice=()=>{
        var TotalPrice=0;
        for (const item in CartItems) {
            const food=food_list.find(food=>food._id===item);
            TotalPrice=TotalPrice + food.price* CartItems[item];
        }
        return TotalPrice;
        
    }
    useEffect(()=>{
        console.log(CartItems);
    },[CartItems])

    const store={
        food_list,
        AddToCart,
        CartItems,
        SetCartItems,
        RemoveFromCart,
        TotalCartPrice
    }
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;