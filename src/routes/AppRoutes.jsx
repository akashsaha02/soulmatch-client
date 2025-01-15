import Dashboard from "@/layout/Dashboard"
import Main from "@/layout/Main"
import Error from "@/pages/error/Error"
import Home from "@/pages/main/Home"
import Login from "@/pages/main/Login"
import Register from "@/pages/main/Register"
import { createBrowserRouter } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import AllUsers from "@/pages/dashboard/admin/AllUsers"
import AdminRoute from "./AdminRoute"


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
            },
            {
                // path:"/biodatas",
            }
        ],

    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <Error />,
        children: [
            {
                path: "/dashboard/user-home",
                element:
                    <PrivateRoute>
                        <p>hello user</p>
                    </PrivateRoute>
            },
            {
                path: "/dashboard/edit-biodata",
                element:
                    <PrivateRoute>
                        <p>Edit biodata</p>
                    </PrivateRoute>,
            }

            // Admin Routes
            ,  {
                path: "/dashboard/admin-home",
                element:
                    <PrivateRoute>
                        <p>hello admin</p>
                    </PrivateRoute>
            }, 
            
            {
                path: "/dashboard/users",
                element: <AdminRoute>
                    <AllUsers />
                </AdminRoute>
            }

        ]

    }
])

