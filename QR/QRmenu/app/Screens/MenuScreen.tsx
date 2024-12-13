  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import { useCart } from "./CartContext";
  import { useNavigation } from "@react-navigation/native";
  import { StackNavigationProp } from "@react-navigation/stack";
  import React, { useState } from "react";
  import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
  } from "react-native";
  import DishCard from "./DishCard"; // Ensure this path is correct

  // Define the Stack Param List for TypeScript
  type RootStackParamList = {
    MenuScreen: undefined;
    Profile: undefined;
    Cart: undefined;
  };

  // Define the type for the navigation prop
  type MenuScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "MenuScreen"
  >;

  const Tab = createBottomTabNavigator();
  const AppetizersScreen: React.FC = () => {
    const [menuItems] = useState([
      {
        id: 1,
        name: "Classic French Fries",
        price: 85,
        image: require("../../assets/images/Fries1.jpg"),
      },
      {
        id: 2,
        name: "Curly Fries",
        price: 90,
        image: require("../../assets/images/Fries2.jpg"),
      },
      {
        id: 3,
        name: "Sweet Potato Fries",
        price: 95,
        image: require("../../assets/images/Fries3.jpg"),
      },
      {
        id: 4,
        name: "Loaded Fries",
        price: 120,
        image: require("../../assets/images/Fries4.jpg"),
      },
      {
        id: 5,
        name: "Steak Fries",
        price: 100,
        image: require("../../assets/images/Fries5.jpg"),
      },
      {
        id: 6,
        name: "Crinkle-Cut Fries",
        price: 85,
        image: require("../../assets/images/Fries6.jpg"),
      },
      {
        id: 7,
        name: "Chili Cheese Fries",
        price: 130,
        image: require("../../assets/images/Fries7.jpg"),
      },
      {
        id: 8,
        name: "Poutine",
        price: 150,
        image: require("../../assets/images/Fries8.jpg"),
      },
      {
        id: 9,
        name: "Garlic Parmesan Fries",
        price: 110,
        image: require("../../assets/images/Fries9.jpg"),
      },
      {
        id: 10,
        name: "Buffalo Fries",
        price: 120,
        image: require("../../assets/images/Fries10.jpg"),
      },
    ]);

    const { addToCart } = useCart(); // Use the addToCart function from CartContext

    const handleAddToCart = (item: any) => {
      addToCart(item); // Add 1 item to the cart
    };

    return (
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.dishCardContainer}>
            <DishCard item={item} onOrder={() => handleAddToCart(item)} />
          </View>
        ))}
      </ScrollView>
    );
  };

  const MainCoursesScreen: React.FC = () => {
    const [menuItems] = useState([
      {
        id: 11,
        name: "Chickenjoy",
        price: 150,
        image: require("../../assets/images/chickenjoy.jpg"),
      },
      {
        id: 12,
        name: "Jolly Burger",
        price: 99,
        image: require("../../assets/images/jolly_burger.jpg"),
      },
    ]);

    const { addToCart } = useCart(); // Use the addToCart function from CartContext

    const handleAddToCart = (item: any) => {
      addToCart(item); // Add 1 item to the cart
    };

    return (
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.dishCardContainer}>
            <DishCard item={item} onOrder={() => handleAddToCart(item)} />
          </View>
        ))}
      </ScrollView>
    );
  };

  const DessertsScreen: React.FC = () => {
    const [menuItems] = useState([
      {
        id: 13,
        name: "Mango Pie",
        price: 40,
        image: require("../../assets/images/Desserts1.jpg"),
      },
      {
        id: 14,
        name: "Chocolate Cake",
        price: 70,
        image: require("../../assets/images/Desserts2.jpg"),
      },
      {
        id: 15,
        name: "Cheesecake",
        price: 80,
        image: require("../../assets/images/Desserts3.jpg"),
      },
      {
        id: 16,
        name: "Brownie",
        price: 60,
        image: require("../../assets/images/Desserts4.jpg"),
      },
      {
        id: 17,
        name: "Ice Cream",
        price: 50,
        image: require("../../assets/images/Desserts5.jpg"),
      },
      {
        id: 18,
        name: "Fruit Salad",
        price: 45,
        image: require("../../assets/images/Desserts6.jpg"),
      },
      {
        id: 19,
        name: "Panna Cotta",
        price: 55,
        image: require("../../assets/images/Desserts7.jpg"),
      },
      {
        id: 20,
        name: "Tiramisu",
        price: 75,
        image: require("../../assets/images/Desserts8.jpg"),
      },
      {
        id: 21,
        name: "Cupcake",
        price: 35,
        image: require("../../assets/images/Desserts9.jpg"),
      },
      {
        id: 22,
        name: "Pineapple Upside-Down Cake",
        price: 65,
        image: require("../../assets/images/Desserts10.jpg"),
      },
    ]);

    const { addToCart } = useCart(); // Use the addToCart function from CartContext

    const handleAddToCart = (item: any) => {
      addToCart(item); // Add 1 item to the cart
    };

    return (
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.dishCardContainer}>
            <DishCard item={item} onOrder={() => handleAddToCart(item)} />
          </View>
        ))}
      </ScrollView>
    );
  };

  const Burgers_And_SandwichesScreen: React.FC = () => {
    const [menuItems] = useState([
      {
        id: 23,
        name: "Classic Cheeseburger",
        price: 85,
        image: require("../../assets/images/bur1.jpg"),
      },
      {
        id: 24,
        name: "Bacon Burger",
        price: 95,
        image: require("../../assets/images/bur2.jpg"),
      },
      {
        id: 25,
        name: "Double Cheeseburger",
        price: 120,
        image: require("../../assets/images/bur3.jpg"),
      },
      {
        id: 26,
        name: "BBQ Burger",
        price: 110,
        image: require("../../assets/images/bur4.jpg"),
      },
      {
        id: 27,
        name: "Mushroom Swiss Burger",
        price: 130,
        image: require("../../assets/images/bur5.jpg"),
      },
      {
        id: 28,
        name: "Spicy Jalapeño Burger",
        price: 100,
        image: require("../../assets/images/bur6.jpg"),
      },
      {
        id: 29,
        name: "Veggie Burger",
        price: 90,
        image: require("../../assets/images/bur7.jpg"),
      },
      {
        id: 30,
        name: "Fish Burger",
        price: 95,
        image: require("../../assets/images/bur8.jpg"),
      },
      {
        id: 31,
        name: "Crispy Chicken Burger",
        price: 100,
        image: require("../../assets/images/bur9.jpg"),
      },
      {
        id: 32,
        name: "Italian Burger",
        price: 120,
        image: require("../../assets/images/bur10.jpg"),
      },
      {
        id: 33,
        name: "Club Sandwich",
        price: 120,
        image: require("../../assets/images/sandwich1.jpg"),
      },
      {
        id: 34,
        name: "BLT Sandwich",
        price: 110,
        image: require("../../assets/images/sandwich2.jpg"),
      },
      {
        id: 35,
        name: "Grilled Cheese Sandwich",
        price: 90,
        image: require("../../assets/images/sandwich3.jpg"),
      },
      {
        id: 36,
        name: "Chicken Sandwich",
        price: 130,
        image: require("../../assets/images/sandwich4.jpg"),
      },
      {
        id: 37,
        name: "Egg Salad Sandwich",
        price: 85,
        image: require("../../assets/images/sandwich5.jpg"),
      },
      {
        id: 38,
        name: "Tuna Sandwich",
        price: 100,
        image: require("../../assets/images/sandwich6.jpg"),
      },
      {
        id: 39,
        name: "Veggie Sandwich",
        price: 95,
        image: require("../../assets/images/sandwich7.jpg"),
      },
      {
        id: 40,
        name: "Turkey Sandwich",
        price: 120,
        image: require("../../assets/images/sandwich8.jpg"),
      },
      {
        id: 41,
        name: "Meatball Sandwich",
        price: 140,
        image: require("../../assets/images/sandwich9.jpg"),
      },
      {
        id: 42,
        name: "Philly Cheese Steak",
        price: 150,
        image: require("../../assets/images/sandwich10.jpg"),
      },
    ]);

    const { addToCart } = useCart(); // Use the addToCart function from CartContext

    const handleAddToCart = (item: any) => {
      addToCart(item); // Add 1 item to the cart
    };

    return (
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.dishCardContainer}>
            <DishCard item={item} onOrder={() => handleAddToCart(item)} />
          </View>
        ))}
      </ScrollView>
    );
  };

  const SaladsScreen: React.FC = () => {
    const [menuItems] = useState([
      {
        id: 43,
        name: "Caesar Salad",
        price: 85,
        image: require("../../assets/images/Salads1.jpg"),
      },
      {
        id: 44,
        name: "Greek Salad",
        price: 90,
        image: require("../../assets/images/Salads2.jpg"),
      },
      {
        id: 45,
        name: "Garden Salad",
        price: 80,
        image: require("../../assets/images/Salads3.jpg"),
      },
      {
        id: 46,
        name: "Cobb Salad",
        price: 95,
        image: require("../../assets/images/Salads4.jpg"),
      },
      {
        id: 47,
        name: "Caprese Salad",
        price: 100,
        image: require("../../assets/images/Salads5.jpg"),
      },
      {
        id: 48,
        name: "Pasta Salad",
        price: 90,
        image: require("../../assets/images/Salads6.jpg"),
      },
      {
        id: 49,
        name: "Fruit Salad",
        price: 75,
        image: require("../../assets/images/Salads7.jpg"),
      },
      {
        id: 50,
        name: "Spinach Salad",
        price: 85,
        image: require("../../assets/images/Salads8.jpg"),
      },
      {
        id: 51,
        name: "Chicken Salad",
        price: 95,
        image: require("../../assets/images/Salads9.jpg"),
      },
      {
        id: 52,
        name: "Quinoa Salad",
        price: 100,
        image: require("../../assets/images/Salads10.jpg"),
      },
    ]);

    const { addToCart } = useCart(); // Use the addToCart function from CartContext

    const handleAddToCart = (item: any) => {
      addToCart(item); // Add 1 item to the cart
    };

    return (
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.dishCardContainer}>
            <DishCard item={item} onOrder={() => handleAddToCart(item)} />
          </View>
        ))}
      </ScrollView>
    );
  };

  const BeveragesScreen: React.FC = () => {
    const [menuItems] = useState([
      {
        id: 53,
        name: "Coca Cola",
        price: 50,
        image: require("../../assets/images/Beverages1.jpg"),
      },
      {
        id: 54,
        name: "Sprite",
        price: 50,
        image: require("../../assets/images/Beverages2.jpg"),
      },
      {
        id: 55,
        name: "Royal True Orange",
        price: 55,
        image: require("../../assets/images/Beverages3.jpg"),
      },
      {
        id: 56,
        name: "Iced Tea",
        price: 40,
        image: require("../../assets/images/Beverages4.jpg"),
      },
      {
        id: 57,
        name: "Lemonade",
        price: 45,
        image: require("../../assets/images/Beverages5.jpg"),
      },
      {
        id: 58,
        name: "Mango Shake",
        price: 60,
        image: require("../../assets/images/Beverages6.jpg"),
      },
      {
        id: 59,
        name: "Coffee",
        price: 30,
        image: require("../../assets/images/Beverages7.jpg"),
      },
      {
        id: 60,
        name: "Chocolate Milkshake",
        price: 70,
        image: require("../../assets/images/Beverages8.jpg"),
      },
      {
        id: 61,
        name: "Orange Juice",
        price: 55,
        image: require("../../assets/images/Beverages9.jpg"),
      },
      {
        id: 62,
        name: "Water",
        price: 20,
        image: require("../../assets/images/Beverages10.jpg"),
      },
    ]);

    const { addToCart } = useCart(); // Use the addToCart function from CartContext

    const handleAddToCart = (item: any) => {
      addToCart(item); // Add 1 item to the cart
    };

    return (
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.dishCardContainer}>
            <DishCard item={item} onOrder={() => handleAddToCart(item)} />
          </View>
        ))}
      </ScrollView>
    );
  };

  const BreakFastScreen: React.FC = () => {
    const [menuItems] = useState([
      {
        id: 63,
        name: "Pancakes with Syrup",
        price: 120,
        image: require("../../assets/images/BreakFast1.jpg"),
      },
      {
        id: 64,
        name: "Omelette with Vegetables",
        price: 150,
        image: require("../../assets/images/BreakFast2.jpg"),
      },
      {
        id: 65,
        name: "French Toast",
        price: 130,
        image: require("../../assets/images/BreakFast3.jpg"),
      },
      {
        id: 66,
        name: "Bacon and Eggs",
        price: 160,
        image: require("../../assets/images/BreakFast4.jpg"),
      },
      {
        id: 67,
        name: "Breakfast Burrito",
        price: 140,
        image: require("../../assets/images/BreakFast5.jpg"),
      },
      {
        id: 68,
        name: "Fruit and Yogurt Parfait",
        price: 110,
        image: require("../../assets/images/BreakFast6.jpg"),
      },
      {
        id: 69,
        name: "Breakfast Sandwich",
        price: 150,
        image: require("../../assets/images/BreakFast7.jpg"),
      },
      {
        id: 70,
        name: "Avocado Toast",
        price: 140,
        image: require("../../assets/images/BreakFast8.jpg"),
      },
      {
        id: 71,
        name: "Smoothie Bowl",
        price: 130,
        image: require("../../assets/images/BreakFast9.jpg"),
      },
      {
        id: 72,
        name: "Cereal with Milk",
        price: 100,
        image: require("../../assets/images/BreakFast10.jpg"),
      },
    ]);

    const { addToCart } = useCart(); // Use the addToCart function from CartContext

    const handleAddToCart = (item: any) => {
      addToCart(item); // Add 1 item to the cart
    };

    return (
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.dishCardContainer}>
            <DishCard item={item} onOrder={() => handleAddToCart(item)} />
          </View>
        ))}
      </ScrollView>
    );
  };

  const MenuScreen: React.FC = () => {
    const navigation = useNavigation<MenuScreenNavigationProp>();

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let imageSource;
              if (route.name === "Appetizer") {
                imageSource = require("../../assets/icons/french-fries.png");
              } else if (route.name === "Main Course") {
                imageSource = require("../../assets/icons/dinner.png");
              } else if (route.name === "Dessert") {
                imageSource = require("../../assets/icons/ice-cream.png");
              } else if (route.name === "Burgers And Sandwiches") {
                imageSource = require("../../assets/icons/burgericon.png");
              } else if (route.name === "Salads") {
                imageSource = require("../../assets/icons/salads.png");
              } else if (route.name === "Beverages") {
                imageSource = require("../../assets/icons/soda.png");
              } else if (route.name === "BreakFast") {
                imageSource = require("../../assets/icons/english-breakfast.png");
              }

              return (
                <View style={styles.tabIconContainer}>
                  <Image
                    source={imageSource}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: "contain",
                      opacity: focused ? 1 : 0.4,
                    }}
                  />
                  {focused && <View style={styles.tabUnderline} />}
                </View>
              );
            },
            tabBarLabelStyle: {
              textAlign: "center",
              fontSize: 14,
              position: "absolute",
            },
            tabBarStyle: { backgroundColor: "gray" },
            tabBarShowLabel: false, // Hide labels on tabs
            headerTitleAlign: "center", // Center the header title
            headerStyle: {
              backgroundColor: "#f8f9fa", // Optional: Header background color
            },
            headerTintColor: "#212529", // Optional: Header text color
            headerTitleStyle: {
              fontWeight: "bold", // Optional: Make the title bold
            },
          })}
        >
          <Tab.Screen name="Appetizer" component={AppetizersScreen} />
          <Tab.Screen name="Main Course" component={MainCoursesScreen} />
          <Tab.Screen name="Dessert" component={DessertsScreen} />
          <Tab.Screen
            name="Burgers And Sandwiches"
            component={Burgers_And_SandwichesScreen}
          />
          <Tab.Screen name="Salads" component={SaladsScreen} />
          <Tab.Screen name="Beverages" component={BeveragesScreen} />
          <Tab.Screen name="BreakFast" component={BreakFastScreen} />
        </Tab.Navigator>

        {/* Change the textbutton into image button to Profile screen */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("../../assets/icons/profile.png")} // Path to your profile icon
              style={styles.profileButton} // Customize the style of your image button
            />
          </TouchableOpacity>
        </View>

        {/* Change the textbutton into image button to Cart screen */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Image
              source={require("../../assets/icons/cart.png")} // Path to your profile icon
              style={styles.cartButton} // Customize the style of your image button
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };

  export default MenuScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },

    tabIconContainer: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
    },
    tabUnderline: {
      position: "absolute",
      top: -5, // Adjust this value to position the underline below the icon
      width: "100%", // Full width of the icon
      height: 5, // Height of the underline
      backgroundColor: "black", // Color of the underline
    },

    profileButton: {
      flex: 1,
      position: "absolute",
      marginTop:6,
      width: 40, // Width of the image button
      height: 40, // Height of the image button
      borderRadius: 25, // Makes the image circular if it's a square image
    },

    cartButton: {
      flex: 1,
      marginTop:5,
      position: "absolute",
      width: 40, // Width of the image button
      height: 40, // Height of the image button
      borderRadius: 25, // Makes the image circular if it's a square image
      left: 310, // Position the cart button to the right of the screen
      
    },

    menuContainer: {
      paddingBottom: 50,
      paddingHorizontal: 16,
      alignItems: "center",
      alignContent: "center",
    },
    dishCardContainer: {
      marginBottom: 10,
    },
    buttonContainer: {
      marginTop: 16,
      marginLeft: 16,
      position: "absolute",
    },
  });
