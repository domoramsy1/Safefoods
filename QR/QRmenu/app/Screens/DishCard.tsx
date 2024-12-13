import React, { useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";

type DishCardProps = {
    item: {
        name: string;
        price: number;
        image: any; // Adjust type as necessary
    };
    onOrder: (item: { name: string; price: number }, quantity: number) => void;
};

const { width } = Dimensions.get("window"); // Get screen width

const DishCard: React.FC<DishCardProps> = ({ item, onOrder }) => {
    const [quantity, setQuantity] = useState(0);

    const increaseQuantity = () => setQuantity((prev) => prev + 1);

    const decreaseQuantity = () => {
        if (quantity > 0) setQuantity((prev) => prev - 1);
    };

    const handleOrder = () => {
        if (quantity <= 0) {
            Alert.alert(
                "Quantity Error",
                "Please increase the quantity to at least 1 before adding to cart."
            );
            return;
        }
        onOrder(item, quantity);
    };

    return (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₱{item.price.toFixed(2)}</Text>

            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.minusButton}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.plusButton}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleOrder}
                style={[
                    styles.orderButton,
                    { backgroundColor: quantity > 0 ? "#007BFF" : "#ccc" }, // Disable button style
                ]}
                disabled={quantity <= 0} // Disable button functionality
            >
                <Text style={styles.orderButtonText}>Add-To-Cart</Text>
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
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
        
    },
    minusButton: {
        backgroundColor: "#FF6B6B",
        borderRadius: 8,
        paddingRight: 25,
        paddingLeft:25,
        padding:9,
    },
    plusButton: {
        backgroundColor: "#4CAF50",
        borderRadius: 8,
        paddingRight: 25,
        paddingLeft:25,
        padding:9,
    
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        textAlign:"center"
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 20,
        color: "#333",
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
