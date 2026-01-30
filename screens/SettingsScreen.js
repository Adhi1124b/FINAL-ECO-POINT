import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";

const BASE_URL = "https://expobackend-ykn9.onrender.com";


const getToken = async () => {
  if (Platform.OS === "web") return localStorage.getItem("token");
  return await SecureStore.getItemAsync("token");
};

const removeToken = async () => {
  if (Platform.OS === "web") localStorage.removeItem("token");
  else await SecureStore.deleteItemAsync("token");
};

export default function SettingsScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${BASE_URL}/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }

      const data = await res.json();
      setProfile(data.user);
      setActivities(data.activities || []);
    } catch (err) {
      console.log("Profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await removeToken();
    navigation.reset({
      index: 0,
      routes: [{ name: "First" }],
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  const totalActivities = activities.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <LinearGradient colors={["#2E7D32", "#4CAF50"]} style={styles.header}>
        <View style={styles.avatarWrap}>
          <Ionicons name="person" size={44} color="#2E7D32" />
        </View>

        <Text style={styles.name}>{profile?.name}</Text>
        <Text style={styles.email}>{profile?.email}</Text>

        
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-done" size={22} color="#2E7D32" />
            <Text style={styles.statValue}>{totalActivities}</Text>
            <Text style={styles.statLabel}>Activities</Text>
          </View>
        </View>
      </LinearGradient>

      
      <Text style={styles.sectionTitle}>🌱 Activity History</Text>

      {activities.length === 0 ? (
        <Text style={styles.empty}>No activities recorded yet</Text>
      ) : (
        activities.map((item, index) => (
          <View key={index} style={styles.activityCard}>
            <View style={styles.iconCircle}>
              <Ionicons
                name={
                  item.category === "Water Conservation"
                    ? "water"
                    : item.category === "Tree Plantation"
                    ? "leaf"
                    : "recycle"
                }
                size={22}
                color="#fff"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activitySub}>
                {item.category} • {item.value}
              </Text>

              {item.impact?.co2SavedKg && (
                <Text style={styles.impact}>
                  🌿 CO₂ Saved: {item.impact.co2SavedKg} kg
                </Text>
              )}

              {item.impact?.waterSavedL && (
                <Text style={styles.impact}>
                  💧 Water Saved: {item.impact.waterSavedL} L
                </Text>
              )}
            </View>

            <Ionicons name="checkmark-circle" size={22} color="#2E7D32" />
          </View>
        ))
      )}

      
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8F5",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 34,
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  avatarWrap: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 4,
  },

  name: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
  },

  email: {
    fontSize: 13,
    color: "#E8F5E9",
    marginTop: 4,
  },

  statsRow: {
    marginTop: 18,
  },

  statCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    elevation: 3,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#2E7D32",
    marginTop: 4,
  },

  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#2C3E50",
    margin: 16,
  },

  empty: {
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },

  activityCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  activityTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2C3E50",
  },

  activitySub: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  impact: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#2E7D32",
  },

  logoutBtn: {
    backgroundColor: "#E74C3C",
    margin: 20,
    padding: 16,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
    marginLeft: 10,
  },
});
