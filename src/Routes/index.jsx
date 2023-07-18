import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const router = createBrowserRouter ([

    {
        path: "/",
        element: <HomeComponent />,
    },

    {
        path: "/login",
        element: <Login />,
    },

    
    {
        path: "/register",
        element: <RegisterComponent />,
    },

    {
        path: "/profile",
        element: <RegisterComponent />,
    },

    {
        path: "/connections",
        element: <RegisterComponent />,
    },


]);