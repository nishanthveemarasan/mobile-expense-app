import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import DateCategoryButton from "../../components/ExpenseManagerScreen/ExpenseSummary/CatetoryButton/DateCategoryButton";
import DateCategory from "../../components/ExpenseManagerScreen/ExpenseSummary/DateCategory/DateCategory";
import ShowTotalSummary from "../../components/ExpenseManagerScreen/ExpenseSummary/ShowExpenseSummaryScreen/ShowTotalSummary";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import {
  filterAllSummaryDataByDateGroup,
  getMonthlyArrayDetails,
  getTtotalExpenseIncome,
  getWeeklyArrayDetails,
  getYearlyArrayDetails,
} from "../../helper/expense";
import SummaryCategoryWiseTopTabNavigator from "../../navigators/SummaryCategoryWiseTopTabNavigator";
import EActivityIndicator from "../../UI/EActivityIndicator";

const ShowExpenseSummary = ({ route, navigation }) => {
  const params = route.params;
  const mapStateToProps = (state) => {
    return {
      expenseData: state.expenseStore.payment.data.expense,
    };
  };
  const state = useSelector(mapStateToProps);
  const [filteredData, setFilteredData] = useState({
    data: [],
    expense: 0,
    income: 0,
    balance: 0,
    category: [],
  });
  const [content, setContent] = useState("datewise");
  const [type, setType] = useState("All");
  const [categoryStyleNo, setCategoryStyleNo] = useState(1);
  const [index, setIndex] = useState(0);
  const [selectedDateGroup, setSelectedDateGroup] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const [mainData, setMainData] = useState(-1);

  useEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
    console.log("expense");
    console.log(state.expenseData);
    setMainData(state.expenseData);
    const summary = getTtotalExpenseIncome(state.expenseData);
    setFilteredData({
      data: state.expenseData,
      expense: parseFloat(summary.expense, 2),
      income: parseFloat(summary.income, 2),
      balance: parseFloat(summary.expense + summary.income, 2),
      category: summary.category,
    });
  }, [params, state.expenseData]);

  const onChangeTypeHandler = (type, num) => {
    setContent("datewise");
    setType(type);
    setCategoryStyleNo(num);
    setIndex(0);

    if (mainData.length == 0) {
      return;
    }
    const firstPayDate = mainData[mainData.length - 1].date;
    const lastPayDate = mainData[0].date;

    if (type == "thisWeek") {
      const dateArray = getWeeklyArrayDetails(firstPayDate, lastPayDate);
      if (dateArray.length > 0) {
        setSelectedDateGroup(dateArray);
        setSelectedDate(dateArray[0]);
        const filter = filterAllSummaryDataByDateGroup(mainData, dateArray[0]);
        setFilteredData(filter);
      }
    } else if (type == "thisMonth") {
      const dateArray = getMonthlyArrayDetails(firstPayDate, lastPayDate);
      if (dateArray.length > 0) {
        setSelectedDateGroup(dateArray);
        setSelectedDate(dateArray[0]);
        const filter = filterAllSummaryDataByDateGroup(mainData, dateArray[0]);
        setFilteredData(filter);
      }
    } else if (type == "thisYear") {
      const dateArray = getYearlyArrayDetails(firstPayDate, lastPayDate);
      if (dateArray.length > 0) {
        setSelectedDateGroup(dateArray);
        setSelectedDate(dateArray[0]);
        const filter = filterAllSummaryDataByDateGroup(mainData, dateArray[0]);
        setFilteredData(filter);
      }
    } else {
      setSelectedDateGroup([]);
      const filter = getTtotalExpenseIncome(mainData);
      setFilteredData({
        data: mainData,
        expense: filter.expense,
        income: filter.income,
        balance: filter.expense + filter.income,
        category: filter.category,
      });
    }
  };

  const onDateCategoryChange = (i) => {
    setSelectedDate(selectedDateGroup[i]);
    const filter = filterAllSummaryDataByDateGroup(
      mainData,
      selectedDateGroup[i]
    );
    setIndex(i);
    setFilteredData(filter);
  };

  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View>
        <DateCategoryButton onPress={onChangeTypeHandler} />
      </View>
      {filteredData.data.length > 0 && (
        <View>
          <ShowTotalSummary
            income={filteredData.income}
            expense={filteredData.expense}
            balance={filteredData.balance}
          />
        </View>
      )}
      {selectedDateGroup.length > 0 && (
        <DateCategory
          data={selectedDateGroup}
          curIndex={index}
          change={onDateCategoryChange}
        />
      )}
      <View style={styles.topTapNavigator}>
        <SummaryCategoryWiseTopTabNavigator data={filteredData} />
      </View>
    </LinearGredientWrapper>
  );
};
export default ShowExpenseSummary;

const styles = StyleSheet.create({
  topTapNavigator: {
    flex: 1,
    marginTop: 15,
  },
});
