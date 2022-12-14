import { Pressable, StyleSheet, View } from "react-native";
import Input from "./Input";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { expenseStoreAction } from "../store/store";

const InputWithIcon = ({
  value,
  type,
  onSetDate,
  disabled,
  onPress,
  action,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onOpenDate = () => {
    dispatch(expenseStoreAction.updateCAtegoryParentPage({ action }));
    navigation.navigate("ShowExpenseCategoryScreen");
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <View style={styles.dateContainer}>
          <Input editable={false} value={value} />
        </View>
        <View style={styles.iconContainer}>
          <Pressable
            android_ripple={{ color: "pink", borderless: true }}
            style={[styles.pressable]}
            onPress={onOpenDate}
            disabled={disabled}
          >
            <Ionicons
              name="duplicate-sharp"
              size={48}
              color="white"
              style={[
                styles.dataIcon,
                disabled ? { color: Colors.light500 } : null,
              ]}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};
export default InputWithIcon;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainer: {
    width: "85%",
  },
  pressable: {},
  iconContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dataIcon: {
    color: Colors.success500,
  },
  labelText: {
    fontSize: 18,
    fontFamily: "ubuntu-regular",
  },
  pressed: {},
});
