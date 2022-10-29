import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Colors } from "../constants/colors";

const Eswitch = ({ value, onChange, array, disabled }) => {
  const label = value ? array[0] : array[1];
  const textColor = {
    color: value ? Colors.success500 : Colors.danger400,
  };
  return (
    <View style={styles.rootContainer}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? Colors.success450 : Colors.danger400}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onChange}
        value={value}
        disabled={disabled}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, textColor]}>{label}</Text>
      </View>
    </View>
  );
};
export default Eswitch;

const styles = StyleSheet.create({
  rootContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  textContainer: {
    marginLeft: 5,
  },
  text: {
    fontSize: 20,
    fontFamily: "ubuntu-regular",
  },
});
