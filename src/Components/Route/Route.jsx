import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../Pages/Home/Home";
import Cart from "../../Pages/Cart/Cart";
import PlaceOrder from "../../Pages/PlaceOrder/PlaceOrder";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import AdminHome from "../../Admin/pages/Admin_home/AdminHome";
import Dashboard from "../../Admin/pages/Dashboard/Dashboard";
import AddFood from "../../Admin/pages/AddFood/AddFood";


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
    },
    {
        path:"/admin",
        element:<AdminHome></AdminHome>,
        children:[
            {
                path:"/admin",
                element:<AddFood></AddFood>
            },
            {
                path:"/admin/add_food",
                element:<AddFood></AddFood>
            }
        ]
    }
])

export default route;