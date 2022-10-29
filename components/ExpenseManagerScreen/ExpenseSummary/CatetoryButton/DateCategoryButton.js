import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../constants/colors";

const DateCategoryButton = ({ onPress }) => {
  const [currentNum, setCurrentNum] = useState(1);

  const onChangeStyleNumber = (type, number) => {
    setCurrentNum(number);
    onPress(type, number);
  };

  return (
    <View style={styles.rootContainer}>
      <Pressable
        android_ripple={{ color: Colors.pink50 }}
        style={[
          styles.allButton,
          { backgroundColor: currentNum == 1 ? Colors.primary500 : "white" },
        ]}
        onPress={onChangeStyleNumber.bind(this, "All", 1)}
      >
        <Text
          style={[
            styles.text,
            { color: currentNum == 1 ? "white" : Colors.primary500 },
          ]}
        >
          All
        </Text>
      </Pressable>
      <Pressable
        android_ripple={{ color: Colors.pink50 }}
        style={[
          styles.weeklyButton,
          { backgroundColor: currentNum == 2 ? Colors.primary500 : "white" },
        ]}
        onPress={onChangeStyleNumber.bind(this, "thisWeek", 2)}
      >
        <Text
          style={[
            styles.text,
            { color: currentNum == 2 ? "white" : Colors.primary500 },
          ]}
        >
          Weekly
        </Text>
      </Pressable>
      <Pressable
        android_ripple={{ color: Colors.pink50 }}
        onPress={onChangeStyleNumber.bind(this, "thisMonth", 3)}
        style={[
          styles.weeklyButton,
          { backgroundColor: currentNum == 3 ? Colors.primary500 : "white" },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: currentNum == 3 ? "white" : Colors.primary500 },
          ]}
        >
          Monthly
        </Text>
      </Pressable>
      <Pressable
        android_ripple={{ color: Colors.pink50 }}
        onPress={onChangeStyleNumber.bind(this, "thisYear", 4)}
        style={[
          styles.yearlyButton,
          { backgroundColor: currentNum == 4 ? Colors.primary500 : "white" },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: currentNum == 4 ? "white" : Colors.primary500 },
          ]}
        >
          Yearly
        </Text>
      </Pressable>
    </View>
  );
};
export default DateCategoryButton;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  allButton: {
    borderWidth: 2,
    borderColor: Colors.primary500,
    padding: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "white",
  },
  weeklyButton: {
    borderWidth: 2,
    borderColor: Colors.primary500,
    padding: 10,
    backgroundColor: "white",
  },
  monthlyButton: {
    borderWidth: 2,
    borderColor: Colors.primary500,
    padding: 10,
    backgroundColor: "white",
  },
  yearlyButton: {
    borderColor: Colors.primary500,
    borderWidth: 2,
    padding: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: "white",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  text: {
    fontFamily: "ubuntu-bold",
    color: Colors.primary500,
  },
});
