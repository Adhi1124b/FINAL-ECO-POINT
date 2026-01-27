import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Money() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Withdraw Money</Text>
      <Text style={styles.text}>
        Withdrawal feature coming soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6F8",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
});
