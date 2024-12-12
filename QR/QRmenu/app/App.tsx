import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "./Screens/LoginScreen";
import MenuScreen from "./Screens/MenuScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import SignUpScreen from "./Screens/SignUp";
import SplashScreen from "./Screens/SplashScreen";
import ChangePasswordScreen from "./Screens/ChangePasswordScreen";
import CartScreen from "./Screens/CartScreen";
import { CartProvider } from "./Screens/CartContext";
import { registerRootComponent } from 'expo';

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

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Menu"
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
};

// Use expo's registerRootComponent to ensure the app works correctly with Expo
registerRootComponent(App);

export default App;
