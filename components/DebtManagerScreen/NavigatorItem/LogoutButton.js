import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const LogoutButton = ({ icon, onAction }) => {
  const onOpenAddDebtScreen = () => {
    onAction();
  };
  return (
    <Pressable
      onPress={onOpenAddDebtScreen}
      style={({ pressed }) => [
        styles.rootContainer,
        pressed ? styles.pressed : null,
      ]}
    >
      <Ionicons name={icon} size={35} color="#ff8080" />
    </Pressable>
  );
};
export default LogoutButton;

const styles = StyleSheet.create({
  rootContainer: {
    // marginRight: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
