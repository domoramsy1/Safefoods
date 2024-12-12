import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

// Define the Stack Param List for TypeScript
type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  Menu: undefined;
};

type LogInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LogIn"
>;

const LogInScreen = () => {
  const navigation = useNavigation<LogInScreenNavigationProp>();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");

      // Ensure storedUserData is valid and parse it
      const userDataArray = storedUserData ? JSON.parse(storedUserData) : null;

      // Log to see what we have
      console.log("Username:", username, "Password:", password);
      console.log("Stored User Data:", userDataArray);

      // // Check if userDataArray is an array
      // if (!Array.isArray(userDataArray)) {
      //     throw new Error("User data is not an array");
      // }

      // Find user by username and password
      const user = userDataArray.find(
        (user: any) =>
          (user.email === username || user.username === username) &&
          user.password === password
      );

      if (user) {
        Alert.alert("Success", "Logged in successfully.");
        navigation.navigate("Menu");
        // Reset the input fields after a failed attempt
        setUserName("");
        setPassword("");
      } else {
        Alert.alert("Error", "Invalid username or password.");
        // Reset the input fields after a failed attempt
        setUserName("");
        setPassword("");
      }
    } catch (error: unknown) {
      // Specify the type as unknown
      // Type assertion to Error to access message property
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load user data.";
      console.error(error);
      Alert.alert("Error", errorMessage);
      // Reset the input fields after a failed attempt
      setUserName("");
      setPassword("");
    }
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.select({ ios: "padding", android: "height" })}
  >
     <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
      <View>
        <Animated.View style={styles.fullScreenContainer}>
          {/* Title */}
          <View style={styles.centerContent}>
            <Animated.Text
              entering={FadeInUp.duration(2000).springify()}
              style={styles.titleText}
            >
              TREStaurant{" "}
            </Animated.Text>
          </View>

          {/* Form */}
          <Animated.View style={styles.formContainer}>
            <Animated.View
              entering={FadeInDown.delay(200).duration(2000).springify()}
              style={styles.inputContainer}
            >
              <TextInput 
                style={styles.label}
                placeholder="UserName"
                value={username}
                onChangeText={setUserName}
                keyboardType="email-address"
                placeholderTextColor={"#333333"}
                
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(300).duration(2000).springify()}
              style={styles.inputContainer}
            >
              <TextInput 
                style={styles.label}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                keyboardType="email-address"
                placeholderTextColor={"#333333"}
                />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(400).duration(2000).springify()}
              style={styles.buttonContainer}
            >
              <TouchableOpacity
                style={styles.LogInButton}
                onPress={handleLogIn}
              >
                <Text style={styles.LogInButtonText}>Log In</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(500).duration(2000).springify()}
              style={styles.signUpContainer}
            >
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  label: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },

  scrollViewContainer: {
    flexGrow: 1,
  },
  fullScreenContainer: {
    backgroundColor: "#FFFFFF",
    height: "200%",
    width: "100%",
    position: "relative",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    position: "absolute",
    top: 200,
    color: "#085A13",
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 50,
    paddingTop: 20,
    paddingBottom: 70,
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 7 },
    textShadowRadius: 3,
  },
  formContainer: {
    paddingBottom: 150,
    marginHorizontal: 16,
    alignItems: "center",
  
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    padding: 9,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
    borderColor: "black",
  },
  textInput: {
    width: "100%",
  },
  buttonContainer: {
    width: "70%",
  },
  LogInButton: {
    width: "100%",
    backgroundColor: "#58C7F3",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  LogInButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: "Black",
    fontWeight: "bold",
    paddingLeft: 8,
  },
  scrollView: {
    flexGrow: 1,
  },
});
