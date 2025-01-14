import Main from "@/layout/Main"
import Error from "@/pages/error/Error"
import Home from "@/pages/main/Home"
import { createBrowserRouter } from "react-router-dom"


export const router = createBrowserRouter([{

    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
        {
            path: "/",
            element: <Home />
        },
    ],

}])

