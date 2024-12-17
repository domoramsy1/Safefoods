    import { createSlice } from '@reduxjs/toolkit';

    const initialState = {
    passwordVisible: false,
    };

    const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        togglePasswordVisibility: (state) => {
        state.passwordVisible = !state.passwordVisible;
        },
    },
    });

    export const { togglePasswordVisibility } = passwordSlice.actions;
    export default passwordSlice.reducer;
