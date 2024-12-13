    import React from "react";
    import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
    import QRCode from "react-qr-code";
    import { NativeStackScreenProps } from "@react-navigation/native-stack";
    import { RootStackParamList } from "../App"; // Adjust path as needed

    type Props = NativeStackScreenProps<RootStackParamList, "OrderConfirmation">;

    const OrderConfirmationScreen: React.FC<Props> = ({ route, navigation }) => {
    const { qrData } = route.params;

    // Parse the QR data into JSON
    const parsedData = JSON.parse(qrData);

    // Format the data for display
    const user = parsedData.user;
    const orderDetails = parsedData.orderDetails
        .map(
        (item: { name: string; quantity: number; price: number }, index: number) =>
            `${index + 1}. ${item.name} : ${item.price}x${item.quantity}pcs = P${
            item.price * item.quantity
            }.00`
        )
        .join("\n");

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <Image
            source={require("../../assets/icons/previous.png")}
            style={styles.previousButton}
            />
        </TouchableOpacity>
        <View style={styles.qrContainer}>
            <Text style={styles.title}>Order Details</Text>
            <QRCode value={qrData} size={350} />
        </View>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    qrContainer: {
        marginTop: 50,
        alignItems: "center",
    },
    goBack: {
        position: "absolute",
        top: 20, // Adjusted to make it more visible
        left: 2,
        padding: 10, // Added padding for better touch area
        zIndex: 2, 
    },
    previousButton: {
        width: 40, // Set width for the image
        height: 40, // Set height for the image
        resizeMode: "contain", // Ensures the image maintains aspect ratio
    },
    });

    export default OrderConfirmationScreen;
