import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const [CartItems, SetCartItems] = useState({});
    const [foods, setFood] = useState([]);
    const [loading,setLoading]=useState(true);
    const [currentUser,setCurrentUser]=useState(null);
    const [Toast,setToast]=useState("false");

    // Load foods
    const getFoods = async () => {
        const result = await axios.get("http://localhost:5000/food/food_list");
        setFood(result.data.message);
    };

    const SignIn=async(user)=>{
        const result= await axios.post("http://localhost:5000/user/login",user,{withCredentials:true});
        console.log("Singin:",result.data.user);
        setCurrentUser(result.data.user.userName);
        return result;
    }


    const SignOut=async()=>{
        try {
            const result=axios.get('http://localhost:5000/user/logout',{withCredentials:true})
            if(result.data.success){
                setCurrentUser(null);
                
            }return "/";
        } catch (error) {
            console.log("logout failed");return "/";
        }

    }



    const AddToCart = async (foodId) => {

        try {
            const result = await axios.post('http://localhost:5000/cart/add', { itemId: foodId }, { withCredentials: true });
            if(result.data.success){
                if(!CartItems[foodId]){
                    SetCartItems((prev)=>({...prev,[foodId]:1}))
                }else{
                    SetCartItems((prev)=>({...prev,[foodId]:prev[foodId]+1}))
                }setToast("false");
            }else{
                setToast(result.data.message);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };



    const RemoveFromCart = async (foodId) => {
        try {
            const result = await axios.post('http://localhost:5000/cart/remove', { itemId: foodId }, { withCredentials: true });
            if(result.data.success){
                if(CartItems[foodId]>0){
                    SetCartItems((prev)=>({...prev,[foodId]:prev[foodId]-1}))
                }
                setToast("false");
            }else{
                setToast(result.data.message);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };



    const getCartData=async()=>{
        try {
            const result = await axios.get('http://localhost:5000/cart/get', { withCredentials: true }); 
            if(result.data.success){
                SetCartItems(result.data.message);
            }else{
                SetCartItems({});  
            }
        } catch (error) {
            console.error('Error getting the CartData:', error);
        }
    }



    const TotalCartPrice = () => {
        let TotalPrice = 0;
        for (const item in CartItems) {
            const food = foods.find(foodItem => foodItem._id === item);
            if (food) {
                TotalPrice += food.price * CartItems[item];
            }
        }
        return TotalPrice;
    };

    const getCurrentUser = async () => {
        try {
            const result = await axios.get('http://localhost:5000/user/currentUser', { withCredentials: true });
            if (result.data.success) {
                setCurrentUser(result.data.user);
            } else {
                setCurrentUser(null);
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
            setCurrentUser(null);
        }
    };

    useEffect(() => {
       const loadData=async()=>{
        // if(currentUser!==null)
        await getCartData();
        await getFoods();
        await getCurrentUser();
        setLoading(false);
       }
       loadData(currentUser)
        
    }, []);



    const store = {
        foods,
        AddToCart,
        loading,
        CartItems,
        SetCartItems,
        getCartData,
        RemoveFromCart,
        TotalCartPrice,
        SignIn,
        SignOut,
        currentUser,
        Toast,setToast,
    };

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
