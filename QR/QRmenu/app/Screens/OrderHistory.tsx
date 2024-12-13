import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const OrderHistory: React.FC = () => {
  const orders = [
    // Fetch this data from the backend or a global state
    { id: 1, items: 'Pizza, Burger', total: 500, status: 'Paid' },
    { id: 2, items: 'Pasta', total: 300, status: 'Pending' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>{item.items}</Text>
            <Text>₱{item.total}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default OrderHistory;
