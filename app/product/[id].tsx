"use client"

import { useState } from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const { width, height } = Dimensions.get("window")

const productDetails = {
  "1": {
    id: "1",
    name: "Sony WH-1000XM5",
    price: 399.99,
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
    ],
    rating: 4.8,
    reviews: 1247,
    category: "Wireless",
    description:
      "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, for the ultimate listening experience.",
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Quick Charge (3 min = 3 hours)",
      "Crystal clear hands-free calling",
      "Intuitive touch control settings",
    ],
    specifications: {
      "Driver Unit": "30mm",
      "Frequency Response": "4 Hz-40,000 Hz",
      "Battery Life": "30 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.2",
    },
  },
  "2": {
    id: "2",
    name: "Bose QuietComfort 45",
    price: 329.99,
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    ],
    rating: 4.7,
    reviews: 892,
    category: "Noise Cancelling",
    description:
      "Quiet comfort. Legendary sound. The perfect balance of quiet, comfort, and sound. Bose QuietComfort 45 headphones.",
    features: [
      "World-class noise cancellation",
      "24-hour battery life",
      "TriPort acoustic architecture",
      "Adjustable EQ",
      "Bose Music app",
    ],
    specifications: {
      "Driver Unit": "40mm",
      "Frequency Response": "20 Hz-20,000 Hz",
      "Battery Life": "24 hours",
      Weight: "238g",
      Connectivity: "Bluetooth 5.1",
    },
  },
}

export default function ProductScreen() {
  const { id } = useLocalSearchParams()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = productDetails[id as string]

  if (!product) {
    return (
      <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </LinearGradient>
    )
  }

  const addToCart = () => {
    // Add to cart logic here
    router.push("/cart")
  }

  const buyNow = () => {
    router.push("/checkout")
  }

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.images[selectedImageIndex] }} style={styles.mainImage} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                style={[styles.thumbnail, selectedImageIndex === index && styles.selectedThumbnail]}
              >
                <Image source={{ uri: image }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <LinearGradient colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]} style={styles.infoCard}>
            <View style={styles.titleRow}>
              <View style={styles.titleContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.category}>{product.category}</Text>
              </View>
              <Text style={styles.price}>${product.price}</Text>
            </View>

            <View style={styles.ratingRow}>
              <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name="star"
                    size={16}
                    color={i < Math.floor(product.rating) ? "#FFD700" : "rgba(255,255,255,0.3)"}
                  />
                ))}
                <Text style={styles.ratingText}>{product.rating}</Text>
              </View>
              <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
            </View>

            <Text style={styles.description}>{product.description}</Text>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Key Features</Text>
              {product.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#4ECDC4" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            {/* Specifications */}
            <View style={styles.specsContainer}>
              <Text style={styles.specsTitle}>Specifications</Text>
              {Object.entries(product.specifications).map(([key, value]) => (
                <View key={key} style={styles.specItem}>
                  <Text style={styles.specKey}>{key}:</Text>
                  <Text style={styles.specValue}>{value}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <LinearGradient colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]} style={styles.actionsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Ionicons name="remove" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity + 1)}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
              <LinearGradient colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]} style={styles.buttonGradient}>
                <Ionicons name="bag-add" size={20} color="white" />
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buyNowButton} onPress={buyNow}>
              <LinearGradient colors={["#FF6B6B", "#FF8E53"]} style={styles.buttonGradient}>
                <Text style={styles.buyNowText}>Buy Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  )
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
  backButton: {
    padding: 8,
  },
  favoriteButton: {
    padding: 8,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  mainImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    marginBottom: 16,
  },
  thumbnailContainer: {
    paddingHorizontal: 20,
  },
  thumbnail: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedThumbnail: {
    borderColor: "#FFD700",
  },
  thumbnailImage: {
    width: 60,
    height: 60,
  },
  productInfo: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  infoCard: {
    borderRadius: 20,
    padding: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  ratingText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  reviewsText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    color: "rgba(255,255,255,0.9)",
    marginLeft: 12,
    fontSize: 14,
  },
  specsContainer: {
    marginTop: 8,
  },
  specsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  specItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  specKey: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
  },
  specValue: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  actionsContainer: {
    borderRadius: 20,
    padding: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
  },
  buyNowButton: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  buyNowText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 100,
  },
})
