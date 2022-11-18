import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/colors";

const ECButton = ({
  name,
  color,
  onPressed,
  style,
  textStyle,
  showIndicator,
}) => {
  return (
    <Pressable
      android_ripple={{ color: "green" }}
      style={({ pressed }) => [style, pressed ? styles.pressedButton : null]}
      onPress={onPressed}
      disabled={showIndicator}
    >
      <View style={[styles.buttonContainer]}>
        {!showIndicator ? (
          <Text style={[styles.labelText, textStyle]}>{name}</Text>
        ) : (
          <ActivityIndicator animating={showIndicator} color="white" />
        )}
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
    minWidth: "20%",
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
