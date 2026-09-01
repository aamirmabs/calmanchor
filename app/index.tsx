import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calm Anchor</Text>
      <Text style={styles.subtitle}>CPTSD Workbook & Toolkit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F1EB",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A13",
  },
  subtitle: {
    fontSize: 16,
    color: "#5A5645",
    marginTop: 8,
  },
});
