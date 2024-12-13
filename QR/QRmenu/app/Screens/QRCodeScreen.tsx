    import AsyncStorage from "@react-native-async-storage/async-storage";
import { goBack } from "expo-router/build/global-state/routing";
    import React, { useEffect, useState } from "react";
    import { StyleSheet, Text, View } from "react-native";
    import QRCode from "react-qr-code";

    const QRCodeScreen = () => {
    const [userData, setUserData] = useState<{
        firstName: string;
        lastName: string;
    } | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem("userData");
            if (storedUserData) {
            const users = JSON.parse(storedUserData);
            // Assuming you want the last signed-up user
            const lastUser = users[users.length - 1];
            setUserData({
                firstName: lastUser.firstName,
                lastName: lastUser.lastName,
            });
            }
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
        {userData ? (
            <>
            <Text style={styles.text}>
                Welcome, {userData.firstName} {userData.lastName}!
            </Text>
            <View style={styles.qrContainer}>
                <QRCode
                value={`Name: ${userData.firstName} ${userData.lastName}`}
                size={300}
                color="black"
                />
            </View>
            </>
        ) : (
            <Text style={styles.text}>Loading QR Code...</Text>
        )}
        </View>
    );
    };

    export default QRCodeScreen;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },


    text: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
    qrContainer: {
        backgroundColor: "white", // Set desired background color here
        padding: 10, // Add some padding around the QR code
        width: 400,
    },
    });
