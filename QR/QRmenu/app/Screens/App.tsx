import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "./app/Screens/LoginScreen";
import MenuScreen from "./app/Screens/MenuScreen";
import ProfileScreen from "./app/Screens/ProfileScreen";
import SignUpScreen from "./app/Screens/SignUp";
import SplashScreen from "./app/Screens/SplashScreen";
import ChangePasswordScreen from "./app/Screens/ChangePasswordScreen";
import CartScreen from "./app/Screens/CartScreen";
import { CartProvider } from "./app/Screens/CartContext";

export type RootStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  LogIn: undefined;
  Menu: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
