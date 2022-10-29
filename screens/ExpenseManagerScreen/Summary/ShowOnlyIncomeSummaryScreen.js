import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import SummaryCategoryWiseTopTabNavigator from "../../../navigators/SummaryCategoryWiseTopTabNavigator";
import {
  filterDataByDateGroup,
  filterDataByType,
  getMonthlyArrayDetails,
  getTtotalExpenseIncome,
  getWeeklyArrayDetails,
  getYearlyArrayDetails,
} from "../../../helper/expense";
import EActivityIndicator from "../../../UI/EActivityIndicator";
import ShowTotalSummaryTypeWise from "../../../components/ExpenseManagerScreen/ExpenseSummary/ShowExpenseSummaryScreen/ShowTotalSummaryTypeWise";
import DateCategoryButton from "../../../components/ExpenseManagerScreen/ExpenseSummary/CatetoryButton/DateCategoryButton";
import DateCategory from "../../../components/ExpenseManagerScreen/ExpenseSummary/DateCategory/DateCategory";

const ShowOnlyIncomeSummaryScreen = ({ route, navigation }) => {
  const params = route.params;
  const mapStateToProps = (state) => {
    return {
      expenseData: state.expenseStore.payment.data.expense,
    };
  };
  const state = useSelector(mapStateToProps);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [categoryStyleNo, setCategoryStyleNo] = useState(1);
  const [content, setContent] = useState("datewise");
  const [showCategory, setShowCategory] = useState(false);
  const [categoryKey, setCategoryKey] = useState("");
  const [mainData, setMainData] = useState(-1);
  const [filteredData, setFilteredData] = useState({
    data: [],
    income: 0,
    category: [],
  });
  const [selectedDateGroup, setSelectedDateGroup] = useState([]);
  const [type, setType] = useState("All");
  const [selectedDate, setSelectedDate] = useState({});
  const [index, setIndex] = useState(0);
  useEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
    const summary = filterDataByType(state.expenseData, "income");
    setMainData(summary.data);
    setFilteredData({
      data: summary.data,
      income: parseFloat(summary.total, 2),
      category: summary.category,
    });
  }, [params, state.expenseData]);

  const onCategoryChange = (type, num) => {
    setContent("datewise");
    if (mainData.length == 0) {
      return;
    }
    // const date = state.date[type];
    let filterData = {};
    setCategoryStyleNo(num);
    setIndex(0);

    if (type == "thisWeek") {
      const dateArray = getWeeklyArrayDetails(
        mainData[mainData.length - 1].date
      );
      setSelectedDateGroup(dateArray);
      setSelectedDate(dateArray[0]);
      filterData = filterDataByDateGroup(mainData, dateArray[0]);
    } else if (type == "thisMonth") {
      const dateArray = getMonthlyArrayDetails(
        mainData[mainData.length - 1].date
      );
      setSelectedDateGroup(dateArray);
      setSelectedDate(dateArray[0]);
      filterData = filterDataByDateGroup(mainData, dateArray[0]);
    } else if (type == "thisYear") {
      const dateArray = getYearlyArrayDetails(
        mainData[mainData.length - 1].date
      );
      setSelectedDateGroup(dateArray);
      setSelectedDate(dateArray[0]);
      filterData = filterDataByDateGroup(mainData, dateArray[0]);
    } else {
      filterData = filterDataByType(mainData, "income");
      setSelectedDateGroup([]);
    }
    setFilteredData({
      data: filterData.data,
      income: parseFloat(filterData.total, 2),
      category: filterData.category,
    });
  };

  const onDateCategoryChange = (i) => {
    setSelectedDate(selectedDateGroup[i]);
    setIndex(i);
    const data = filterDataByDateGroup(mainData, selectedDateGroup[i]);
    setFilteredData({
      data: data.data,
      income: parseFloat(data.total, 2),
      category: data.category,
    });
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View>
        <DateCategoryButton onPress={onCategoryChange} />
      </View>
      <View>
        <ShowTotalSummaryTypeWise
          total={filteredData.income}
          title="Total Income"
          type="income"
        />
      </View>
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
export default ShowOnlyIncomeSummaryScreen;

const styles = StyleSheet.create({
  topTapNavigator: {
    flex: 1,
    marginTop: 20,
  },
});
