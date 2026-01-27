import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/theme";

const governmentProjects = [
  {
    id: "gov1",
    name: "Swachh Bharat Mission (Phase II)",
    type: "Government",
    focus: "Cleanliness & Waste Management",
    description:
      "Nationwide mission for sanitation, waste segregation, and garbage-free cities and villages.",
    url: "https://swachhbharatmission.gov.in",
  },
  {
    id: "gov2",
    name: "Namami Gange Programme",
    type: "Government",
    focus: "Water Conservation",
    description:
      "Project to clean and protect the River Ganga through sewage treatment, pollution control, and awareness.",
    url: "https://nmcg.nic.in",
  },
  {
    id: "gov3",
    name: "Green India Mission",
    type: "Government",
    focus: "Afforestation & Climate",
    description:
      "Increasing forest cover and restoring ecosystems to fight climate change.",
    url: "https://www.indiascienceandtechnology.gov.in/st-visions/national-mission/national-mission-green-india-gim",
  },
  {
    id: "gov4",
    name: "National Solar Mission",
    type: "Government",
    focus: "Renewable Energy",
    description:
      "Promotes solar power adoption to reduce carbon emissions.",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2199729&reg=3&lang=2",
  },
];

const ngoProjects = [
  {
    id: "ngo1",
    name: "Earth5R Environmental Projects",
    type: "NGO",
    focus: "Waste, Water, Climate",
    description:
      "Community-driven projects on recycling, river cleanup, and sustainability education.",
    url: "https://earth5r.org",
  },
  {
    id: "ngo2",
    name: "TERI Clean Energy Programs",
    type: "NGO",
    focus: "Energy & Sustainability",
    description:
      "Promotes clean cooking, renewable energy, and sustainable development.",
    url: "https://www.teriin.org",
  },
  {
    id: "ngo3",
    name: "Pond Revival & Water Conservation Movement",
    type: "NGO",
    focus: "Water Conservation",
    description:
      "Restoring ponds and lakes to improve groundwater levels and ecosystems.",
    url: "https://www.indiawaterportal.org",
  },
  {
    id: "ngo4",
    name: "ATREE Biodiversity Conservation",
    type: "NGO",
    focus: "Biodiversity",
    description:
      "Protects wildlife and ecosystems through research and community participation.",
    url: "https://www.atree.org",
  },
];

const ProjectCard = ({ project }) => {
  const isGov = project.type === "Government";
  const badgeColor = isGov ? COLORS.badgeGov : COLORS.badgeNgo;

  const openProject = async () => {
    const supported = await Linking.canOpenURL(project.url);

    if (supported) {
      await Linking.openURL(project.url);
    } else {
      Alert.alert("Error", "Unable to open link");
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{project.type}</Text>
        </View>
        <Text style={styles.focusText}>{project.focus}</Text>
      </View>

      <Text style={styles.cardTitle}>{project.name}</Text>
      <Text style={styles.cardDescription}>{project.description}</Text>

      <TouchableOpacity
        style={[styles.button, { borderColor: badgeColor }]}
        onPress={openProject}
      >
        <Text style={[styles.buttonText, { color: badgeColor }]}>
          View / Track Project
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ProjectsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Eco Projects</Text>
        <Text style={styles.headerSubtitle}>
          Initiatives making a difference in India
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Government Initiatives</Text>
        {governmentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <Text style={styles.sectionTitle}>NGO Initiatives</Text>
        {ngoProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === "android" ? 50 : 60,
    },
    header: {
        paddingHorizontal: 24,
        paddingBottom: 15,
        backgroundColor: COLORS.background,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: "800",
        color: COLORS.textPrimary,
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 15,
        color: COLORS.textSecondary,
        marginTop: 4,
        fontWeight: "500",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.textPrimary, 
        marginTop: 20,
        marginBottom: 15,
        marginLeft: 4,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.shadowClrr,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
            },
        }),
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        color: COLORS.textLight,
        fontSize: 12,
        fontWeight: "700",
        textTransform: "uppercase",
    },
    focusText: {
        fontSize: 12,
        color: COLORS.inactive, 
        fontWeight: "600",
        textTransform: "uppercase",
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 8,
        lineHeight: 26,
    },
    cardDescription: {
        fontSize: 14,
        color: "#666",
        lineHeight: 22,
        marginBottom: 16,
    },
    button: {
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "700",
    },
});
