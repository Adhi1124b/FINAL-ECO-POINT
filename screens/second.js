import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Second({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

     
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#1E8E3E" />
      </TouchableOpacity>

      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        
        <Image
          source={require("../assets/images/eco3.jpg.jpeg")}
          style={styles.image}
          resizeMode="contain"
        />

        
        <View style={styles.textBox}>
          <Text style={styles.heading}>
            Ride for a{"\n"}Greener Planet
          </Text>

          <Text style={styles.desc}>• Reduce pollution</Text>
          <Text style={styles.desc}>• Ride eco-friendly</Text>
          <Text style={styles.desc}>• Make cities better</Text>
        </View>

        
        <View style={styles.bottomSection}>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Third")}
          >
            <LinearGradient
              colors={["#1E8E3E", "#2ECC71"]}
              style={styles.swipeBtn}
            >
              <Text style={styles.swipeText}>Next</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  scrollContent: {
    alignItems: "center",
    paddingBottom: 40,
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "#EAFBF7",
    padding: 8,
    borderRadius: 20,
  },

  image: {
    width: "100%",
    height: 360,
    marginTop: 80,
  },

  textBox: {
    width: "88%",
    marginTop: 10,
  },

  heading: {
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 32,
    marginBottom: 14,
    color: "#111",
  },

  desc: {
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
    marginBottom: 6,
    fontWeight: "500",
  },

  bottomSection: {
    marginTop: 30,
    alignItems: "center",
  },

  swipeBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 8,
    elevation: 4,
  },

  swipeText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#fff",
  },

  dots: {
    flexDirection: "row",
    marginTop: 14,
    alignItems: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CFCFCF",
    marginHorizontal: 6,
  },

  activeDot: {
    backgroundColor: "#1E8E3E",
    width: 18,
  },
});
