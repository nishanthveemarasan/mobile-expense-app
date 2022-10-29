import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DashboardPieChart from "../../components/ExpenseManagerScreen/ExpenseDashboard/DashboardPieChart";
import ExpenseBalaceDateWaise from "../../components/ExpenseManagerScreen/ExpenseDashboard/ExpenseBalaceDateWaise";
import ExpenseTotalBalance from "../../components/ExpenseManagerScreen/ExpenseDashboard/ExpenseTotalBalance";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../components/wrapper/ScrollViewWrapper";
import { EXPENSE_TYPE } from "../../constants/SelectItems";
import { objKeysLength } from "../../helper/helper";
import { expenseStoreAction } from "../../store/store";
import Eselector from "../../UI/Eselector";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import AddExpenseItem from "./AddExpenseItem";

const ExpenseDashboard = () => {
  const [chartKey, setChartKey] = useState("week");
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();

  const mapStateToProps = (state) => {
    return {
      dateGroup: state.expenseStore.dateGroup,
      expenseData: state.expenseStore.payment.data.expense,
      summary: state.expenseStore.summary,
    };
  };
  const state = useSelector(mapStateToProps);

  const changeChartKeyHandler = (type, key) => {
    setChartKey(key);
    setChartData(state.summary[key].chart);
  };

  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <AddExpenseItem page="AddExpenseItemScreen" />
      <ScrollViewWrapper>
        <ExpenseTotalBalance balance={state.summary.balance} />
        <ExpenseBalaceDateWaise
          dateGroup={state.dateGroup.today}
          income={state.summary.today.income}
          expense={state.summary.today.expense}
          balance={state.summary.today.balance}
        />
        <ExpenseBalaceDateWaise
          dateGroup={state.dateGroup.thisWeek}
          income={state.summary.week.income}
          expense={state.summary.week.expense}
          balance={state.summary.week.balance}
        />
        <ExpenseBalaceDateWaise
          dateGroup={state.dateGroup.thisMonth}
          income={state.summary.month.income}
          expense={state.summary.month.expense}
          balance={state.summary.month.balance}
        />
        <ExpenseBalaceDateWaise
          dateGroup={state.dateGroup.thisYear}
          income={state.summary.year.income}
          expense={state.summary.year.expense}
          balance={state.summary.year.balance}
        />
        <View style={styles.chartContainer}>
          <LinearGredientWrapper
            colors={["rgba(14, 1, 36,1)", "rgba(14, 1, 36,0.5)"]}
          >
            <Eselector
              selectItems={EXPENSE_TYPE}
              onSelectedItem={changeChartKeyHandler}
              value={chartKey}
              type="expense"
              enabled={true}
            />
            <View>
              <DashboardPieChart chartData={chartData} />
            </View>
          </LinearGredientWrapper>
        </View>
      </ScrollViewWrapper>
    </LinearGredientWrapper>
  );
};
export default ExpenseDashboard;
const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 10,
    backgroundColor: "#0e0124",
    paddingVertical: 15,
  },
  addExpenseContainer: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: Colors.pinkLight,
    right: 0,
    bottom: 80,
    padding: 20,
    elevation: 10,
    borderRadius: 100,
  },
  addText: {},
});
