import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import React from "react";
import { CartProvider } from "./CartContext";
import CartScreen from "./CartScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";
import LogInScreen from "./LoginScreen";
import MenuScreen from "./MenuScreen";
import OrderConfirmationScreen from "./OrderConfirmationScreen";
import ProfileScreen from "./ProfileScreen";
import QRCodeScreen from "./QRCodeScreen";
import SignUpScreen from "./SignUp";
import SplashScreen from "./SplashScreen";

export type RootStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  LogIn: undefined;
  Menu: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  Cart: undefined;
  QRCode: undefined;
  OrderConfirmation: { qrData: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmationScreen}
            options={{ gestureEnabled: false }} // Disable swipe back gesture
          />
          <Stack.Screen
            name="QRCode"
            component={QRCodeScreen}
            options={{ gestureEnabled: false }} // Disable swipe back gesture
          />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ gestureEnabled: false }} // Disable swipe back gesture
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ gestureEnabled: false }} // Disable swipe back gesture
          />
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{ gestureEnabled: false }} // Disable swipe back gesture
          />
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{ gestureEnabled: false }} // Disable swipe back gesture
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ gestureEnabled: false }} // Disable swipe back gesture
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{ gestureEnabled: false }} // Disable swipe back gesture
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ gestureEnabled: false }} // Disable swipe back gesture
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

// Use expo's registerRootComponent to ensure the app works correctly with Expo
registerRootComponent(App);

export default App;
