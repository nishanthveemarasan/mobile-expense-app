import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const AddDebtItem = ({ page }) => {
  const navigation = useNavigation();
  const onOpenAddDebtScreen = () => {
    navigation.navigate(page, {
      type: "save",
    });
  };
  return (
    <Pressable
      onPress={onOpenAddDebtScreen}
      style={({ pressed }) => [
        styles.rootContainer,
        pressed ? styles.pressed : null,
      ]}
    >
      <Ionicons name="add" size={35} color="white" />
    </Pressable>
  );
};
export default AddDebtItem;

const styles = StyleSheet.create({
  rootContainer: {
    marginRight: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
