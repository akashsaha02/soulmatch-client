import Dashboard from "@/layout/Dashboard"
import Main from "@/layout/Main"
import Error from "@/pages/error/Error"
import Home from "@/pages/main/Home"
import Login from "@/pages/main/Login"
import Register from "@/pages/main/Register"
import { createBrowserRouter } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ],

    },
    {
        path:"/dashboard",
        element:<Dashboard/>,
        errorElement:<Error/>,
        children:[
            {
                path:"/dashboard",
                element:
                <PrivateRoute>
                    <p>hello admin</p>
                </PrivateRoute>
            }

        ]

    }
])

