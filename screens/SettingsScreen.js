// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function SettingsScreen({ navigation }) {

//   const history = [
//     {
//       id: 1,
//       title: "Water Saved",
//       desc: "Saved 10L water",
//       date: "Today · 10:00 AM",
//       points: "+20 pts",
//     },
//     {
//       id: 2,
//       title: "Plastic Recycled",
//       desc: "Recycled plastic bottle",
//       date: "Yesterday · 5:30 PM",
//       points: "+30 pts",
//     },
//     {
//       id: 3,
//       title: "Public Transport",
//       desc: "Used bus instead of bike",
//       date: "2 days ago · 9:15 AM",
//       points: "+15 pts",
//     },
//   ];

//   const handleLogout = () => {
//     navigation.replace("Login"); 
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

//       <Text style={styles.title}>Settings ⚙️</Text>

//       <SettingItem icon="person" text="Profile" />
//       <SettingItem icon="notifications" text="Notifications" />
//       <SettingItem icon="shield-checkmark" text="Privacy & Security" />
//       <SettingItem icon="help-circle" text="Help & Support" />

//       <Text style={styles.section}>Record History</Text>

//       {history.map((item) => (
//         <View key={item.id} style={styles.historyCard}>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.historyTitle}>{item.title}</Text>
//             <Text style={styles.historyDesc}>{item.desc}</Text>
//             <Text style={styles.historyDate}>{item.date}</Text>
//           </View>
//           <Text style={styles.historyPoints}>{item.points}</Text>
//         </View>
//       ))}

//       {/* LOGOUT */}
//       <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//         <Ionicons name="log-out" size={20} color="#fff" />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>

//     </ScrollView>
//   );
// }

// const SettingItem = ({ icon, text }) => (
//   <View style={styles.settingItem}>
//     <Ionicons name={icon} size={22} color="#1E8E3E" />
//     <Text style={styles.settingText}>{text}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F4F9F6",
//     padding: 20,
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#1E8E3E",
//     marginBottom: 20,
//   },

//   settingItem: {
//     backgroundColor: "#ffffff",
//     borderRadius: 14,
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//     elevation: 2,
//   },
//   settingText: {
//     marginLeft: 15,
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#2C3E50",
//   },

//   section: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#2C3E50",
//     marginTop: 20,
//     marginBottom: 10,
//   },

//   historyCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     elevation: 2,
//   },
//   historyTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#2E5D4B",
//   },
//   historyDesc: {
//     fontSize: 12,
//     color: "#6E8F7C",
//     marginTop: 2,
//   },
//   historyDate: {
//     fontSize: 11,
//     color: "#95A5A6",
//     marginTop: 2,
//   },
//   historyPoints: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#1E8E3E",
//   },

//   logoutBtn: {
//     marginTop: 30,
//     backgroundColor: "#E74C3C",
//     padding: 14,
//     borderRadius: 14,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logoutText: {
//     color: "#ffffff",
//     fontWeight: "700",
//     marginLeft: 10,
//   },
// });

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

const BASE_URL = "https://expobackend-ykn9.onrender.com";

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

export default function SettingsScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const token = await getToken();

      const res = await fetch(`${BASE_URL}/settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }

      const data = await res.json();
      setProfile(data.user);
      setActivities(data.activities || []);
    } catch (err) {
      console.log("Settings Error:", err);
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
        <ActivityIndicator size="large" color="#1E8E3E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* PROFILE */}
      <View style={styles.profileCard}>
        <Ionicons name="person-circle" size={80} color="#1E8E3E" />
        <Text style={styles.profileName}>{profile?.name || "User"}</Text>
        <Text style={styles.profileEmail}>{profile?.email}</Text>
      </View>

      {/* HISTORY */}
      <Text style={styles.section}>Activity History</Text>

      {activities.length === 0 ? (
        <Text style={styles.emptyText}>No activities recorded yet</Text>
      ) : (
        activities.map((item, index) => (
          <View key={index} style={styles.historyCard}>
            <Text style={styles.historyTitle}>{item.title}</Text>
            <Text style={styles.historySub}>
              {item.category} • {item.value}
            </Text>

            {item.impact?.co2SavedKg && (
              <Text style={styles.impact}>
                🌱 CO₂ Saved: {item.impact.co2SavedKg} kg
              </Text>
            )}

            {item.impact?.waterSavedL && (
              <Text style={styles.impact}>
                💧 Water Saved: {item.impact.waterSavedL} L
              </Text>
            )}
          </View>
        ))
      )}

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9F6",
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    elevation: 3,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2C3E50",
    marginTop: 8,
  },

  profileEmail: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 4,
  },

  section: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2C3E50",
    marginBottom: 12,
  },

  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  historyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2C3E50",
  },

  historySub: {
    fontSize: 13,
    color: "#7F8C8D",
    marginTop: 4,
  },

  impact: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#1E8E3E",
  },

  emptyText: {
    textAlign: "center",
    color: "#95A5A6",
    marginVertical: 20,
    fontSize: 14,
  },

  logoutBtn: {
    marginTop: 30,
    backgroundColor: "#E74C3C",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 10,
    fontSize: 15,
  },
});
