import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { getJSDate } from "../helper/helper";
import Input from "./Input";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

const DatePicker = ({ value, type, onSetDate }) => {
  const [show, setShow] = useState(false);
  const [saveDate, setSaveDate] = useState(new Date());
  useEffect(() => {
    const date = getJSDate(value);
    setSaveDate(date);
  }, []);

  const onOpenDate = () => {
    setShow(true);
  };

  const onChangeDateHandler = (event, date) => {
    setShow(false);
    if (event.type == "set") {
      setSaveDate(date);
      onSetDate(type, date);
    }
  };
  return (
    <>
      <View style={styles.rootContainer}>
        <View style={styles.dateContainer}>
          <Input editable={false} value={value} />
        </View>
        <View style={styles.iconContainer}>
          <Pressable
            style={({ pressed }) => [pressed ? styles.pressed : null]}
            onPress={onOpenDate}
            android_ripple={{ color: "pink", borderless: true }}
          >
            <Ionicons
              name="calendar"
              size={48}
              color="white"
              style={styles.dataIcon}
            />
          </Pressable>
        </View>
      </View>
      {show && (
        <RNDateTimePicker
          mode="date"
          value={saveDate}
          onChange={onChangeDateHandler}
        />
      )}
    </>
  );
};
export default DatePicker;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainer: {
    width: "85%",
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dataIcon: {
    color: Colors.purple100,
  },
  labelText: {
    fontSize: 18,
    fontFamily: "ubuntu-regular",
  },
});
