    // src/redux/cartAndUserSlice.ts
    import { createSlice, PayloadAction } from '@reduxjs/toolkit';

    // Cart State and Reducers
    interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    }

    interface CartState {
    cartItems: CartItem[];
    }

    const initialCartState: CartState = {
    cartItems: [],
    };

    const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.cartItems.find(
            (item) => item.id === action.payload.id
        );
        if (existingItem) {
            existingItem.quantity += action.payload.quantity;
        } else {
            state.cartItems.push(action.payload);
        }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
        state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload
        );
        },
        updateCartItemQuantity: (
        state,
        action: PayloadAction<{ id: number; quantity: number }>
        ) => {
        const item = state.cartItems.find((item) => item.id === action.payload.id);
        if (item) {
            item.quantity = action.payload.quantity;
        }
        },
        clearCart: (state) => {
        state.cartItems = [];
        },
    },
    });

    // User State and Reducers
    interface UserState {
    firstName: string;
    lastName: string;
    }

    const initialUserState: UserState = {
    firstName: '',
    lastName: '',
    };

    const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state, action: PayloadAction<{ firstName: string; lastName: string }>) {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        },
    },
    });

    // Export actions and reducer
    export const {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    } = cartSlice.actions;

    export const { setUser } = userSlice.actions;

    // Export combined reducer
    const rootReducer = {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    };

    export default rootReducer;
