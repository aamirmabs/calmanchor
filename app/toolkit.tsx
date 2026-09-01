import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import Pdf from "react-native-pdf";
import { toolkitSource } from "../lib/toolkit";

export default function ToolkitScreen() {
  return (
    <View style={styles.container}>
      <Pdf
        source={toolkitSource}
        style={styles.pdf}
        trustAllCerts={false}
        renderActivityIndicator={() => <ActivityIndicator size="large" />}
        onError={(error) => console.log("PDF error:", error)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F1EB" },
  pdf: { flex: 1, width: Dimensions.get("window").width },
});
