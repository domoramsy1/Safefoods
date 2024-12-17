        // Define action types
        export const ADD_TO_CART = 'ADD_TO_CART';
        export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

        // Action to add item to cart
        export const addToCart = (item: any) => ({
        type: ADD_TO_CART,
        payload: item,
        });

        // Action to remove item from cart (if needed)
        export const removeFromCart = (id: number) => ({
        type: REMOVE_FROM_CART,
        payload: id,
        });
        export const updateCartItemQuantity = ({ id, quantity }: { id: string, quantity: number }) => {
            return {
            type: "UPDATE_CART_ITEM_QUANTITY",
            payload: { id, quantity }
            };
        };
        