import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom"
import router from "./router/index"
import {store} from "./store";
/**
 * @description 入口文件
 */

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
)
