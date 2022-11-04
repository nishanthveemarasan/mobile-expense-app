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
import DateCategory from "../../../components/ExpenseManagerScreen/ExpenseSummary/DateCategory/DateCategory";
import DateCategoryButton from "../../../components/ExpenseManagerScreen/ExpenseSummary/CatetoryButton/DateCategoryButton";

const ShowOnlyExpenseSummaryScreen = ({ route, navigation }) => {
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
    expense: 0,
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
    const summary = filterDataByType(state.expenseData, "expense");
    setMainData(summary.data);
    setFilteredData({
      data: summary.data,
      expense: parseFloat(summary.total, 2),
      category: summary.category,
    });
  }, [params, state.expenseData]);

  const onCategoryChange = (type, num) => {
    setContent("datewise");
    if (mainData.length == 0) {
      return;
    }
    // const date = state.date[type];
    let filterData = {
      data: [],
      category: [],
      total: 0,
    };
    setCategoryStyleNo(num);
    setIndex(0);

    const firstPayDate = mainData[mainData.length - 1].date;
    const lastPayDate = mainData[0].date;
    if (type == "thisWeek") {
      const dateArray = getWeeklyArrayDetails(firstPayDate, lastPayDate);
      if (dateArray.length > 0) {
        setSelectedDateGroup(dateArray);
        setSelectedDate(dateArray[0]);
        filterData = filterDataByDateGroup(mainData, dateArray[0]);
      }
    } else if (type == "thisMonth") {
      const dateArray = getMonthlyArrayDetails(firstPayDate, lastPayDate);
      if (dateArray.length > 0) {
        setSelectedDateGroup(dateArray);
        setSelectedDate(dateArray[0]);
        filterData = filterDataByDateGroup(mainData, dateArray[0]);
      }
    } else if (type == "thisYear") {
      const dateArray = getYearlyArrayDetails(firstPayDate, lastPayDate);
      if (dateArray.length > 0) {
        setSelectedDateGroup(dateArray);
        setSelectedDate(dateArray[0]);
        filterData = filterDataByDateGroup(mainData, dateArray[0]);
      }
    } else {
      filterData = filterDataByType(mainData, "expense");
      setSelectedDateGroup([]);
    }
    setFilteredData({
      data: filterData.data,
      expense: parseFloat(filterData.total, 2),
      category: filterData.category,
    });
  };

  const onDateCategoryChange = (i) => {
    setSelectedDate(selectedDateGroup[i]);
    setIndex(i);
    const data = filterDataByDateGroup(mainData, selectedDateGroup[i]);
    setFilteredData({
      data: data.data,
      expense: parseFloat(data.total, 2),
      category: data.category,
    });
  };

  const onContentChangeHandler = (content) => {
    setContent(content);
  };
  const onChangeIndexHandler = (index) => {
    setCurrentIndex(currentIndex == index ? -1 : index);
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View>
        <DateCategoryButton onPress={onCategoryChange} />
      </View>
      <View>
        <ShowTotalSummaryTypeWise
          total={filteredData.expense}
          title="Total Expense"
          type="expense"
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
export default ShowOnlyExpenseSummaryScreen;

const styles = StyleSheet.create({
  topTapNavigator: {
    flex: 1,
    marginTop: 20,
  },
});
