import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://expobackend-ykn9.onrender.com";


const getToken = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem("token");
  }
  return await SecureStore.getItemAsync("token");
};

export default function AddActivity({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { category: navCategory, title: navTitle } = route?.params || {};

  
  const showAlert = (title, message, callback) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      callback && callback();
    } else {
      Alert.alert(title, message, [{ text: "OK", onPress: callback }]);
    }
  };

 
  useEffect(() => {
    if (navCategory) setCategory(navCategory);
    if (navTitle) setTitle(navTitle);
  }, [navCategory, navTitle]);

  const getDynamicLabel = () => {
    switch (category) {
      case "Green Transportation":
        return "Distance Covered (km)";
      case "Water Conservation":
        return "Water Saved (liters)";
      case "Tree Plantation":
        return "Number of Trees Planted";
      case "Energy Saving":
        return "Units Saved (kWh)";
      case "Waste Reduction":
        return "Waste Reduced (kg)";
      default:
        return "";
    }
  };

  
  const handleSubmit = async () => {
    if (!title.trim()) {
      showAlert("Validation Error", "Activity title is required");
      return;
    }

    if (!category) {
      showAlert("Validation Error", "Please select a category");
      return;
    }

    if (!value || isNaN(value) || Number(value) <= 0) {
      showAlert("Validation Error", "Please enter a valid numeric value");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      if (!token) {
        showAlert("Session Expired", "Please login again", () =>
          navigation.replace("Login")
        );
        return;
      }

      const response = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          category,
          description,
          date,
          location,
          value,
          activityType: "Personal",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert("Success", "Activity recorded successfully 🌱", () => {
          navigation.replace("MainTabs", { screen: "Dashboard" });
        });
      } else {
        showAlert("Error", data.message || "Submission failed");
      }
    } catch (err) {
      showAlert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={26} color="#1E8E3E" />
      </TouchableOpacity>

      <Text style={styles.heading}>Add Eco Activity</Text>

      <TextInput
        style={styles.input}
        placeholder="Activity Title *"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(val) => {
            setCategory(val);
            setValue("");
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select Category *" value="" />
          <Picker.Item label="Green Transportation" value="Green Transportation" />
          <Picker.Item label="Water Conservation" value="Water Conservation" />
          <Picker.Item label="Tree Plantation" value="Tree Plantation" />
          <Picker.Item label="Energy Saving" value="Energy Saving" />
          <Picker.Item label="Waste Reduction" value="Waste Reduction" />
        </Picker>
      </View>

      {category !== "" && (
        <TextInput
          style={styles.input}
          placeholder={getDynamicLabel()}
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />
      )}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledBtn]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Submitting..." : "SUBMIT ACTIVITY"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F6F8",
    flexGrow: 1,
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 15,
    zIndex: 10,
  },

  heading: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 20,
    color: "#1E8E3E",
    textAlign: "center",
    marginTop: 40,
  },

  input: {
    backgroundColor: "#F1F8F4",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E0EEE7",
    fontSize: 15,
    height: 52,
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  pickerWrapper: {
    backgroundColor: "#F1F8F4",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E0EEE7",
    marginBottom: 14,
    overflow: "hidden",
    justifyContent: "center",
    height: 52,
  },

  picker: {
    backgroundColor: "#F1F8F4",
    height: 52,
    paddingHorizontal: 12,
    ...Platform.select({
      web: {
        appearance: "none",
        outlineStyle: "none",
      },
    }),
  },

  button: {
    backgroundColor: "#1E8E3E",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  disabledBtn: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
