"use client"

import { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import Modal from "react-native-modal"

const { width } = Dimensions.get("window")

export default function CheckoutScreen() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const [selectedPayment, setSelectedPayment] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ["email", "firstName", "lastName", "address", "city", "zipCode"]
    for (let field of required) {
      if (!formData[field as keyof typeof formData]) {
        Alert.alert("Missing Info", `Please enter your ${field}`)
        return false
      }
    }
    return true
  }

  const processOrder = () => {
    if (!validateForm()) return

    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      router.push("/confirmation")
    }, 2000)
  }

  const orderTotal = 1075.96

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Contact */}
        <LinearGradient colors={["#ffffff0d", "#ffffff05"]} style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="rgba(255,255,255,0.7)" />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={formData.email}
              onChangeText={(text) => updateFormData("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </LinearGradient>

        {/* Shipping */}
        <LinearGradient colors={["#ffffff0d", "#ffffff05"]} style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Ionicons name="person-outline" size={20} color="rgba(255,255,255,0.7)" />
              <TextInput
                style={styles.input}
                placeholder="First name"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={formData.firstName}
                onChangeText={(text) => updateFormData("firstName", text)}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Ionicons name="person-outline" size={20} color="rgba(255,255,255,0.7)" />
              <TextInput
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={formData.lastName}
                onChangeText={(text) => updateFormData("lastName", text)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="home-outline" size={20} color="rgba(255,255,255,0.7)" />
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={formData.address}
              onChangeText={(text) => updateFormData("address", text)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.expandedWidth]}>
              <Ionicons name="location-outline" size={20} color="rgba(255,255,255,0.7)" />
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={formData.city}
                onChangeText={(text) => updateFormData("city", text)}
              />
            </View>

            <View style={[styles.inputContainer, styles.smallWidth]}>
              <TextInput
                style={styles.input}
                placeholder="ZIP"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={formData.zipCode}
                onChangeText={(text) => updateFormData("zipCode", text)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </LinearGradient>

        {/* Summary */}
        <LinearGradient colors={["#ffffff0d", "#ffffff05"]} style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$1160.76</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>$15.99</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${orderTotal.toFixed(2)}</Text>
          </View>
        </LinearGradient>
      </ScrollView>

      {/* Place Order */}
      <View style={styles.orderContainer}>
        <TouchableOpacity style={styles.orderButton} onPress={processOrder}>
          <LinearGradient colors={["#FF512F", "#DD2476"]} style={styles.orderGradient}>
            <Ionicons name="bag-check-outline" size={20} color="white" />
            <Text style={styles.orderText}>Place Order - ${orderTotal.toFixed(2)}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Processing Modal */}
      <Modal isVisible={isProcessing} animationIn="zoomIn" animationOut="fadeOut">
        <View style={styles.modal}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.modalText}>Processing your order...</Text>
        </View>
      </Modal>
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
  section: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "white",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  expandedWidth: {
    flex: 2,
  },
  smallWidth: {
    flex: 1,
  },
  paymentOptions: {
    gap: 12,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedPaymentOption: {
    borderColor: "#4ECDC4",
  },
  paymentOptionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  cardDetails: {
    marginTop: 16,
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
  orderContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  orderButton: {
    borderRadius: 25,
    overflow: "hidden",
  },
  orderGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  orderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
    modal: {
    width: width * 0.8,
    alignSelf: "center",
    backgroundColor: "#1c1c1e",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  modalText: {
    color: "white",
    fontSize: 16,
    marginTop: 16,
  },

})
