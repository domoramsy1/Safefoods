    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: any;
    }

    interface CartState {
    items: CartItem[];
    }

    const initialState: CartState = {
    items: [],
    };

    const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find((item) => item.id === action.payload.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.items.push({ ...action.payload, quantity: 1 });
        }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateCartItemQuantity: (
        state,
        action: PayloadAction<{ id: number; quantity: number }>
        ) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item && action.payload.quantity > 0) {
            item.quantity = action.payload.quantity;
        }
        },
    },
    });

    export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;
    export default cartSlice.reducer;
