  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { StackNavigationProp } from "@react-navigation/stack";
  import { useEffect, useState } from "react";

  import {
    Alert,
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
  } from "react-native";
  import {
    ImagePickerResponse,
    launchImageLibrary,
  } from "react-native-image-picker";
  import { FadeInDown } from "react-native-reanimated";

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
    assets?:
      | Array<{
          uri: string; // Ensure uri is always a string
          type?: string;
          fileName?: string;
        }>
      | undefined;
  }

  const ProfileScreen = ({
    navigation,
  }: {
    navigation: ProfileScreenNavigationProp;
  }) => {
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

              setFirstName(latestUser.firstname);
              setLastName(latestUser.lastname);
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
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Logout",
            onPress: () => navigation.navigate("LogIn")
          }
        ]
      );
    };
    

    const handleMenu = async () => {
      navigation.navigate("Menu");
    };

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      
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
            <View style={styles.formContainer}>
              {/* First Name */}
              <View
                
                style={styles.inputContainer}
              >
                <Text style={styles.label}>
                  FirstName: {firstName || "First Name"}
                </Text>
              </View>

              {/* Last Name */}
              <View              style={styles.inputContainer}
              >
                <Text style={styles.label}>
                  LastName: {lastName || "Last Name"}
                </Text>
              </View>

              {/* Email */}
              <View
                style={styles.inputContainer}
              >
                <Text style={styles.label}>Email: {email || "Email"}</Text>
              </View>

              {/* Username */}
              <View
                style={styles.inputContainer}
              >
                <Text style={styles.label}>
                  Username: {username || "Username"}
                </Text>
              </View>
            </View>

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
            <View style={styles.ChangePass}>
    <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
      <Text style={styles.buttonText}>Change Password</Text>
    </TouchableOpacity>
  </View>
          </View>
      
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

  ChangePass: {
    marginTop: -50,
    width: "60%",
    height: 40,
    backgroundColor: "#58C7F3",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    
  },

  buttonText: {
    color: 'white', // Make the text color white
    fontSize: 18,    // You can adjust the font size
    textAlign: 'center', // Center the text
    padding: 10,  // Add some padding to make it look better
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
      top: -20,
      left: 10,
    },
    previousButton: {
      width: 30,
      height: 30,
    },

    logoutButtonContainer: {
      position: "absolute",
      top: -20,
      right: 10,
    },
    logoutButton: {
      width: 30,
      height: 30,
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
