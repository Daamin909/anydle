import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Modal, Portal, RadioButton, TextInput } from "react-native-paper";
import getCategory from "../../scripts/fetch/getCategory";
import react from "react";
import { useState } from "react";

const Settings = ({ isSettingsVisible, hideSettings }) => {
  const containerStyle = { backgroundColor: "rgba(25, 27, 30)", padding: 20 };
  const [value, setValue] = useState('technology');
  const [fieldValue, setFieldValue] = useState("")
  return (
    <View>
      <Portal>
        <Modal
          visible={isSettingsVisible}
          onDismiss={hideSettings}
          contentContainerStyle={containerStyle}
          dismissableBackButton={true}
        >
          <View style={styles.container}>
          <Text style={styles.heading}>Categories</Text>
          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <View style={styles.radioView}>
              <RadioButton.Item label="Tech" value="technology" />
              <RadioButton.Item label="Science" value="science" />
              <RadioButton.Item label="Sports" value="sports" />
            </View>
          </RadioButton.Group>
          <View style={styles.aiContainer}>
            <Text style={styles.aiHeading}>AI Generate Categories!</Text>
            <TextInput value={fieldValue} onChangeText={(e) => setFieldValue(e)}></TextInput>
            <Button mode="contained-tonal">Generate</Button>
          </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  aiHeading: {
    color: "#f8f8f8",
    fontSize: 25
  },
  aiContainer: {
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },
  heading: {
    fontSize: 35,
    color: "#f8f8f8"
  },
  container: {
    backgroundColor: "#818384",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontWeight: 900,
    color: "white",
    fontSize: 40,
  },
  button: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 20,
  },
  radioView: { flexDirection: 'row', alignItems: 'center' }
});
