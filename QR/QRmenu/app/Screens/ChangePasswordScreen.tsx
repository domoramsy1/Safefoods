import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

type RootStackParamList = {
  Profile: undefined;
  ChangePassword: undefined;
};

type ChangePasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ChangePassword"
>;

type Props = {
  navigation: ChangePasswordScreenNavigationProp;
};

const ChangePasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [userData, setUserData] = useState<{ password: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const userDataArray = JSON.parse(storedUserData);
          if (Array.isArray(userDataArray) && userDataArray.length > 0) {
            const latestUser = userDataArray[userDataArray.length - 1];
            setUserData(latestUser);
          } else {
            console.warn("No user data found.");
          }
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, []);

  const isValidPassword = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password) // Adding special character check
    );
  };

  const handleSave = async () => {
    if (!userData) {
      Alert.alert("Error", "User data not loaded");
      return;
    }

    if (loading) return;

    setLoading(true); // Start loading state

    try {
      const { password: storedPassword } = userData;

      if (currentPassword !== storedPassword) {
        setLoading(false); // Stop loading if current password is incorrect
        return Alert.alert("Error", "Current password is incorrect");
      }

      if (!isValidPassword(newPassword)) {
        setLoading(false);
        return Alert.alert("Error", "New password does not meet requirements");
      }

      if (newPassword !== confirmNewPassword) {
        setLoading(false);
        return Alert.alert("Error", "Passwords do not match");
      }

      const updatedData = { ...userData, password: newPassword };
      await AsyncStorage.setItem("userData", JSON.stringify([updatedData])); // Save back as an array

      setLoading(false); // Stop loading when done
      Alert.alert("Success", "Password changed successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Profile"), // Navigate back to Profile screen
        },
      ]);
    } catch (error) {
      setLoading(false); // Stop loading on error
      console.error("Error changing password:", error);
      Alert.alert("Error", "Failed to change password. Please try again later.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholderTextColor="#333333"
            style={styles.label}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholderTextColor="#333333"
            style={styles.label}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            placeholderTextColor="#333333"
            style={styles.label}
            secureTextEntry
          />
        </View>

        <View style={styles.saveButtonContainer}>
          <TouchableOpacity onPress={handleSave} disabled={loading}>
            <Text style={styles.saveButtonText}>
              {loading ? <ActivityIndicator color="#fff" /> : "Save"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ProfilebuttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("../../assets/icons/previous.png")}
              style={styles.profileButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 200,
    paddingTop: 200,
    backgroundColor: "#FFFFFF",
  },
  label: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: -50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  saveButtonText: {
    backgroundColor: "#58C7F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    color: "#fff",
  },
  ProfilebuttonContainer: {
    position: "absolute",
    top: -180,
    left: 20,
    alignItems: "center",
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 9,
    marginLeft: 9,
    borderRadius: 16,
    borderColor: "black",
    width: "95%",
    marginBottom: 16,
  },
});
