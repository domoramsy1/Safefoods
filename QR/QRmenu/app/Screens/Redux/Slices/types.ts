    import { StackNavigationProp } from '@react-navigation/stack';

    export interface UserData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    }

    export interface CartItem {
    id: number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    }

    // Define the navigation parameters for your app's stack navigator
    export type RootStackParamList = {
    Cart: undefined;
    OrderConfirmation: { qrData: string };
    };

    // Define the navigation prop for the OrderConfirmation screen
    export type OrderConfirmationNavigationProp = StackNavigationProp<
    RootStackParamList,
    'OrderConfirmation'
    >;
