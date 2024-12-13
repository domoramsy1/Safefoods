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

// Define the Stack Param List for TypeScript
type RootStackParamList = {
  SignUp: undefined;
  LogIn: undefined;
  Menu: undefined;
};

type LogInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LogIn"
>;

const LogInScreen = () => {
  const navigation = useNavigation<LogInScreenNavigationProp>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    if (!username || !password) {
      Alert.alert("Login Failed", "Please fill in all fields.");
      return;
    }

    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const userDataArray = JSON.parse(storedUserData);
        const user = userDataArray.find(
          (user: { username: string; password: string }) =>
            user.username === username && user.password === password
        );

        if (user) {
          Alert.alert("Success", "Login successful!");
          navigation.navigate("Menu");
        } else {
          Alert.alert("Invalid Credentials", "Username or password is incorrect.");
        }
      } else {
        Alert.alert("No Users Found", "No registered users found.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during login.");
    }
  
    // Clear input fields after login attempt
    setUsername("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.fullScreenContainer}>
          {/* Title */}
          <View style={styles.centerContent}>
            <Text style={styles.titleText}>TREStaurant</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Username"
                placeholderTextColor={"#333333"}
                value={username}
                onChangeText={setUsername}
                style={styles.label}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={"#333333"}
                value={password}
                onChangeText={setPassword}
                style={styles.label}
                secureTextEntry
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
                <Text style={styles.logInButtonText}>Log In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
              <Text style={{ color: "black" }}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  scrollViewContainer: {
    flexGrow: 1,
  },
  fullScreenContainer: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    position: "absolute",
    color: "#085A13",
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 50,
    paddingTop: 200,
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 7 },
    textShadowRadius: 3,
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
  logInButton: {
    width: "100%",
    backgroundColor: "#58C7F3",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderColor: "black",
  },
  logInButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "black",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
