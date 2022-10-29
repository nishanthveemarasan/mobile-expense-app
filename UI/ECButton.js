import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

const ECButton = ({ name, color, onPressed, style }) => {
  return (
    <Pressable
      android_ripple={{ color: "green" }}
      style={({ pressed }) => [style, pressed ? styles.pressedButton : null]}
      onPress={onPressed}
    >
      <View style={[styles.buttonContainer]}>
        <Text style={styles.labelText}>{name}</Text>
      </View>
    </Pressable>
  );
};
export default ECButton;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 8,
  },
  buttonContainer: {
    paddingVertical: 10,
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
