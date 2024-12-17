    // redux/store.ts
    import { configureStore } from "@reduxjs/toolkit";
    import authReducer from "./Slices/authSlice";
    import cartReducer from "./Slices/cartSlice";
    import passwordReducer from './Slices/passwordSlice';
    import menuReducer from './Slices/menuSlice';
    import userReducer from './Slices/userSlice';

    export const store = configureStore({
    reducer: {
        auth: authReducer,
        password: passwordReducer,
        cart: cartReducer,
        menu:menuReducer,
        user: userReducer,
    },
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;
