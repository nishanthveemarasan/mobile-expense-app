import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constants/colors";

const Input = ({
  type,
  placeHolder,
  multiLine,
  lines,
  maxLength,
  value,
  onChange,
  inputType,
  editable,
}) => {
  const [textValue, setTextValue] = useState();
  useEffect(() => {
    setTextValue(value);
  }, [value]);

  const onChangeTextHandler = (value) => {
    setTextValue(value);
    onChange(inputType, value);
  };
  return (
    <View style={styles.rootContainer}>
      <TextInput
        keyboardType={type}
        style={styles.textStyle}
        placeholder={placeHolder}
        multiline={!!multiLine}
        numberOfLines={lines}
        maxLength={maxLength ? maxLength : null}
        value={textValue}
        onChangeText={onChangeTextHandler}
        editable={editable}
        returnKeyLabel="next"
      />
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  rootContainer: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: Colors.pink50,
  },
  textStyle: {
    fontSize: 18,
    fontFamily: "ubuntu-light",
  },
});
