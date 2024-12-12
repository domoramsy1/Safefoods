  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { StackNavigationProp } from "@react-navigation/stack";
  import { useEffect, useState } from "react";

  import {
    Button,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
  } from "react-native";
  import { launchImageLibrary, ImagePickerResponse } from "react-native-image-picker";
  import Animated, { FadeInDown } from "react-native-reanimated";

  type RootStackParamList = {
    Profile: { updatedData?: { password: string } };
    Menu: undefined;
    ChangePassword: undefined;
    LogIn: undefined;
  };

  type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Profile"
  >;

  interface CustomImagePickerResponse {
    didCancel?: boolean;
    error?: string;
    assets?: Array<{
      uri: string; // Ensure uri is always a string
      type?: string;
      fileName?: string;
    }> | undefined;
  }

  const ProfileScreen = ({ navigation }: { navigation: ProfileScreenNavigationProp }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
      const loadUserData = async () => {
        try {
          const storedUserData = await AsyncStorage.getItem("userData");
          if (storedUserData) {
            const userDataArray = JSON.parse(storedUserData);

            if (Array.isArray(userDataArray) && userDataArray.length > 0) {
              const latestUser = userDataArray[userDataArray.length - 1];

              setFirstName(latestUser.firstName);
              setLastName(latestUser.lastName);
              setEmail(latestUser.email);
              setUserName(latestUser.username);
              setPassword(latestUser.password);
              setPhoto(latestUser.photo);
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

    const handleChoosePhoto = () => {
      launchImageLibrary(
        {
          mediaType: "photo",
          quality: 1,
        },
        (response: ImagePickerResponse) => {
          if (response.didCancel) {
            console.log("User cancelled image picker");
          } else if (response.errorCode) {
            console.log("ImagePicker Error: ", response.errorMessage);
          } else if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            // Ensure that the uri is available and set the photo state
            if (asset.uri) {
              setPhoto(asset.uri);
            }
          }
        }
      );
    };

    const handleSave = async () => {
      const userDataArray = {
        firstName,
        lastName,
        email,
        username,
        password,
        photo,
      };
      await AsyncStorage.setItem("userData", JSON.stringify(userDataArray));
      Alert.alert("Success", "Profile updated successfully");
    };

    const handleLogout = async () => {
      navigation.navigate("LogIn");
    };

    const handleMenu = async () => {
      navigation.navigate("Menu");
    };

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.photo} />
              ) : (
                <ImageBackground
                  source={require("../../assets/icons/profile.png")}
                  style={styles.placeholderPhoto}
                  imageStyle={{ borderRadius: 50 }}
                >
                  <Text style={styles.placeholderText}>Add Photo</Text>
                </ImageBackground>
              )}
            </TouchableOpacity>
            <Animated.View style={styles.formContainer}>
              {/* First Name */}
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                style={styles.inputContainer}
              >
                <Text style={styles.label}>
                  FirstName: {firstName || "First Name"}
                </Text>
              </Animated.View>

              {/* Last Name */}
              <Animated.View
                entering={FadeInDown.delay(250).duration(1000).springify()}
                style={styles.inputContainer}
              >
                <Text style={styles.label}>
                  LastName: {lastName || "Last Name"}
                </Text>
              </Animated.View>

              {/* Email */}
              <Animated.View
                entering={FadeInDown.delay(300).duration(1000).springify()}
                style={styles.inputContainer}
              >
                <Text style={styles.label}>Email: {email || "Email"}</Text>
              </Animated.View>

              {/* Username */}
              <Animated.View
                entering={FadeInDown.delay(350).duration(1000).springify()}
                style={styles.inputContainer}
              >
                <Text style={styles.label}>
                  Username: {username || "Username"}
                </Text>
              </Animated.View>
            </Animated.View>

            {/* Menu button (top left) */}
            <View style={styles.previousButtonContainer}>
              <TouchableOpacity onPress={handleMenu}>
                <Image
                  source={require("../../assets/icons/previous.png")}
                  style={styles.previousButton}
                />
              </TouchableOpacity>
            </View>


            {/* Logout button (top right) */}
            <View style={styles.logoutButtonContainer}>
              <TouchableOpacity onPress={handleLogout}>
                <Image
                  source={require("../../assets/icons/shutdown.png")}
                  style={styles.logoutButton}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Button
                title="Change Password"
                onPress={() => navigation.navigate("ChangePassword")}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  export default ProfileScreen;

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: "center",
      padding: 9,
      paddingBottom: 200,
      paddingTop: 30,
      backgroundColor: "#FFFFFF",
    },

    label: {
      backgroundColor: "lightgray",
      borderRadius: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: "black",
    },
    profileContainer: {
      alignItems: "center",
    },

    previousButtonContainer: {
      position: "absolute",
      top: 10,
      left: 10,
    },
    previousButton: {
      width: 40,
      height: 40,
    },

    logoutButtonContainer: {
      position: "absolute",
      top: 10,
      right: 10,
    },
    logoutButton: {
      width: 40,
      height: 40,
    },

    saveButtonContainer: {
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    saveButton: {
      width: 40,
      height: 40,
    },

    photo: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
    },
    placeholderPhoto: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: "#e0e0e0",
    },
    placeholderText: {
      color: "#888",
    },
    formContainer: {
      width: "100%",
      paddingHorizontal: 16,
      paddingVertical: 70,
    },
    inputContainer: {
      marginBottom: 16,
      paddingTop: 20,
    },
    textInput: {
      backgroundColor: "gray",
      borderRadius: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
    },
  });
