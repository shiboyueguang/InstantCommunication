import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * token存储
 */

interface LoginState {
    token: string | null;
    success: boolean
}

const initialState: LoginState = {
    token: '',
    success: false
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setSuccess: (state, action: PayloadAction<boolean>) => {
            state.success = action.payload
        }
    },
});

export const { setToken, setSuccess } = loginSlice.actions;

export default loginSlice.reducer;