import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/colors";
import Input from "../../../UI/Input";
const SubInputGroup = ({ value, disabled, iconName, onChange, onDelete }) => {
  const onDeleteItemHandler = () => {};
  return (
    <View style={styles.rootContainer}>
      <View style={styles.dateContainer}>
        <Input
          editable={true}
          value={value}
          onChange={onChange}
          type="default"
          inputType="amount"
        />
      </View>
      <View style={styles.iconContainer}>
        <Pressable
          style={[styles.pressable]}
          onPress={onDelete}
          disabled={disabled}
        >
          <Ionicons
            name={iconName}
            size={50}
            color="white"
            style={[styles.dataIcon, { color: Colors.danger900 }]}
          />
        </Pressable>
      </View>
    </View>
  );
};
export default SubInputGroup;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    width: "83%",
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
});
