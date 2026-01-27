
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function ActivityScreen({ navigation }) {
//   const activities = [
//     {
//       title: "Recycle Plastic",
//       category: "Waste Reduction",
//       desc: "Recycle plastic waste and keep the environment clean",
//       points: 20,
//       impact: "1 kg plastic = 1.5 kg CO₂ saved",
//       icon: "trash-bin",
//       color: "#1ABC9C",
//     },
//     {
//       title: "Tree Plantation",
//       category: "Tree Plantation",
//       desc: "Plant a tree and contribute to a greener future",
//       points: 50,
//       impact: "1 tree = 21 kg CO₂ saved / year",
//       icon: "leaf",
//       color: "#27AE60",
//     },
//     {
//       title: "Water Recycling",
//       category: "Water Conservation",
//       desc: "Reuse water and reduce water wastage",
//       points: 30,
//       impact: "1 liter = 1 liter water saved",
//       icon: "water",
//       color: "#3498DB",
//     },
//     {
//       title: "Rain Water Harvesting",
//       category: "Water Conservation",
//       desc: "Save rainwater for sustainable usage",
//       points: 40,
//       impact: "1 liter = 1 liter water saved",
//       icon: "cloud-rain",
//       color: "#5DADE2",
//     },
//   ];

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <Text style={styles.heading}>🌍 Eco Activities</Text>
//       <Text style={styles.subHeading}>
//         Choose an activity & see your real environmental impact
//       </Text>

//       {activities.map((item, index) => (
//         <View key={index} style={styles.card}>
//           <View style={[styles.iconBox, { backgroundColor: item.color }]}>
//             <Ionicons name={item.icon} size={28} color="#fff" />
//           </View>

//           <View style={styles.textBox}>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.desc}>{item.desc}</Text>

//             {/* 🌱 Impact Info */}
//             <View style={styles.impactRow}>
//               <Ionicons name="leaf" size={14} color="#1E8E3E" />
//               <Text style={styles.impactText}>{item.impact}</Text>
//             </View>

//             <View style={styles.bottomRow}>
//               <Text></Text>
//               {/* <Text style={styles.points}>+{item.points} Points</Text> */}

//               <TouchableOpacity
//                 style={styles.startBtn}
//                 onPress={() =>
//                   navigation.navigate("AddActivity", {
//                     category: item.category,
//                     title: item.title,
//                   })
//                 }
//               >
//                 <Text style={styles.startText}>START</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       ))}

//       <View style={{ height: 30 }} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F4F6F8",
//     padding: 16,
//   },

//   heading: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: "#1E8E3E",
//   },

//   subHeading: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 16,
//   },

//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     padding: 16,
//     marginBottom: 14,
//     flexDirection: "row",
//     elevation: 3,
//   },

//   iconBox: {
//     width: 52,
//     height: 52,
//     borderRadius: 14,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   textBox: {
//     flex: 1,
//     marginLeft: 14,
//   },

//   title: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#222",
//   },

//   desc: {
//     fontSize: 13,
//     color: "#666",
//     marginVertical: 6,
//   },

//   impactRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },

//   impactText: {
//     marginLeft: 6,
//     fontSize: 12,
//     fontWeight: "700",
//     color: "#1E8E3E",
//   },

//   bottomRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   points: {
//     color: "#1E8E3E",
//     fontWeight: "700",
//     fontSize: 14,
//   },

//   startBtn: {
//     backgroundColor: "#1E8E3E",
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },

//   startText: {
//     color: "#fff",
//     fontWeight: "800",
//     fontSize: 13,
//   },
// });


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* POINT RULES (frontend display only) */
const POINT_RULES = {
  "Waste Reduction": "15 points per kg",
  "Tree Plantation": "50 points per tree",
  "Water Conservation": "5 points per liter",
  "Green Transportation": "10 points per km",
  "Energy Saving": "8 points per unit",
};

export default function ActivityScreen({ navigation }) {
  const activities = [
    {
      title: "Recycle Plastic",
      category: "Waste Reduction",
      desc: "Recycle plastic waste and keep the environment clean",
      impact: "1 kg plastic = 1.5 kg CO₂ saved",
      icon: "trash-bin",
      color: "#1ABC9C",
    },
    {
      title: "Tree Plantation",
      category: "Tree Plantation",
      desc: "Plant a tree and contribute to a greener future",
      impact: "1 tree = 21 kg CO₂ saved per year",
      icon: "leaf",
      color: "#27AE60",
    },
    {
      title: "Water Recycling",
      category: "Water Conservation",
      desc: "Reuse water and reduce water wastage",
      impact: "1 liter = 1 liter water saved",
      icon: "water",
      color: "#3498DB",
    },
    {
      title: "Rain Water Harvesting",
      category: "Water Conservation",
      desc: "Save rainwater for sustainable usage",
      impact: "1 liter = 1 liter water saved",
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
            <Ionicons name={item.icon} size={28} color="#fff" />
          </View>

          <View style={styles.textBox}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>

            {/* Impact */}
            <View style={styles.impactRow}>
              <Ionicons name="leaf" size={14} color="#1E8E3E" />
              <Text style={styles.impactText}>{item.impact}</Text>
            </View>

            {/* Points Info */}
            <Text style={styles.points}>
              🎯 {POINT_RULES[item.category]}
            </Text>

            <View style={styles.bottomRow}>
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
        </View>
      ))}

      {/* RULES SECTION */}
      <View style={styles.rulesCard}>
        <Text style={styles.rulesTitle}>🏆 How Points & Badges Work</Text>

        <Text style={styles.rule}>• Waste Reduction: 15 points per kg</Text>
        <Text style={styles.rule}>• Tree Plantation: 50 points per tree</Text>
        <Text style={styles.rule}>• Water Conservation: 5 points per liter</Text>
        <Text style={styles.rule}>• Green Transport: 10 points per km</Text>
        <Text style={styles.rule}>• Energy Saving: 8 points per unit</Text>

        <Text style={styles.ruleBadge}>🏅 Badges Unlock Automatically:</Text>
        <Text style={styles.rule}>• 💧 Water Saver – 10 water activities</Text>
        <Text style={styles.rule}>• 🌳 Tree Hero – 5 tree plantations</Text>
        <Text style={styles.rule}>• ♻️ Waste Warrior – 10 waste activities</Text>
        <Text style={styles.rule}>• 🌍 Eco Champion – 50 total activities</Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8", padding: 16 },
  heading: { fontSize: 26, fontWeight: "900", color: "#1E8E3E" },
  subHeading: { fontSize: 14, color: "#555", marginBottom: 16 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    elevation: 3,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  textBox: { flex: 1, marginLeft: 14 },
  title: { fontSize: 16, fontWeight: "800", color: "#222" },
  desc: { fontSize: 13, color: "#666", marginVertical: 6 },

  impactRow: { flexDirection: "row", alignItems: "center" },
  impactText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#1E8E3E",
  },

  points: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#2C3E50",
  },

  bottomRow: { marginTop: 10, alignItems: "flex-end" },
  startBtn: {
    backgroundColor: "#1E8E3E",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startText: { color: "#fff", fontWeight: "800", fontSize: 13 },

  rulesCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    marginTop: 10,
  },
  rulesTitle: { fontSize: 16, fontWeight: "800", marginBottom: 8 },
  rule: { fontSize: 13, color: "#444", marginBottom: 4 },
  ruleBadge: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 4,
  },
});

