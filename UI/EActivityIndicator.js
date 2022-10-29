import { ActivityIndicator, StyleSheet, View } from "react-native";
import LinearGredientWrapper from "../components/wrapper/LinearGredientWrapper";
import { Colors } from "../constants/colors";
const EActivityIndicator = () => {
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          color={Colors.danger400}
          size="large"
        />
      </View>
    </LinearGredientWrapper>
  );
};
export default EActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
