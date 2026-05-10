import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoutes from "./privateRoutes";
import SendParcel from "../pages/sendParcel/SendParcel";


 const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'service',
                element:<PrivateRoutes>
                    <Services></Services>
                    </PrivateRoutes>
            },
            {
                path:'sendparcel',
                loader:()=> fetch('/region.json').then(res => res.json()) ,
                element:<SendParcel></SendParcel>
            }
        ]
    },
    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
                path:'login',
                Component:Login
            },
            {
                path:'register',
                Component:Register

            }
        ]
    }
])

export default router