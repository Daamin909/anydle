import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button, Modal, Portal, RadioButton } from "react-native-paper";
import { useEffect, useState } from "react";
import ClosePopup from "../common/ClosePopup";

const Settings = ({ isSettingsVisible, hideSettings, setCategory }) => {
  const [value, setValue] = useState("default");
  const [fieldValue, setFieldValue] = useState("");

  useEffect(() => {
    setCategory(value);
  }, [value]);
  return (
    <View>
      <Portal>
        <Modal
          visible={isSettingsVisible}
          onDismiss={hideSettings}
          contentContainerStyle={styles.modalContainer}
          dismissableBackButton={true}
        >
          <ClosePopup onPress={hideSettings} />
          <View style={styles.container}>
            <Text style={styles.heading}>Categories</Text>

            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}
            >
              <View style={styles.radioRow}>
                <RadioButton.Item
                  label="Default"
                  value="default"
                  style={styles.radioItem}
                  color="#538d4e"
                  labelStyle={styles.radioLabel}
                />
                <RadioButton.Item
                  label="Tech"
                  value="tech"
                  color="#538d4e"
                  style={styles.radioItem}
                  labelStyle={styles.radioLabel}
                />
              </View>
              <View style={styles.radioRow}>
                <RadioButton.Item
                  color="#538d4e"
                  label="Science"
                  value="science"
                  style={styles.radioItem}
                  labelStyle={styles.radioLabel}
                />
                <RadioButton.Item
                  label="Sports"
                  color="#538d4e"
                  value="sports"
                  style={styles.radioItem}
                  labelStyle={styles.radioLabel}
                />
              </View>
            </RadioButton.Group>

            <View style={styles.aiContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.aiHeading}>Custom Categories</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Coming Soon</Text>
                </View>
              </View>
              <TextInput
                value={fieldValue}
                editable={false}
                placeholder="Enter a Keyword"
                placeholderTextColor={"#ffffff8a"}
                style={styles.input}
                onChangeText={(e) => setFieldValue(e)}
              />
              <Button
                mode="contained"
                buttonColor="#538d4e"
                textColor="#fff"
                disabled
                style={styles.generateBtn}
              >
                Generate
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#121213",
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 10,
  },
  container: {
    alignItems: "center",
    gap: 24,
  },
  badge: {
    backgroundColor: "#c9b458",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  badgeText: {
    color: "#121213",
    fontWeight: "600",
    fontSize: 10,
  },
  titleContainer: {
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 8,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  radioItem: {
    backgroundColor: "#3a3a3c",
    borderRadius: 8,
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    minWidth: 150,
  },
  radioLabel: {
    color: "#ffffff",
    fontSize: 16,
  },
  aiContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  aiHeading: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#3a3a3c",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#3a3a3c",
    color: "#f8f8f8",
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 12,
  },
  generateBtn: {
    borderRadius: 8,
    width: "100%",
    paddingVertical: 6,
  },
});
