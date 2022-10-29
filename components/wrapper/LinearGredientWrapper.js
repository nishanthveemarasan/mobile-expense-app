import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import ScreenWrapper from "./ScreenWrapper";

const LinearGredientWrapper = ({ children, colors }) => {
  return (
    <LinearGradient colors={colors} style={styles.rootContainer}>
      <ScreenWrapper>{children}</ScreenWrapper>
    </LinearGradient>
  );
};
export default LinearGredientWrapper;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
