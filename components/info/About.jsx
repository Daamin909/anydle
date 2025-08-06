import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import Box from "../input/Box";
import ClosePopup from "../common/ClosePopup";

const About = ({ isAboutVisible, setIsAboutVisible }) => {
  return (
    <View>
      <Portal>
        <Modal
          visible={isAboutVisible}
          onDismiss={() => setIsAboutVisible(false)}
          contentContainerStyle={styles.container}
          dismissableBackButton={true}
        >
          <ClosePopup onPress={() => setIsAboutVisible(false)} />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>How To Play</Text>
            <Text style={styles.subtitle}>Guess the Anydle in 6 tries.</Text>

            <View style={styles.bulletList}>
              <Text style={styles.bullet}>
                Each guess must be a valid 5-letter word.
              </Text>
              <Text style={styles.bullet}>
                The color of the tiles will change to show how close your guess
                was to the word.
              </Text>
            </View>

            <Text style={styles.examples}>Examples</Text>

            <View style={styles.row}>
              <Box
                letter="W"
                bgStyles={[styles.G_bg, { marginLeft: 0 }]}
                fgStyles={styles.G_fg}
              />
              <Box letter="O" bgStyles={styles.bg} fgStyles={styles.fg} />
              <Box letter="R" bgStyles={styles.bg} fgStyles={styles.fg} />
              <Box letter="D" bgStyles={styles.bg} fgStyles={styles.fg} />
              <Box letter="Y" bgStyles={styles.bg} fgStyles={styles.fg} />
            </View>
            <Text style={styles.explanation}>
              <Text style={styles.bold}>W</Text> is in the word and in the
              correct spot.
            </Text>

            <View style={styles.row}>
              <Box
                letter="L"
                bgStyles={[styles.bg, { marginLeft: 0 }]}
                fgStyles={styles.fg}
              />
              <Box letter="I" bgStyles={styles.Y_bg} fgStyles={styles.Y_fg} />
              <Box letter="G" bgStyles={styles.bg} fgStyles={styles.fg} />
              <Box letter="H" bgStyles={styles.bg} fgStyles={styles.fg} />
              <Box letter="T" bgStyles={styles.bg} fgStyles={styles.fg} />
            </View>
            <Text style={styles.explanation}>
              <Text style={styles.bold}>I</Text> is in the word but in the wrong
              spot.
            </Text>
            <View style={styles.row}>
              <Box
                letter="R"
                bgStyles={[styles.bg, { marginLeft: 0 }]}
                fgStyles={styles.fg}
              />
              <Box letter="O" bgStyles={styles.bg} fgStyles={styles.fg} />
              <Box letter="G" bgStyles={styles.bg} fgStyles={styles.fg} />
              <Box letter="U" bgStyles={styles.B_bg} fgStyles={styles.B_fg} />
              <Box letter="E" bgStyles={styles.bg} fgStyles={styles.fg} />
            </View>
            <Text style={styles.explanation}>
              <Text style={styles.bold}>U</Text> is not in the word in any spot.
            </Text>
            <View style={styles.divider} />

            <Text style={styles.footer}>
              With Anydle, you can use custom categories of words from a preset.
              Click on the ⚙️ icon on the top.
            </Text>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};
export default About;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121213",
    marginHorizontal: 16,
    borderRadius: 12,
    maxHeight: "90%",
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: "800", color: "#fff", marginBottom: 4 },
  subtitle: { fontSize: 16, color: "#fff", marginBottom: 12 },
  bulletList: { marginBottom: 20 },
  bullet: { color: "#fff", fontSize: 15, marginBottom: 4 },
  examples: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 8,
  },
  row: { flexDirection: "row", marginBottom: 8 },
  explanation: { color: "#fff", marginBottom: 16, fontSize: 15 },
  bold: { fontWeight: "bold" },
  divider: {
    height: 1,
    backgroundColor: "#3a3a3c",
    marginVertical: 20,
    marginTop: 10,
  },
  login: {
    color: "#8ab4f8",
    fontSize: 15,
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  footer: { color: "#fff", fontSize: 14, lineHeight: 20 },
  link: { color: "#8ab4f8", textDecorationLine: "underline" },
  G_bg: { backgroundColor: "#538d4e", borderWidth: 0, width: 55, height: 55 },
  Y_bg: { backgroundColor: "#b59f3b", borderWidth: 0, width: 55, height: 55 },
  B_bg: { backgroundColor: "#3a3a3c", borderWidth: 0, width: 55, height: 55 },
  G_fg: { color: "#f8f8f8", fontSize: 35 },
  Y_fg: { color: "#f8f8f8", fontSize: 35 },
  B_fg: { color: "#fff", fontSize: 35 },
  bg: { width: 55, height: 55 },
  fg: { fontSize: 35 },
});
