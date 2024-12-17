    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    interface ProfileState {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    photo: string;
    }

    const initialState: ProfileState = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    photo: "",
    };

    const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<ProfileState>) => {
        return { ...state, ...action.payload };
        },
        updatePhoto: (state, action: PayloadAction<string>) => {
        state.photo = action.payload;
        },
        resetProfile: () => initialState,
    },
    });

    export const { setProfile, updatePhoto, resetProfile } = profileSlice.actions;
    export default profileSlice.reducer;
