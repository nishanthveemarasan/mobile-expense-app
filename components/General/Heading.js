import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

const Heading = ({ heading }) => {
  return (
    <View style={styles.summaryHeading}>
      <Text style={styles.summaryText}>{heading}</Text>
    </View>
  );
};
export default Heading;

const styles = StyleSheet.create({
  summaryHeading: {
    backgroundColor: Colors.primary900,
    paddingVertical: 10,
    borderRadius: 5,
  },
  summaryText: {
    color: "white",
    fontFamily: "ubuntu-regular",
    textAlign: "center",
    fontWeight: "bold",
  },
});
