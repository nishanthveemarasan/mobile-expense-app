import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import LinearGredientWrapper from "../../wrapper/LinearGredientWrapper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { CUR } from "../../../constants/months";
const Transactions = ({ data, onDeletePressed }) => {
  const onDeleteItemHander = (uuid) => {
    onDeletePressed(uuid);
  };
  const onDisplayExpenseItem = ({ item }) => {
    console.log(item.amount);
    let color = {
      color: item.type == "income" ? Colors.success500 : Colors.danger400,
    };
    return (
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.catContainer}>
            <Text style={[styles.catText, color]}>{item.selectedCategory}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.amountContainer}>
            <Text style={[styles.amount, color]}>
              {CUR}
              {item.amount}
            </Text>
          </View>
          <Pressable
            android_ripple={{ color: "green" }}
            onPress={onDeleteItemHander.bind(this, item.uuid)}
          >
            <Ionicons name="trash" size={30} color="red" />
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.rootContainer}>
      <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={onDisplayExpenseItem}
        />
      </LinearGredientWrapper>
    </View>
  );
};
export default Transactions;
const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 6,
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.pink50,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    elevation: 4,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "column",
  },
  amountContainer: {
    marginRight: 19,
  },
  amount: {
    fontSize: 14,
  },
  dateContainer: {
    marginBottom: 6,
  },
  date: {
    fontFamily: "ubuntu-regular",
    fontSize: 14,
    color: Colors.grey900,
  },
  catContainer: {},
  catText: {
    fontFamily: "ubuntu-regular",
    fontSize: 13,
  },
});
