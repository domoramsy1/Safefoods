// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from "react-native";
// import QRCode from "react-qr-code";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useCart } from "./CartContext"; // Adjust path as necessary
// import { useNavigation } from "@react-navigation/native"; // For navigation

// const CartScreen: React.FC = () => {
//   const { cartItems, clearCart, updateCartItemQuantity, removeCartItem } = useCart();
//   const [user, setUser] = useState<{ firstName: string; lastName: string }>({
//     firstName: "",
//     lastName: "",
//   });

//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const storedUserData = await AsyncStorage.getItem("userData");
//         if (storedUserData) {
//           const parsedUserData = JSON.parse(storedUserData);
//           if (Array.isArray(parsedUserData) && parsedUserData.length > 0) {
//             setUser({
//               firstName: parsedUserData[0].firstName,
//               lastName: parsedUserData[0].lastName,
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const calculateTotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };

//   const generateQRData = () => {
//     const orderDetails = cartItems.map((item) => ({
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price,
//     }));
//     return JSON.stringify({
//       user: `${user.firstName} ${user.lastName}`,
//       orderDetails,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back to Menu Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Text style={styles.backButtonText}>Back to Menu</Text>
//       </TouchableOpacity>

//       {cartItems.length > 0 ? (
//         <>
//           <FlatList
//             data={cartItems}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.itemContainer}>
//                 <View style={styles.itemDetails}>
//                   <Text style={styles.itemName}>{item.name}</Text>
//                   <Text style={styles.itemPrice}>₱{item.price}.00</Text>
//                 </View>
//                 <View style={styles.quantityContainer}>
//                   <TouchableOpacity
//                     style={styles.quantityButton}
//                     onPress={() =>
//                       updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))
//                     }
//                   >
//                     <Text style={styles.buttonText}>-</Text>
//                   </TouchableOpacity>
//                   <Text style={styles.quantityText}>{item.quantity}</Text>
//                   <TouchableOpacity
//                     style={styles.quantityButton}
//                     onPress={() =>
//                       updateCartItemQuantity(item.id, item.quantity + 1)
//                     }
//                   >
//                     <Text style={styles.buttonText}>+</Text>
//                   </TouchableOpacity>
//                 </View>
//                 {/* Remove Button */}
//                 <TouchableOpacity
//                   style={styles.removeButton}
//                   onPress={() => removeCartItem(item.id)}
//                 >
//                   <Text style={styles.removeButtonText}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />

//           <View style={styles.qrCodeContainer}>
//             <Text style={styles.totalAmount}>
//               Total: ₱{calculateTotal().toFixed(2)}
//             </Text>
//             <QRCode value={generateQRData()} size={150} />
//           </View>
//         </>
//       ) : (
//         <Text style={styles.emptyCart}>Your cart is empty.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   backButton: {
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   backButtonText: {
//     color: "white",
//     fontSize: 16,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   qrCodeContainer: { alignItems: "center", marginTop: 20 },
//   totalAmount: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   emptyCart: { textAlign: "center", marginTop: 20, color: "#999" },
//   itemContainer: {
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: "#f9f9f9",
//     borderRadius: 5,
//   },
//   itemDetails: { flexDirection: "row", justifyContent: "space-between" },
//   itemName: { fontSize: 16 },
//   itemPrice: { fontSize: 16, fontWeight: "bold" },
//   quantityContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     justifyContent: "center",
//   },
//   quantityButton: {
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
//   quantityText: { fontSize: 16, fontWeight: "bold", marginHorizontal: 10 },
//   removeButton: {
//     backgroundColor: "#FF4D4F",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     alignSelf: "center",
//   },
//   removeButtonText: { color: "white", fontSize: 14, fontWeight: "bold" },
// });

// export default CartScreen;


import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "./CartContext"; // Adjust path as necessary
import { useNavigation } from "@react-navigation/native"; // For navigation

type RootStackParamList = {
  OrderConfirmation: { qrData: string };
};

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OrderConfirmation"
>;

const CartScreen: React.FC = () => {
  const { cartItems, updateCartItemQuantity, removeCartItem } = useCart();
  const [user, setUser] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: "",
  });

  const navigation = useNavigation<CartScreenNavigationProp>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          if (Array.isArray(parsedUserData) && parsedUserData.length > 0) {
            setUser({
              firstName: parsedUserData[0].firstName,
              lastName: parsedUserData[0].lastName,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const generateQRData = () => {
    const orderDetails = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));
    return JSON.stringify({
      user: `${user.firstName} ${user.lastName}`,
      orderDetails,
    });
  };

  const handleConfirmOrder = () => {
    const qrData = generateQRData(); // Generate QR data from the function
    navigation.navigate("OrderConfirmation", { qrData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.Topbar}>
        {/* Back to Menu Button */}
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/icons/previous.png")}
            style={styles.previousButton}
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
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.minusButton}
                    onPress={() =>
                      updateCartItemQuantity(
                        item.id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.plusButton}
                    onPress={() =>
                      updateCartItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeCartItem(item.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalAmount}>
              Total: ₱{calculateTotal().toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.confirmOrderButton}
              onPress={handleConfirmOrder}
            >
              <Text style={styles.confirmOrderText}>Confirm Order</Text>
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
  container: { flex: 1, padding: 16 },
  previousButton: {
    width: 40, // Set width for the image
    height: 40, // Set height for the image
    resizeMode: "contain", // Ensures the image maintains aspect ratio
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    flex: 1,
  },
  itemDetails: { flexDirection: "row", justifyContent: "space-between" },
  itemName: { fontSize: 16 },
  itemPrice: { fontSize: 16, fontWeight: "bold" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    left:5,
    justifyContent: "center",
    position:"absolute",
  },
  quantityButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  quantityText: { fontSize: 16, fontWeight: "bold", marginHorizontal: 10 },
  removeButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    left:128,
    marginTop: 10,
    alignSelf: "center",
  },
  removeButtonText: { color: "white", fontSize: 14, fontWeight: "bold" },
  totalContainer: {
    marginTop: 0,
    padding: 10,
    margin: -15,
    marginBottom: -15,
    backgroundColor: "#EBEDA0",
  },
  totalAmount: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  confirmOrderButton: {
    backgroundColor: "#58C7F3",
    padding: 12,
    borderRadius: 5,
  },
  confirmOrderText: {
    color: "white",
    fontSize: 16,
    textAlign:"center",
    fontWeight: "bold",
  },
  emptyCart: { 
    textAlign: "center", marginTop: 20, color: "#999" },

  goBack: {
    position: "absolute",
    top: 3, // Adjusted to make it more visible
    left: 5,
    padding: 10, // Added padding for better touch area
    zIndex: 2, // Ensures it is on top of other elements
  },
  Topbar: {
    height: 60, // Define the height of the top bar
    backgroundColor: "#EBEDA0", // Add a background color to make the bar visible
    justifyContent: "center",
    width: 500,
    maxHeight: 90,
    marginLeft: -20,
    alignItems: "center",
    position: "relative",
    zIndex: 1, // Ensure that the top bar appears under the button if needed
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
});

export default CartScreen;
