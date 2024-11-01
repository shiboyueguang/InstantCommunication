import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './counter/loginSlice';

/**
 * @description redux仓库入口文件
 */

export const store = configureStore({
    reducer: {
        login: loginReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;