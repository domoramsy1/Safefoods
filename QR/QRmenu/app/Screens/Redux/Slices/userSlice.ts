    import { createSlice, PayloadAction } from '@reduxjs/toolkit';

    interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    }

    interface UserState {
    user: UserData | null;
    }

    const initialState: UserState = {
    user: null,
    };

    const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>) => {
        state.user = action.payload;
        },
    },
    });

    export const { setUserData } = userSlice.actions;
    export default userSlice.reducer;
