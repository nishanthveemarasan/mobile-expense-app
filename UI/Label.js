import { StyleSheet, Text, View } from "react-native";

const Label = ({ name }) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.labelText}>{name}</Text>
    </View>
  );
};
export default Label;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 8,
  },
  labelText: {
    fontSize: 18,
    fontFamily: "ubuntu-regular",
  },
});
