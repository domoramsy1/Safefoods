import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

// Define the Root Stack Param List
type RootStackParamList = {
  Profile: undefined; // Replace with your actual screen names
  Menu: undefined;
  LogIn: undefined;
  SignUp: undefined;
  Splash: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const checkRegistration = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        // User is registered, navigate to Menu screen
        navigation.replace("Menu");
      } else {
        // User is not registered, navigate to SignUp screen
        navigation.replace("SignUp");
      }
    };

    checkRegistration();
  }, [navigation]);

  // Return a valid JSX element
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Adjust to a valid color
  },
  image: {
    width: "80%", // Adjust width as needed
    height: "40%", // Adjust height as needed
    marginBottom: 20, // Space between image and loading indicator
  },
});

export default SplashScreen;
