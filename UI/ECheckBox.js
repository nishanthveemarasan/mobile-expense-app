import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";

const ECheckBox = ({ value, onChange, label, labelStyle }) => {
  return (
    <View style={styles.section}>
      <Checkbox
        value={value}
        onValueChange={onChange}
        color={value ? "red" : "grey"}
      />
      <Text style={[styles.paragraph, labelStyle]}>{label}</Text>
    </View>
  );
};
export default ECheckBox;

const styles = StyleSheet.create({
  section: {
    marginVertical: 8,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontFamily: "ubuntu-regular",
    fontSize: 15,
    marginLeft: 10,
  },
  checkbox: {
    margin: 8,
  },
});
