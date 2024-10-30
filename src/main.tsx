import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { RouterProvider } from "react-router-dom"
import router from "./router/index"
/**
 * @description 入口文件
 */

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
