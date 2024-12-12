import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

// Define the Stack Param List for TypeScript
type RootStackParamList = {
  SignUp: undefined;
  LogIn: undefined;
  Menu: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList,"SignUp">;

const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Define an interface for user data
  interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string; // Consider storing hashed passwords instead of plain text for security
  }

  const saveUserData = async (userData: UserData) => {
    try {
      // Fetch existing user data
      const storedUserData = await AsyncStorage.getItem("userData");

      // Initialize userDataArray properly
      let userDataArray: UserData[] = [];

      // Check if storedUserData exists
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);

        // Check if parsedData is an array
        if (Array.isArray(parsedData)) {
          userDataArray = parsedData;
        } else {
          console.warn(
            "Stored user data is not an array. Reinitializing as an empty array."
          );
          // Reset to an empty array if the stored data is not an array
        }
      }

      // Append new user data
      userDataArray.push(userData);

      // Store the updated array back to AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(userDataArray));
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  // Validate email format to end with @gmail.com or @gmail.com.ph
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@gmail\.com(\.ph)?$/; // Updated regex to check for the specific domains
    return emailRegex.test(email);
  };

  // Validate password format
  const isValidPassword = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  const handleSignUp = async () => {
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !username || !password) {
      Alert.alert("Registration Failed", "Please fill in all fields.");
      return;
    }

    // Validate email
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long, contain uppercase and lowercase letters, and include a number."
      );
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const userData: UserData = {
        firstName,
        lastName,
        email,
        username,
        password,
      };
      await saveUserData(userData); // Call the new saveUserData function
      Alert.alert("Success", "Registration successful!");
      navigation.navigate("Menu");
    } catch (error) {
      Alert.alert("Error", "There was an error saving your data.");
    }

    // Clear fields after successful sign-up
    setFirstName("");
    setLastName("");
    setEmail("");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.select({ ios: "padding", android: "height" })}
  >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Animated.View style={styles.fullScreenContainer}>
          {/* Title */}
          <View style={styles.centerContent}>
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              style={styles.titleText}
            >
              TREStaurant{" "}
            </Animated.Text>
          </View>

          {/* Form */}
          <Animated.View style={styles.formContainer}>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              style={styles.inputContainer}
            >
              <TextInput
                placeholder="First Name"
                placeholderTextColor={"#333333"}
                value={firstName}
                onChangeText={setFirstName}
                style={styles.label}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(250).duration(1000).springify()}
              style={styles.inputContainer}
            >
              <TextInput
                placeholder="Last Name"
                placeholderTextColor={"#333333"}
                value={lastName}
                onChangeText={setLastName}
                style={styles.label}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(300).duration(1000).springify()}
              style={styles.inputContainer}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor={"#333333"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.label}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(350).duration(1000).springify()}
              style={styles.inputContainer}
            >
              <TextInput
                placeholder="Username"
                placeholderTextColor={"#333333"}
                value={username}
                keyboardType="email-address"
                onChangeText={setUserName}
                style={styles.label}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              style={styles.inputContainer}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor={"#333333"}
                value={password}
                onChangeText={setPassword}
                style={styles.label}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(450).duration(1000).springify()}
              style={styles.inputContainer}
            >
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor={"#333333"}
                style={styles.label}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(500).duration(1000).springify()}
              style={styles.buttonContainer}
            >
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
              >
                <Text style={styles.SignUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(550).duration(1000).springify()}
              style={styles.signUpContainer}
            >
              <Text style={{ color: "black" }}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                <Text style={styles.LogInText}>Log In</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  fullScreenContainer: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
  },
  centerItems: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    marginLeft: 80,
    marginRight: 80,
  },
  formContainer: {
    paddingBottom: 90,
    paddingTop: 160,
    marginHorizontal: 16,
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    padding: 3,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
  },
  label: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonContainer: {
    width: "70%",
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#58C7F3",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderColor: "black",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  LogInText: {
    color: "black",
    fontWeight: "bold",
    marginLeft: 4,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  SignUpButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  titleText: {
    position: "absolute",
    color: "#085A13",
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 50,
    paddingTop: 200,
    paddingBottom: 0,
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 7 },
    textShadowRadius: 3,
  },
});
