import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
const AddExpenseItem = ({ page }) => {
  const navigation = useNavigation();
  const onPageChangeHandler = () => {
    navigation.navigate(page, { action: "save" });
  };
  return (
    <View style={styles.rootContainer}>
      <Pressable
        android_ripple={{ color: Colors.pink50, borderless: true }}
        style={({ pressed }) => [
          styles.addExpenseContainer,
          pressed ? styles.pressed : null,
        ]}
        onPress={onPageChangeHandler}
      >
        <Ionicons name="add" size={35} color="white" />
      </Pressable>
    </View>
  );
};
export default AddExpenseItem;

const styles = StyleSheet.create({
  rootContainer: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: Colors.danger400,
    right: 0,
    bottom: "10%",
    borderRadius: 100,
    elevation: 10,
  },
  addExpenseContainer: {
    padding: 10,
    // borderRadius: 100,
  },
  addText: {},
  pressed: {
    borderRadius: 100,
    opacity: 0.7,
  },
});
