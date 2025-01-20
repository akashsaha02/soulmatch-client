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
import ManageBiodata from "@/pages/dashboard/user/ManageBiodata"
import MyContactRequests from "@/pages/dashboard/user/MyContactRequests"
import MyFavourites from "@/pages/dashboard/user/MyFavourites"
import UserHome from "@/pages/dashboard/user/UserHome"
import AllBiodatas from "@/pages/main/AllBiodatas"
import BiodataDetails from "@/pages/main/BiodataDetails"
import ApprovePremium from "@/pages/dashboard/admin/ApprovePremium"
import ApproveContact from "@/pages/dashboard/admin/ApproveContact"
import Checkout from "@/pages/main/Checkout"
import GotMarried from "@/pages/dashboard/user/GotMarried"
import AdminSuccessStory from "@/pages/dashboard/admin/SuccessStory"
import Contact from "@/pages/main/Contact"
import About from "@/pages/main/About"

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
                path: "/biodatas",
                element: <AllBiodatas />
            },
            {
                path: "/biodatas/:id",
                element: <BiodataDetails />,

            },
            {
                path: "/checkout/:id",
                element: <Checkout />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/about",
                element: <About />
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
                        <UserHome />
                    </PrivateRoute>
            },
            {
                path: "/dashboard/manage-biodata",
                element:
                    <PrivateRoute>
                        <ManageBiodata />
                    </PrivateRoute>,
            },
            {
                path: "/dashboard/my-contact-requests",
                element: <PrivateRoute>
                    <MyContactRequests />
                </PrivateRoute>
            },
            {
                path: "/dashboard/my-favourites",
                element: <PrivateRoute>
                    <MyFavourites />
                </PrivateRoute>
            },
            {
                path: "/dashboard/got-married",
                element: <PrivateRoute>
                    <GotMarried />
                </PrivateRoute>
            }

            // Admin Routes
            , {
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
            },
            {
                path: "/dashboard/approve-premium",
                element: <AdminRoute>
                    <ApprovePremium />
                </AdminRoute>
            },
            {
                path: "/dashboard/approve-contact-requests",
                element: <AdminRoute>
                    <ApproveContact />
                </AdminRoute>
            }, {
                path: "/dashboard/success-stories",
                element: <AdminRoute>
                    <AdminSuccessStory />
                </AdminRoute>
            }

        ]

    }
])

