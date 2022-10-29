import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const AddSaving = () => {
  const navigation = useNavigation();
  const onOpenAddSavingScreenHandler = () => {
    navigation.navigate("AddSavingScreen", {
      type: "save",
    });
  };
  return (
    <Pressable
      onPress={onOpenAddSavingScreenHandler}
      style={({ pressed }) => [
        styles.rootContainer,
        pressed ? styles.pressed : null,
      ]}
    >
      <Ionicons name="add" size={35} color="white" />
    </Pressable>
  );
};
export default AddSaving;

const styles = StyleSheet.create({
  rootContainer: {
    marginRight: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
