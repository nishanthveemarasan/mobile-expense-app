import { StyleSheet, View } from "react-native";

const ScreenWrapper = ({ children }) => {
  return <View style={styles.rootContainer}>{children}</View>;
};
export default ScreenWrapper;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 14,
  },
});
