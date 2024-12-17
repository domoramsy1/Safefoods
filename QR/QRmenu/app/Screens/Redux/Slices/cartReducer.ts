    // Define action types
    export const ADD_TO_CART = "ADD_TO_CART";
    export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

    // Define initial state
    interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    }

    interface CartState {
    items: CartItem[];
    }

    const initialState: CartState = {
    items: [],
    };

    // Reducer function
    export const cartReducer = (state = initialState, action: any): CartState => {
    switch (action.type) {
        case ADD_TO_CART:
        // Check if the item already exists in the cart
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
            // Increment quantity if item exists
            return {
            ...state,
            items: state.items.map(item =>
                item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            };
        }
        // Add new item if it doesn't exist
        return {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }],
        };

        case REMOVE_FROM_CART:
        // Remove item by filtering it out
        return {
            ...state,
            items: state.items.filter(item => item.id !== action.payload),
        };

        default:
        return state;
    }
    };
