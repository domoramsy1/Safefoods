import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-qr-code"; // Correct import for QRCode
import { useCart } from "./CartContext"; // Adjust path as necessary

const CartScreen: React.FC = () => {
  const { cartItems, clearCart, updateCartItemQuantity, removeCartItem } =
    useCart();

  // Access the navigation object using the useNavigation hook
  const navigation = useNavigation();

  // Calculate the total amount of the cart
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const generateOrderDetails = () => {
    // Generate order details (this is just an example format)
    return JSON.stringify(
      cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }))
    );
  };

  // Handle adding/removing items from the cart
  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 0) {
      updateCartItemQuantity(id, item.quantity + 1); // Increment quantity by 1
    }
  };

  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(id, item.quantity - 1); // Decrement quantity by 1
    }
  };

  const handleRemoveItem = (id: number) => {
    removeCartItem(id);
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/icons/previous.png")} // Add your back button icon path here
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₱{item.price}.00</Text>

                  {/* Quantity Controls */}
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => handleDecreaseQuantity(item.id)}
                    >
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => handleIncreaseQuantity(item.id)}
                    >
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Remove Item Button */}
                  <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                    <Text style={styles.removeItem}>REMOVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Bottom Section with QR Code and Confirm Order Button */}
          <View style={styles.bottomSection}>
            <View style={styles.qrCodeContainer}>
              <Text style={styles.totalAmount}>
                Total: ₱{calculateTotal().toFixed(2)}
              </Text>
              {/* QRCode for Order Details */}
              <QRCode value={generateOrderDetails()} size={130} />
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => alert("Order Confirmed")}
            >
              <Text style={styles.confirmButtonText}>Confirm Order</Text>
            </TouchableOpacity>

            {/* Empty Cart Button */}
            <TouchableOpacity
              style={styles.emptyCartButton}
              onPress={clearCart}
            >
              <Text style={styles.emptyCartButtonText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButtonContainer: {
    position: "absolute",
    top: 13,
    left: 9,
    zIndex: 1, // Ensure the button is above other content
  },
  backButton: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    padding: 2,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  itemPrice: {
    color: "black",
    marginTop: 20,
  },
  itemQuantity: {
    color: "black",
    margin: 5,
  },
  emptyCart: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    backgroundColor:"yellow",
    borderColor: "black",
    borderRadius:4,
    borderWidth:2,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  quantityButton: {
    fontSize: 20,
    padding: 5,
    textAlign: "center",
    backgroundColor: "green",
    borderRadius: 8,
    width: 60,
  },
  removeItem: {
    width: "30%",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
    paddingBottom:9,
    marginBottom: 4,
    color:"white",
    borderColor: "black",
    backgroundColor: "red",
    marginLeft: 220,
    marginTop:-35,
    borderBottomEndRadius: -50,
  },
  bottomSection: {
    borderRadius:4,
    borderWidth:2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    marginBottom: -9,
    margin: -9,
    alignItems: "center",
    backgroundColor: "#C8DEE7",
  },
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginLeft: 9,
    marginBottom:9,
  },
  confirmButton: {
    marginTop: -40,
    backgroundColor: "#4CAF50",
    padding: 19,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    position:"fixed", 
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
  },
  emptyCartButton: {
    textAlign: "center",
    marginTop: 20,
  },
  emptyCartButtonText: {
    color: "red",
    fontSize: 16,
  },
});

export default CartScreen;
