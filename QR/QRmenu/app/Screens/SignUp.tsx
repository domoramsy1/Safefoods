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
  import Icon from "react-native-vector-icons/Feather"; // Import the eye icon

  // Define the Stack Param List for TypeScript
  type RootStackParamList = {
    SignUp: undefined;
    LogIn: undefined;
    Menu: undefined;
  };

  type SignUpScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "SignUp"
  >;

  const SignUpScreen = () => {
    const navigation = useNavigation<SignUpScreenNavigationProp>();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // State to control password visibility

    // Define an interface for user data
    interface UserData {
      firstname: string;
      lastname: string;
      email: string;
      username: string;
      password: string; // Consider storing hashed passwords instead of plain text for security
    }

    const saveUserData = async (userData: UserData) => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        let userDataArray: UserData[] = [];
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          if (Array.isArray(parsedData)) {
            userDataArray = parsedData;
          } else {
            console.warn("Stored user data is not an array. Reinitializing.");
          }
        }
        userDataArray.push(userData);
        await AsyncStorage.setItem("userData", JSON.stringify(userDataArray));
      } catch (error) {
        console.error("Failed to save user data:", error);
      }
    };

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@gmail\.com(\.ph)?$/;
      return emailRegex.test(email);
    };

    const isValidPassword = (password: string) => {
      return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
      );
    };

    const handleSignUp = async () => {
      if (!firstname || !lastname || !email || !username || !password) {
        Alert.alert("Registration Failed", "Please fill in all fields.");
        return;
      }
      if (!isValidEmail(email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return;
      }
      if (!isValidPassword(password)) {
        Alert.alert(
          "Weak Password",
          "Password must be at least 8 characters long, contain uppercase and lowercase letters, and include a number."
        );
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }

      try {
        const userData: UserData = {
          firstname,
          lastname,
          email,
          username,
          password,
        };
        await saveUserData(userData);
        Alert.alert("Success", "Registration successful!");
        navigation.navigate("Menu");
      } catch (error) {
        Alert.alert("Error", "There was an error saving your data.");
      }

      setFirstname("");
      setLastname("");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    };

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: "padding", android: "height" })}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.fullScreenContainer}>
            <View style={styles.centerContent}>
              <Text style={styles.titleText}>TREStaurant</Text>
            </View>

            <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor={"#333333"}
                value={firstname}
                onChangeText={setFirstname}
                style={styles.label}
              />
              </View>
    <View style={styles.inputContainer}>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor={"#333333"}
                value={lastname}
                onChangeText={setLastname}
                style={styles.label}
              />
              </View>
              
    <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={"#333333"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.label}
              />
              </View>

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
                  secureTextEntry={!passwordVisible} // Toggle password visibility
                  style={styles.label}
                />
              
                
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={35}
                    color="gray"
                  />
                </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!passwordVisible}
                placeholderTextColor={"#333333"}
                style={styles.label}
              />
  </View>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
              >
                <Text style={styles.SignUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={{ color: "black" }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                  <Text style={styles.LogInText}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  export default SignUpScreen;

  const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollViewContainer: { flexGrow: 1 },
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
      position: "relative", // For positioning the eye icon
    },
    label: {
      borderRadius: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: "black",
    },
    signUpButton: {
      width: "100%",
      backgroundColor: "#58C7F3",
      padding: 16,
      borderRadius: 16,
      marginBottom: 16,
      borderColor: "black",
    },
    eyeIcon: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: [{ translateY: -12 }],
    },
    SignUpButtonText: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
      color: "#FFFFFF",
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
  });
