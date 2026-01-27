import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

//const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const BASE_URL = "https://expobackend-ykn9.onrender.com";


export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Registered successfully");
        navigation.replace("Login");
      } else {
        Alert.alert("Registration Failed", data.message || "Try again");
      }
    } catch (err) {
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Gradient */}
      <LinearGradient
        colors={["#1E8E3E", "#2ECC71", "#27AE60"]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Create Account</Text>
        <Text style={styles.headerSubtitle}>
          Join the eco-friendly journey 🌱
        </Text>
      </LinearGradient>

      {/* Register Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="Enter your e-mail"
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* <TextInput
          placeholder="Enter your password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        /> */}
        <Text style={styles.label}>Password</Text>

<View style={styles.passwordWrapper}>
  <TextInput
    placeholder="Enter your password"
    placeholderTextColor="#888"
    secureTextEntry={!showPassword}
    style={styles.passwordInput}
    value={password}
    onChangeText={setPassword}
  />

  <TouchableOpacity
    style={styles.eyeBtn}
    onPress={() => setShowPassword(!showPassword)}
  >
    <Ionicons
      name={showPassword ? "eye-off" : "eye"}
      size={22}
      color="#555"
    />
  </TouchableOpacity>
</View>


        <TouchableOpacity
          style={styles.registerBtn}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerText}>
            {loading ? "Registering..." : "REGISTER"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backBtn: {
    position: "absolute",
    top: 55,
    left: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    marginTop: 20,
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#EAFBF7",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 22,
    elevation: 5,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#F1F8F4",
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0EEE7",
  },

  registerBtn: {
    backgroundColor: "#1E8E3E",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },

  registerText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  loginLink: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
    fontWeight: "700",
    color: "#1E8E3E",
  },
  input: {
  backgroundColor: "#F1F8F4",
  borderRadius: 14,
  padding: 14,
  fontSize: 15,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#E0EEE7",
  color: "#000",              // ✅ TEXT BLACK (APK FIX)
},
passwordWrapper: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F1F8F4",
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#E0EEE7",
  marginBottom: 16,
},

passwordInput: {
  flex: 1,
  padding: 14,
  fontSize: 15,
  color: "#000",              // ✅ PASSWORD TEXT BLACK
},

eyeBtn: {
  paddingHorizontal: 14,
},

});
