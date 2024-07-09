import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../Pages/Home/Home";
import Cart from "../../Pages/Cart/Cart";
import PlaceOrder from "../../Pages/PlaceOrder/PlaceOrder";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";


const route =createBrowserRouter([
    {
        path:"/",
        element:<App></App>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/cart",
                element:<Cart></Cart>
            },
            {
                path:"/placeOrder",
                element:<PlaceOrder></PlaceOrder>
            }
        ]
    },
    {
        path:"/login",
        element:<Login></Login>
    },
    {
        path:"/register",
        element:<Register></Register>
    }
])

export default route;