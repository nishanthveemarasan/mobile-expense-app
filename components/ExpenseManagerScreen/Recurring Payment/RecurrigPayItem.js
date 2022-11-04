import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../../../constants/colors";
import { CUR } from "../../../constants/months";
import { getFirstLetterUpperWord } from "../../../helper/helper";
import { expenseStoreAction } from "../../../store/store";

const RecurrigPayItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const totalPay =
    item.susbscription_type == "limited" ? item.num_of_pay : "Unlimited";

  const onShowRecurringItemHandler = () => {
    dispatch(expenseStoreAction.setSelectedRecurringItem({ data: item }));
    navigation.navigate("ShowRecurringPaymentItemScreen");
  };
  return (
    <Pressable
      style={styles.rootContainer}
      android_ripple={{ color: "green" }}
      onPress={onShowRecurringItemHandler}
    >
      <View style={styles.nameContainer}>
        <View>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View>
          <Text style={styles.nameText}>
            {getFirstLetterUpperWord(item.pay_method)}
          </Text>
        </View>
        <View>
          <Text style={styles.amountText}>{`${CUR}${item.amount}`}</Text>
        </View>
      </View>
      <View style={styles.cycleContainer}>
        <Text style={styles.cycleText}>
          Cycle Paid:{`${item.current_pay_num}/${totalPay}`}
        </Text>
      </View>
      <View style={styles.statusContainer}>
        <View>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View>
          {item.status == "active" ? (
            <Text style={styles.payDateText}>
              Next Payment on: {item.next_pay_date}
            </Text>
          ) : (
            <Text style={[styles.payDateText, { color: Colors.danger1000 }]}>
              Completed
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};
export default RecurrigPayItem;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.pink50,
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginVertical: 6,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameText: {
    fontFamily: "ubuntu-bold",
    fontSize: 11,
    color: Colors.greyDark,
  },
  amountText: {
    color: Colors.danger400,
    fontFamily: "ubuntu-bold",
    fontSize: 12,
  },
  cycleContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginVertical: 9,
  },
  cycleText: {
    fontSize: 11,
    color: Colors.purple100,
    fontFamily: "ubuntu-bold",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 11,
    color: Colors.primaryNormal,
    fontFamily: "ubuntu-bold",
  },
  payDateText: {
    fontSize: 11,
    fontFamily: "ubuntu-bold",
    color: Colors.success500,
  },
});
