import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://expobackend-ykn9.onrender.com";


const getToken = async () => {
  if (Platform.OS === "web") return localStorage.getItem("token");
  return await SecureStore.getItemAsync("token");
};

export default function DashboardScreen() {
  const [stats, setStats] = useState({});
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [leaders, setLeaders] = useState([]);

  const loadData = async () => {
    const token = await getToken();

    const d = await fetch(`${BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json());

    const p = await fetch(`${BASE_URL}/points`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json());

    const b = await fetch(`${BASE_URL}/badges`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json());

    const l = await fetch(`${BASE_URL}/leaderboard`).then(r => r.json());

    setStats(d);
    setPoints(p.totalPoints || 0);
    setBadges(b.badges || []);
    setLeaders(l || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <LinearGradient colors={["#1E8E3E", "#2ECC71"]} style={styles.hero}>
        <Text style={styles.welcome}>Welcome back 🌿</Text>
        <Text style={styles.points}>{points}</Text>
        <Text style={styles.level}>Eco Points</Text>
      </LinearGradient>

      
      <Section title="🏅 Your Badges">
        {badges.length === 0 ? (
          <Text style={styles.emptyText}>No badges unlocked yet</Text>
        ) : (
          <View style={styles.badgeWrap}>
            {badges.map((b, i) => (
              <View key={i} style={styles.badgeChip}>
                <Text style={styles.badgeText}>{b}</Text>
              </View>
            ))}
          </View>
        )}
      </Section>

      
      <Section title="📊 Impact Summary">
        <StatRow label="Total Activities" value={stats.totalActivities} />
        <StatRow label="CO₂ Saved" value={`${stats.totalCO2 || 0} kg`} />
        <StatRow label="Water Saved" value={`${stats.totalWater || 0} L`} />
      </Section>

     
      <Section title="🏆 Leaderboard">
        {leaders.length === 0 ? (
          <Text style={styles.emptyText}>No rankings available</Text>
        ) : (
          <View style={styles.table}>
            
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.cellRank, styles.headerText]}>RANK</Text>
              <Text style={[styles.cellName, styles.headerText]}>USER</Text>
              <Text style={[styles.cellPoints, styles.headerText]}>POINTS</Text>
            </View>

           
            {leaders.map((item, index) => (
              <View
                key={item.rank}
                style={[
                  styles.tableRow,
                  index === 0 && styles.goldRow,
                  index === 1 && styles.silverRow,
                  index === 2 && styles.bronzeRow,
                ]}
              >
                <Text style={styles.cellRank}>
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${item.rank}`}
                </Text>
                <Text style={styles.cellName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.cellPoints}>{item.points}</Text>
              </View>
            ))}
          </View>
        )}
      </Section>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}


const Section = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const StatRow = ({ label, value }) => (
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  
  hero: {
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  welcome: {
    color: "#EAFBF7",
    fontSize: 14,
  },
  points: {
    fontSize: 44,
    fontWeight: "900",
    color: "#fff",
    marginVertical: 4,
  },
  level: {
    color: "#DFF6F0",
    fontSize: 13,
    fontWeight: "600",
  },

  
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
    color: "#222",
  },

  
  badgeWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badgeChip: {
    backgroundColor: "#E8F8F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E8E3E",
  },

  
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E8E3E",
  },


  table: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5EFEA",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tableHeader: {
    backgroundColor: "#1E8E3E",
  },
  headerText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },
  cellRank: {
    width: "20%",
    fontWeight: "800",
    fontSize: 13,
    color: "#333",
  },
  cellName: {
    width: "50%",
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  cellPoints: {
    width: "30%",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "800",
    color: "#1E8E3E",
  },

  
  goldRow: {
    backgroundColor: "#FFF9E6",
  },
  silverRow: {
    backgroundColor: "#F4F6F8",
  },
  bronzeRow: {
    backgroundColor: "#FFF1E8",
  },

  emptyText: {
    fontSize: 13,
    color: "#777",
  },
});
