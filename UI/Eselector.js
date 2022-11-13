import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";

const Eselector = ({ selectItems, onSelectedItem, value, type, enabled }) => {
  const onValueChangeHandler = (itemValue, itemIndex) => {
    onSelectedItem(type, itemValue);
  };
  return (
    <View style={styles.selectorContainer}>
      <Picker
        mode="dropdown"
        selectedValue={value}
        onValueChange={onValueChangeHandler}
        enabled={enabled}
        dropdownIconRippleColor="green"
        numberOfLines={1}
      >
        {selectItems.map((item, index) => {
          return (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={item.value}
              fontFamily="ubuntu-light"
              style={{ fontFamily: "ubuntu-light", fontSize: 18 }}
            />
          );
        })}
      </Picker>
    </View>
  );
};
export default Eselector;

const styles = StyleSheet.create({
  selectorContainer: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: Colors.pink50,
  },
});
