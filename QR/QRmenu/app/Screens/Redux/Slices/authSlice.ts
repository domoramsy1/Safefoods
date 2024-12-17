    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    interface AuthState {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    confirmPassword: string;
    isAuthenticated: boolean;
    }

    const initialState: AuthState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmPassword: "",
    isAuthenticated: false,
    };

    const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
        state.password = action.payload;
        },
        setFirstName: (state, action: PayloadAction<string>) => {
        state.firstName = action.payload;
        },
        setLastName: (state, action: PayloadAction<string>) => {
        state.lastName = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
        state.email = action.payload;
        },
        setConfirmPassword: (state, action: PayloadAction<string>) => {
        state.confirmPassword = action.payload;
        },
        setAuthentication: (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
        },
        clearCredentials: (state) => {
        state.username = "";
        state.password = "";
        state.firstName = "";
        state.lastName = "";
        state.email = "";
        state.confirmPassword = "";
        state.isAuthenticated = false;
        },
    },
    });

    export const {
    setUsername,
    setPassword,
    setFirstName,
    setLastName,
    setEmail,
    setConfirmPassword,
    setAuthentication,
    clearCredentials,
    } = authSlice.actions;

    export default authSlice.reducer;
