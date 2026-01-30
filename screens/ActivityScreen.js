import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ActivityScreen({ navigation }) {
  const activities = [
    {
      title: "Recycle Plastic",
      category: "Waste Reduction",
      desc: "Recycle plastic waste and keep the environment clean",
      impact: "1 kg plastic = 1.5 kg CO₂ saved",
      points: "15 points per kg",
      icon: "trash",
      color: "#2ECC71",
    },
    {
      title: "Tree Plantation",
      category: "Tree Plantation",
      desc: "Plant a tree and contribute to a greener future",
      impact: "1 tree = 21 kg CO₂ saved per year",
      points: "50 points per tree",
      icon: "leaf",
      color: "#27AE60",
    },
    {
      title: "Water Recycling",
      category: "Water Conservation",
      desc: "Reuse water and reduce water wastage",
      impact: "1 liter = 1 liter water saved",
      points: "5 points per liter",
      icon: "water",
      color: "#3498DB",
    },
    {
      title: "Rain Water Harvesting",
      category: "Water Conservation",
      desc: "Save rainwater for sustainable usage",
      impact: "1 liter = 1 liter water saved",
      points: "5 points per liter",
      icon: "cloud-rain",
      color: "#5DADE2",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.heading}>🌍 Eco Activities</Text>
      <Text style={styles.subHeading}>
        Record activities, earn points & unlock badges
      </Text>

      
      {activities.map((item, index) => (
        <View key={index} style={styles.card}>
          
          <View style={[styles.iconBox, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon} size={26} color="#fff" />
          </View>

          
          <View style={styles.textBox}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>

            <View style={styles.infoRow}>
              <Ionicons name="leaf" size={14} color="#1E8E3E" />
              <Text style={styles.infoText}>{item.impact}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="target" size={14} color="#E67E22" />
              <Text style={styles.pointsText}>{item.points}</Text>
            </View>
          </View>

          
          <View style={styles.startBtnWrap}>
            <TouchableOpacity
              style={styles.startBtn}
              onPress={() =>
                navigation.navigate("AddActivity", {
                  category: item.category,
                  title: item.title,
                })
              }
            >
              <Text style={styles.startText}>START</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      
      <View style={styles.rulesContainer}>
        <Text style={styles.rulesTitle}>🏆 How Points & Badges Work</Text>

        <RuleItem icon="trash" text="Waste Reduction" value="15 points per kg" />
        <RuleItem icon="leaf" text="Tree Plantation" value="50 points per tree" />
        <RuleItem icon="water" text="Water Conservation" value="5 points per liter" />
        <RuleItem icon="bicycle" text="Green Transport" value="10 points per km" />
        <RuleItem icon="flash" text="Energy Saving" value="8 points per unit" />
      </View>

      
      <View style={styles.rulesContainer}>
        <Text style={styles.rulesTitle}>🎖️ Badges Unlock Automatically</Text>

        <BadgeItem icon="water" text="Water Saver" value="10 water activities" />
        <BadgeItem icon="leaf" text="Tree Hero" value="5 tree plantations" />
        <BadgeItem icon="trash" text="Waste Warrior" value="10 waste activities" />
        <BadgeItem icon="earth" text="Eco Champion" value="50 total activities" />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}



const RuleItem = ({ icon, text, value }) => (
  <View style={styles.ruleRow}>
    <View style={styles.ruleIcon}>
      <Ionicons name={icon} size={18} color="#1E8E3E" />
    </View>
    <Text style={styles.ruleText}>
      {text} – <Text style={styles.ruleBold}>{value}</Text>
    </Text>
  </View>
);

const BadgeItem = ({ icon, text, value }) => (
  <View style={styles.ruleRow}>
    <View style={styles.badgeIcon}>
      <Ionicons name={icon} size={18} color="#27AE60" />
    </View>
    <Text style={styles.ruleText}>
      {text} – <Text style={styles.ruleBold}>{value}</Text>
    </Text>
  </View>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 16,
  },

  heading: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1E8E3E",
  },
  subHeading: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center", // 🔥 vertical centering
    elevation: 3,
  },

  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  textBox: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222",
  },

  desc: {
    fontSize: 13,
    color: "#666",
    marginVertical: 6,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  infoText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#1E8E3E",
  },

  pointsText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#E67E22",
  },

  startBtnWrap: {
    width: 110,               // 🔥 balanced right space
    justifyContent: "center",
    alignItems: "center",
  },

  startBtn: {
    backgroundColor: "#1E8E3E",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },

  startText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },

  rulesContainer: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    marginTop: 16,
    elevation: 2,
  },

  rulesTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
    color: "#222",
  },

  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6FBF8",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },

  ruleIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#E8F8F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  badgeIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EAFBF7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  ruleText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },

  ruleBold: {
    fontWeight: "800",
    color: "#1E8E3E",
  },
});
