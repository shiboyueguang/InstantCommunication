import { createBrowserRouter } from "react-router-dom"
import App from "../App";
import React from "react";
import NotFound from "../components/NotFound/NotFound";
import Login from "../components/login/login";
import MainInterface from "../components/mainInterface/mainInterface";

/**
 * @description 路由配置
 */

const router = createBrowserRouter([
    {
        path: '/',
        element: <App>
            <MainInterface />
        </App>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;