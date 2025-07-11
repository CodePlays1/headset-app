"use client"

import { useState } from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const featuredProducts = [
  {
    id: "1",
    name: "Sony WH-1000XM5",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    rating: 4.8,
    category: "Wireless",
  },
  {
    id: "2",
    name: "Bose QuietComfort 45",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    rating: 4.7,
    category: "Noise Cancelling",
  },
  {
    id: "3",
    name: "Apple AirPods Max",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
    rating: 4.6,
    category: "Premium",
  },
]

const allProducts = [
  ...featuredProducts,
  {
    id: "4",
    name: "Sennheiser HD 660S",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    rating: 4.9,
    category: "Audiophile",
  },
  {
    id: "5",
    name: "Audio-Technica ATH-M50x",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    category: "Studio",
  },
  {
    id: "6",
    name: "Beats Studio3 Wireless",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&h=400&fit=crop",
    rating: 4.4,
    category: "Wireless",
  },
]

export default function HomeScreen() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }])
  }

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity style={styles.featuredCard} onPress={() => router.push(`/product/${item.id}`)}>
      <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.cardGradient}>
        <Image source={{ uri: item.image }} style={styles.featuredImage} />
        <View style={styles.featuredInfo}>
          <Text style={styles.featuredName}>{item.name}</Text>
          <Text style={styles.featuredCategory}>{item.category}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.featuredPrice}>${item.price}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => router.push(`/product/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.productFooter}>
          <View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.productRating}>{item.rating}</Text>
            </View>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
            <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.addButtonGradient}>
              <Ionicons name="add" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hi! Created By CodePlays
            </Text>
            <Text style={styles.subtitle}>
              Find the perfect headset for you!
            </Text>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push("/cart")}
          >
            <Ionicons name="bag-outline" size={24} color="white" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <LinearGradient
            colors={["#0f2027", "#203a43", "#2c5364"]}
            style={styles.searchBar}
          >
            <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" />
            <Text style={styles.searchPlaceholder}>Search headsets...</Text>
          </LinearGradient>
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={featuredProducts}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* All Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Products</Text>
          <FlatList
            data={allProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productGrid}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

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
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  cartButton: {
    position: "relative",
    padding: 8,
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
  },
  searchPlaceholder: {
    marginLeft: 12,
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featuredList: {
    paddingLeft: 20,
  },
  featuredCard: {
    width: width * 0.7,
    marginRight: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardGradient: {
    padding: 20,
    alignItems: "center",
  },
  featuredImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  featuredInfo: {
    alignItems: "center",
  },
  featuredName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 4,
  },
  featuredCategory: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    color: "white",
    marginLeft: 4,
    fontSize: 14,
  },
  featuredPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
  },
  productGrid: {
    paddingHorizontal: 20,
  },
  productCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    margin: 8,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  productRating: {
    color: "white",
    marginLeft: 4,
    fontSize: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 4,
  },
  addButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  addButtonGradient: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
})
