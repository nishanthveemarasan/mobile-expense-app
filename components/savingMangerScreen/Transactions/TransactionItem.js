import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { CUR } from "../../../constants/months";
import { restrictDecimalPlace } from "../../../helper/helper";

const TransactionItem = ({ data }) => {
  const navigation = useNavigation();
  const borderLeftColor =
    data.amount > 0 ? styles.positiveBorderColor : styles.negativeBorderColor;
  const amountColor =
    data.amount > 0
      ? { color: Colors.success500 }
      : { color: Colors.danger400 };
  const onEditTransactionHandler = () => {
    navigation.navigate("AddSavingScreen", {
      data,
      type: "edit",
    });
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.rootContainer,
        borderLeftColor,
        pressed ? styles.itemPressed : null,
      ]}
      onPress={onEditTransactionHandler}
    >
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{data.date}</Text>
        <Text style={styles.descriptionText}>{data.description}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amountText, amountColor]}>
          {CUR + restrictDecimalPlace(data.amount)}
        </Text>
      </View>
    </Pressable>
  );
};
export default TransactionItem;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 8,
    marginBottom: 10,
    height: 90,
    paddingHorizontal: 10,
    backgroundColor: Colors.pink50,
    borderRadius: 4,
    elevation: 8,
  },
  dateContainer: {},
  dateText: {
    marginBottom: 7,
    fontSize: 22,
    fontFamily: "font-arial",
  },
  descriptionText: {
    fontFamily: "ubuntu-light",
  },
  amountContainer: {},
  amountText: {
    fontFamily: "ubuntu-bold",
    fontSize: 24,
  },
  positiveBorderColor: {
    borderLeftColor: Colors.success450,
  },
  negativeBorderColor: {
    borderLeftColor: Colors.danger400,
  },
  itemPressed: {
    opacity: 0.5,
  },
});
