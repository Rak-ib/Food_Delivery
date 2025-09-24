// import { createBrowserRouter } from "react-router-dom";
// import App from "../../App";
// import Home from "../../Pages/Home/Home";
// import Cart from "../../Pages/Cart/Cart";
// import PlaceOrder from "../../Pages/PlaceOrder/PlaceOrder";
// import Login from "../../Pages/Login/Login";
// import Register from "../../Pages/Register/Register";
// import AdminHome from "../../Admin/pages/Admin_home/AdminHome";
// // import Dashboard from "../../Admin/pages/Dashboard/Dashboard";
// import AddFood from "../../Admin/pages/AddFood/AddFood";
// import FoodList from "../../Admin/pages/FoodList/FoodList";
// import Dashboard from "../../Admin/pages/Dashboard/Dashboard";
// import Verify from "../../Pages/Verify/Verify";
// import UserOrder from "../../Pages/UserOrder/UserOrder";
// import OrderList from "../../Admin/pages/OrderList/OrderList";
// import AdminRoute from "./AdminRoute";
// import PaymentCallback from "../../Pages/PaymentCallback/PaymentCallback";


// const route =createBrowserRouter([
//     {
//         path:"/",
//         element:<App></App>,
//         children:[
//             {
//                 path:"/",
//                 element:<Home></Home>
//             },
//             {
//                 path:"/cart",
//                 element:<Cart></Cart>
//             },
//             {
//                 path:"/placeOrder",
//                 element:<PlaceOrder></PlaceOrder>
//             },
//             {
//                 path:"/payment/callback",
//                 element:<PaymentCallback></PaymentCallback>
//             },
//             {
//                 path:"/login",
//                 element:<Login></Login>
//             },
//             {
//                 path:"/register",
//                 element:<Register></Register>
//             },
//             {
//                 path:"/verify",
//                 element:<Verify></Verify>
//             },
//             {
//                 path:'/userOrder',
//                 element:<UserOrder></UserOrder>
//             }
//         ]
//     },
//     {
//         path:"/admin",
//         element: <AdminRoute> <AdminHome></AdminHome> </AdminRoute>,
//         children:[
//             {
//                 path:"/admin",
//                 element:<Dashboard ></Dashboard>
//             },
//             {
//                 path:"/admin/add_food",
//                 element:<AddFood></AddFood>
//             },
//             {
//                 path:"/admin/food_list",
//                 element:<FoodList></FoodList>
//             },
//             {
//                 path:"/admin/order_list",
//                 element:<OrderList></OrderList>
//             }
//         ]
//     }
// ])

// export default route;




import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../Pages/Home/Home";
import Cart from "../../Pages/Cart/Cart";
import PlaceOrder from "../../Pages/PlaceOrder/PlaceOrder";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import AdminHome from "../../Admin/pages/Admin_home/AdminHome";
import AddFood from "../../Admin/pages/AddFood/AddFood";
import FoodList from "../../Admin/pages/FoodList/FoodList";
import Dashboard from "../../Admin/pages/Dashboard/Dashboard";
import Verify from "../../Pages/Verify/Verify";
// import UserOrder from "../../Pages/UserOrder/UserOrder";
import OrderList from "../../Admin/pages/OrderList/OrderList";
import AdminRoute from "./AdminRoute";
import PaymentSuccess from "../../Pages/PaymentSuccess/PaymentSuccess";
import { PaymentCancel, PaymentFail } from "../../Pages/PaymentFail/PaymentFail";
import UserOrder from "../../Pages/UserOrder/UserOrder";
import AdminAnalytics from "../../Admin/pages/AdminAnalytics/AdminAnalytics";

// Import payment components
// import PaymentSuccess from "../../Pages/Payment/PaymentSuccess";
// import { PaymentFail, PaymentCancel } from "../../Pages/Payment/PaymentFailCancel";

const route = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/cart",
                element: <Cart></Cart>
            },
            {
                path: "/placeOrder",
                element: <PlaceOrder></PlaceOrder>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/verify",
                element: <Verify></Verify>
            },
            {
                path: '/userOrder',
                element: <UserOrder></UserOrder>
            },
            // SSLCommerz Payment Routes
            {
                path: "/payment/success",
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: "/payment/fail",
                element: <PaymentFail></PaymentFail>
            },
            {
                path: "/payment/cancel",
                element: <PaymentCancel></PaymentCancel>
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminRoute> <AdminHome></AdminHome> </AdminRoute>,
        children: [
            {
                path: "/admin",
                element: <Dashboard></Dashboard>
            },
            {
                path: "/admin/add_food",
                element: <AddFood></AddFood>
            },
            {
                path: "/admin/food_list",
                element: <FoodList></FoodList>
            },
            {
                path: "/admin/order_list",
                element: <OrderList></OrderList>
            },
            {
                path: "/admin/analytics",
                element: <AdminAnalytics></AdminAnalytics>
            },
        ]
    }
]);

export default route;