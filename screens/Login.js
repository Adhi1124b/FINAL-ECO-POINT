import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://expobackend-ykn9.onrender.com";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  const showAlert = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const validateForm = () => {
    if (!email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";

    if (!password) return "Password is required";

    if (password.length < 6)
      return "Password must be at least 6 characters";

    return null;
  };

  const handleLogin = async () => {
    const error = validateForm();
    if (error) {
      showAlert("Validation Error", error);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ FIX: Platform-based token storage
        if (Platform.OS === "web") {
          localStorage.setItem("token", data.token);
        } else {
          await SecureStore.setItemAsync("token", data.token);
        }

        navigation.replace("MainTabs");
      } else {
        showAlert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (err) {
      console.log("Login Error:", err);
      showAlert("Error", err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

        <Text style={styles.headerTitle}>Welcome Back</Text>
        <Text style={styles.headerSubtitle}>
          Login to continue your eco journey 🌱
        </Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="Enter your e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
{/* 
        <Text style={styles.label}>Password</Text>
        <TextInput
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
          style={[styles.loginBtn, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginText}>
            {loading ? "Logging in..." : "LOGIN"}
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Create new account</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8" },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backBtn: { position: "absolute", top: 55, left: 20 },
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
  loginBtn: {
    backgroundColor: "#1E8E3E",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  forgot: {
    textAlign: "center",
    marginTop: 14,
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },
  registerLink: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 14,
    fontWeight: "800",
    color: "#1E8E3E",
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
  color: "#000", // ✅ PASSWORD TEXT BLACK
},

eyeBtn: {
  paddingHorizontal: 14,
},

});
