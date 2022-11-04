import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RecurrigPayItem from "../../components/ExpenseManagerScreen/Recurring Payment/RecurrigPayItem";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../components/wrapper/ScrollViewWrapper";
import { Colors } from "../../constants/colors";
import { expenseStoreAction } from "../../store/store";
import AddExpenseItem from "./AddExpenseItem";
const ShowEmptyContainers = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No recurring Payment at the moment</Text>
    </View>
  );
};
const ExpenseRecurring = () => {
  const mapStateToProps = (state) => {
    return {
      recurringData: state.expenseStore.recurringDataArray,
    };
  };
  const state = useSelector(mapStateToProps);

  const onDisplayRecurringItemHandler = ({ item }) => {
    return <RecurrigPayItem item={item} />;
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <AddExpenseItem page="AddRecurringPaymentScreen" />
      <View style={styles.rootContainer}>
        <FlatList
          data={state.recurringData}
          keyExtractor={(item) => item.uuid}
          renderItem={onDisplayRecurringItemHandler}
          ListEmptyComponent={<ShowEmptyContainers />}
        />
      </View>
    </LinearGredientWrapper>
  );
};
export default ExpenseRecurring;
const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 4,
  },
  emptyContainer: {
    backgroundColor: Colors.pink50,
    alignItems: "center",
    marginTop: "8%",
    paddingVertical: 20,
    borderRadius: 6,
    elevation: 4,
  },
  emptyText: {
    fontFamily: "ubuntu-light",
    fontWeight: "bold",
    fontSize: 15
  },
});
