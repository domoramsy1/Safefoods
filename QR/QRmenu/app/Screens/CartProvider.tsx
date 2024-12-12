    import React, { createContext, useContext, useState, ReactNode } from 'react';

    interface CartItem {
    id: number;
    name: string;
    price: number;
    }

    interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    }

    // Define the props type for the provider
    interface CartProviderProps {
    children: ReactNode;
    }

    const CartContext = createContext<CartContextType | undefined>(undefined);

    export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prev: CartItem[]) => [...prev, item]);
    };

    const removeFromCart = (id: number) => {
        setCartItems((prev: CartItem[]) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
        {children}
        </CartContext.Provider>
    );
    };

    export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
    };