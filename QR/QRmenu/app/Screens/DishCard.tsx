import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DishCardProps = {
    item: {
        id: number; // Add ID for removing the item from the cart
        name: string;
        price: number;
        image: any; // Adjust type as necessary
    };
    onOrder: (item: { id: number; name: string; price: number }, isAdded: boolean) => void; // Pass state of item
};

const { width } = Dimensions.get("window"); // Get screen width

const DishCard: React.FC<DishCardProps> = ({ item, onOrder }) => {
    const [isAdded, setIsAdded] = useState(false); // State to manage button text and disabled

    const handleOrder = () => {
        if (isAdded) {
            // If the item is already added, remove it from the cart
            onOrder(item, false); // Pass false to remove the item
        } else {
            // If the item is not added, add it to the cart
            onOrder(item, true); // Pass true to add the item
        }
        setIsAdded(!isAdded); // Toggle the state of the item
    };

    return (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₱{item.price.toFixed(2)}</Text>

            <TouchableOpacity
                onPress={handleOrder}
                style={[
                    styles.orderButton,
                    { backgroundColor:  "#007BFF" },//  Change background color based on state
                ]}
            >
                <Text style={styles.orderButtonText}>
                    {"Add to Cart"} {/* Change button text */}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.9,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginVertical: 15,
        alignItems: "center",
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: width * 0.5,
        borderRadius: 15,
        marginBottom: 10,
        resizeMode: "cover",
    },
    name: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 8,
        textAlign: "center",
        color: "#333",
    },
    price: {
        color: "#555",
        fontSize: 18,
        marginBottom: 12,
    },
    orderButton: {
        paddingVertical: 12,
        paddingHorizontal: 99,
        borderRadius: 8,
    },
    orderButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});

export default DishCard;
