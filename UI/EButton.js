import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/colors";

const EButton = ({ name, color, onPressed, showIndicator }) => {
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
      disabled={showIndicator}
    >
      <View
        style={[
          styles.buttonContainer,
          buttonColor,
          showIndicator ? styles.disabled : null,
        ]}
      >
        {!showIndicator ? (
          <Text style={styles.labelText}>{name}</Text>
        ) : (
          <ActivityIndicator
            animating={showIndicator}
            color={Colors.primary1000}
          />
        )}
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
    paddingHorizontal: 15,
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
  disabled: {
    backgroundColor: Colors.light500,
  },
});
