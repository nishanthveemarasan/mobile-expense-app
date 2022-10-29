import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";

const ExpenseSummaryCategory = ({ onPress, type, title, page }) => {
  const onClickedHandler = () => {
    onPress(type, title,page);
  };
  return (
    <Pressable
      android_ripple={{ color: "pink" }}
      style={styles.rootContainer}
      onPress={onClickedHandler}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
export default ExpenseSummaryCategory;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.pink50,
    height: 90,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderLeftWidth: 10,
    borderLeftColor: Colors.pinkDark,
    justifyContent: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: "ubuntu-light",
    color: Colors.primaryBold,
  },
});
