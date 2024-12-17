    // redux/Slices/menuSlice.ts
    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    interface MenuState {
    items: string[]; // Modify this based on your menu structure, e.g., an array of item objects
    }

    const initialState: MenuState = {
    items: [], // Initial empty array or modify as needed
    };

    const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenuItems: (state, action: PayloadAction<string[]>) => {
        state.items = action.payload;
        },
        addMenuItem: (state, action: PayloadAction<string>) => {
        state.items.push(action.payload);
        },
        removeMenuItem: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item !== action.payload);
        },
    },
    });

    export const { setMenuItems, addMenuItem, removeMenuItem } = menuSlice.actions;
    export default menuSlice.reducer;
