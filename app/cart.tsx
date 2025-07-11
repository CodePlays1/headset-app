"use client"

import { useState } from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const cartItems = [
  {
    id: "1",
    name: "Sony WH-1000XM5",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    quantity: 1,
  },
  {
    id: "2",
    name: "Bose QuietComfort 45",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    quantity: 2,
  },
]

export default function CartScreen() {
  const [items, setItems] = useState(cartItems)

  const updateQuantity = (id: string, change: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          // Prevent quantity from going below 1
          if (newQuantity < 1) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  }

  const removeItem = (id: string) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item from your cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setItems((prev) => prev.filter((item) => item.id !== id)),
      },
    ])
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15.99
  const total = subtotal + shipping 

  const proceedToCheckout = () => {
    if (items.length === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart before proceeding.")
      return
    }
    router.push("/checkout")
  }

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {items.length === 0 ? (
          <View style={styles.emptyCart}>
            <Ionicons name="bag-outline" size={80} color="rgba(255,255,255,0.5)" />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <TouchableOpacity style={styles.shopButton} onPress={() => router.push("/")}>
              <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.shopButtonGradient}>
                <Text style={styles.shopButtonText}>Start Shopping</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Cart Items */}
            <View style={styles.itemsContainer}>
              {items.map((item) => (
                <LinearGradient
                  key={item.id}
                  colors={["#0f2027", "#203a43", "#2c5364"]}
                  style={styles.cartItem}
                >
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity 
                        style={styles.quantityButton} 
                        onPress={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Ionicons 
                          name="remove" 
                          size={16} 
                          color={item.quantity <= 1 ? "rgba(255,255,255,0.3)" : "white"} 
                        />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, 1)}>
                        <Ionicons name="add" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.itemActions}>
                    <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
                      <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                    </TouchableOpacity>
                    <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                </LinearGradient>
              ))}
            </View>

            {/* Order Summary */}
            <LinearGradient
              colors={["#0f2027", "#203a43", "#2c5364"]}
              style={styles.summaryContainer}
            >
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
              </View>


              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </LinearGradient>
          </>
        )}
      </ScrollView>

      {/* Checkout Button */}
      {items.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity style={styles.checkoutButton} onPress={proceedToCheckout}>
            <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.checkoutGradient}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  )
}

// ... (keep your existing styles unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyCartText: {
    fontSize: 18,
    color: "rgba(255,255,255,0.7)",
    marginTop: 20,
    marginBottom: 30,
  },
  shopButton: {
    borderRadius: 25,
    overflow: "hidden",
  },
  shopButtonGradient: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  shopButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemsContainer: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#FFD700",
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  itemActions: {
    alignItems: "center",
  },
  removeButton: {
    padding: 8,
    marginBottom: 8,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  summaryContainer: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  summaryValue: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
  },
  checkoutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  checkoutButton: {
    borderRadius: 25,
    overflow: "hidden",
  },
  checkoutGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
})
