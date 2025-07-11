"use client"

import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

export default function ConfirmationScreen() {
  const orderNumber = "HD" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const continueShopping = () => {
    router.push("/")
  }

  const trackOrder = () => {
    // In a real app, this would navigate to order tracking
    console.log("Track order:", orderNumber)
  }

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success Animation Container */}
        <View style={styles.successContainer}>
          <LinearGradient 
            colors={["rgba(78, 205, 196, 0.3)", "rgba(78, 205, 196, 0.1)"]} 
            style={styles.successCircle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.checkmarkContainer}>
              <Ionicons name="checkmark" size={60} color="#4ECDC4" />
            </View>
          </LinearGradient>

          <Text style={styles.successTitle}>Order Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Thank you for your purchase. Your order has been successfully placed.
          </Text>
        </View>

        {/* Order Details */}
        <LinearGradient 
          colors={["#0f2027", "#203a43", "#2c5364"]}
          style={styles.detailsCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.orderHeader}>
            <Text style={styles.orderTitle}>Order Details</Text>
            <View style={styles.orderNumberContainer}>
              <Text style={styles.orderNumberLabel}>Order #</Text>
              <Text style={styles.orderNumber}>{orderNumber}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="bag-outline" size={20} color="#4ECDC4" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Items Ordered</Text>
              <Text style={styles.detailValue}>3 items</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="card-outline" size={20} color="#4ECDC4" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Total Amount</Text>
              <Text style={styles.detailValue}>$1075.96</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="location-outline" size={20} color="#4ECDC4" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Delivery Address</Text>
              <Text style={styles.detailValue}>123 Main St, City, State 12345</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="time-outline" size={20} color="#4ECDC4" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Estimated Delivery</Text>
              <Text style={styles.detailValue}>{estimatedDelivery}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Shipping Info */}
        <LinearGradient 
          colors={["#0f2027", "#203a43", "#2c5364"]} 
          style={styles.shippingCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.shippingHeader}>
            <Ionicons name="truck-outline" size={24} color="#4ECDC4" />
            <Text style={styles.shippingTitle}>Shipping Information</Text>
          </View>

          <View style={styles.shippingSteps}>
            <View style={styles.shippingStep}>
              <View style={styles.stepIndicator}>
                <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Order Confirmed</Text>
                <Text style={styles.stepTime}>Just now</Text>
              </View>
            </View>

            <View style={styles.shippingStep}>
              <View style={styles.stepIndicator}>
                <View style={styles.pendingDot} />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Processing</Text>
                <Text style={styles.stepTime}>1-2 business days</Text>
              </View>
            </View>

            <View style={styles.shippingStep}>
              <View style={styles.stepIndicator}>
                <View style={styles.pendingDot} />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Shipped</Text>
                <Text style={styles.stepTime}>2-3 business days</Text>
              </View>
            </View>

            <View style={styles.shippingStep}>
              <View style={styles.stepIndicator}>
                <View style={styles.pendingDot} />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Delivered</Text>
                <Text style={styles.stepTime}>{estimatedDelivery}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* What's Next */}
        <LinearGradient 
          colors={["#0f2027", "#203a43", "#2c5364"]} 
          style={styles.nextStepsCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.nextStepsTitle}>What's Next?</Text>

          <View style={styles.nextStep}>
            <Ionicons name="mail-outline" size={20} color="#4ECDC4" />
            <Text style={styles.nextStepText}>
              You'll receive an email confirmation shortly with your order details.
            </Text>
          </View>

          <View style={styles.nextStep}>
            <Ionicons name="notifications-outline" size={20} color="#4ECDC4" />
            <Text style={styles.nextStepText}>We'll send you updates as your order progresses through each stage.</Text>
          </View>

          <View style={styles.nextStep}>
            <Ionicons name="headset-outline" size={20} color="#4ECDC4" />
            <Text style={styles.nextStepText}>Need help? Contact our support team anytime for assistance.</Text>
          </View>
        </LinearGradient>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.trackButton} onPress={trackOrder}>
          <LinearGradient 
            colors={["#0f2027", "#203a43", "#2c5364"]} 
            style={styles.trackGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="location-outline" size={20} color="white" />
            <Text style={styles.trackText}>Track Order</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton} onPress={continueShopping}>
          <LinearGradient 
            colors={["#0f2027", "#203a43", "#2c5364"]}
            style={styles.continueGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.continueText}>Continue Shopping</Text>
            <Ionicons name="arrow-forward" size={1} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  successContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  successCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  checkmarkContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(78, 205, 196, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  detailsCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.2)",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(78, 205, 196, 0.2)",
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  orderNumberContainer: {
    alignItems: "flex-end",
  },
  orderNumberLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 2,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4ECDC4",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(78, 205, 196, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  shippingCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.2)",
  },
  shippingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  shippingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 12,
  },
  shippingSteps: {
    paddingLeft: 12,
  },
  shippingStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  pendingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(78, 205, 196, 0.3)",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    marginBottom: 2,
  },
  stepTime: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
  nextStepsCard: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.2)",
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  nextStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  nextStepText: {
    flex: 1,
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 20,
    marginLeft: 12,
  },
  actionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  trackButton: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.3)",
  },
  trackGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  trackText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  continueButton: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
  },
  continueGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  continueText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
})