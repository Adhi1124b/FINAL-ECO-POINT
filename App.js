import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

import Login from "./screens/Login";
import Register from "./screens/Register";
import First from "./screens/first";
import Second from "./screens/second";
import Third from "./screens/third";
import AddActivity from "./screens/Activity";
import MainTabs from "./screens/MainTabs";

const BASE_URL = "https://expobackend-ykn9.onrender.com";
const Stack = createNativeStackNavigator();

// 🔐 TOKEN HELPERS
const getToken = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem("token");
  }
  return await SecureStore.getItemAsync("token");
};

const removeToken = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem("token");
  } else {
    await SecureStore.deleteItemAsync("token");
  }
};

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getToken();

      if (!token) {
        setInitialRoute("First");
        return;
      }

      // 🔍 VERIFY TOKEN WITH BACKEND
      const res = await fetch(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        await removeToken();
        setInitialRoute("First");
        return;
      }

      // ✅ TOKEN VALID
      setInitialRoute("MainTabs");
    } catch (error) {
      console.log("Auth check failed:", error);
      await removeToken();
      setInitialRoute("First");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ SPLASH / LOADER
  if (loading || !initialRoute) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4F6F8",
        }}
      >
        <ActivityIndicator size="large" color="#1E8E3E" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="First" component={First} />
        <Stack.Screen name="Second" component={Second} />
        <Stack.Screen name="Third" component={Third} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="AddActivity" component={AddActivity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
