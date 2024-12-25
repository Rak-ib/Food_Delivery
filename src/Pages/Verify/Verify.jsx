import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


const Verify = () => {
    const [searchParams,setParams]=useSearchParams();
    const navigate=useNavigate()
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const verifyPayment=async()=>{
        const result= await axios.post('http://localhost:5000/order/verify',{success,orderId})
        console.log("verify",result);
        if(result.data.success){
            navigate("/userOrder")
        }else{
            navigate('/cart')
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])


    return (
        <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-dots loading-lg"></div>
            </div>
    );
};

export default Verify;