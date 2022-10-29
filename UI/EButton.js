import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

const EButton = ({ name, color, onPressed }) => {
  const buttonColor = {
    backgroundColor: color,
  };
  return (
    <Pressable
      android_ripple={{ color: "green" }}
      style={({ pressed }) => [
        styles.rootContainer,
        pressed ? styles.pressedButton : null,
      ]}
      onPress={onPressed}
    >
      <View style={[styles.buttonContainer, buttonColor]}>
        <Text style={styles.labelText}>{name}</Text>
      </View>
    </Pressable>
  );
};
export default EButton;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 8,
  },
  buttonContainer: {
    paddingVertical: 15,
    borderRadius: 6,
  },
  labelText: {
    color: "white",
    fontSize: 20,
    fontFamily: "ubuntu-regular",
    textAlign: "center",
  },
  pressedButton: {
    opacity: 0.5,
  },
});
