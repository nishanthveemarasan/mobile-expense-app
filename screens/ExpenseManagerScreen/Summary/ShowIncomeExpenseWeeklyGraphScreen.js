import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ShowTotalSummary from "../../../components/ExpenseManagerScreen/ExpenseSummary/ShowExpenseSummaryScreen/ShowTotalSummary";
import Heading from "../../../components/General/Heading";
import MultiLineGraph from "../../../components/Graph/MultiLineGraph";
import StackBarChart from "../../../components/Graph/StackBarChart";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../../components/wrapper/ScrollViewWrapper";
import { ColorArray, Colors } from "../../../constants/colors";
import { monthsName } from "../../../constants/months";
import {
  generateWeeklyExpenseAndIncomeChartColumnData,
  padStart,
  weeklyChartData,
} from "../../../helper/expense";
import {
  generateDropdownFormat,
  getMonthWithStartEndDateDetails,
  getYear,
  includes,
} from "../../../helper/helper";
import EActivityIndicator from "../../../UI/EActivityIndicator";
import Eselector from "../../../UI/Eselector";
import Label from "../../../UI/Label";

const ShowIncomeExpenseWeeklyGraphScreen = ({ navigation, route }) => {
  const params = route.params;
  const mapStateToProps = (state) => {
    return {
      data: state.expenseStore.payment.data.expense,
      yearArray: state.expenseStore.expenseYearArray,
    };
  };
  const state = useSelector(mapStateToProps);

  const [loading, setLoading] = useState();
  const [filterLoading, setFilterLoading] = useState(true);
  const [chartExists, setChartExists] = useState(true);
  const [labels, setLabels] = useState([]);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [weeklyExpenseAndIncome, setWeeklyExpenseAndIncome] = useState({
    labels: [],
    series: [],
  });
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [weeklyLineGraph, setWeeklyLineGraph] = useState({
    legends: [],
    data: [],
    show: false,
  });
  const [weeklyExpenseAndIncomeInTotal, setWeeklyExpenseAndIncomeInTotal] =
    useState({
      legends: [],
      data: [],
      show: false,
    });
  const [categoryWiseSeries, setCategoryWiseSeries] = useState({
    legends: [],
    barColors: [],
    data: [],
    show: false,
  });
  const [dropdownYear, setDropdownYear] = useState([]);
  const [dropdownMonths, setDropdownMonths] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
    if (state.data.length > 0) {
      setLoading(false);
      let currentYear = getYear(new Date());
      let isYearExists = includes(state.yearArray, currentYear);
      let monthDetails = null;
      if (isYearExists) {
        monthDetails = getMonthWithStartEndDateDetails();
      } else {
        let data = `${state.yearArray}-01-01`;
        monthDetails = getMonthWithStartEndDateDetails(data);
      }
      setSelectedYear(monthDetails.year);
      setSelectedMonth(monthDetails.month);
      setDropdownYear(generateDropdownFormat(state.yearArray));
      setDropdownMonths(generateDropdownFormat(monthsName, true));

      const chartData = weeklyChartData(
        state.data,
        monthDetails.monthFirstDay,
        monthDetails.lastMonthDay
      );
      if (chartData.category.length == 0) {
        setChartExists(false);
      } else {
        const columnChartDataAll =
          generateWeeklyExpenseAndIncomeChartColumnData(chartData);
        setSummary(columnChartDataAll.summary);
        setLabels(columnChartDataAll.labels);

        setWeeklyLineGraph({
          legends: columnChartDataAll.legends,
          data: columnChartDataAll.series,
          show:
            columnChartDataAll.legends.length > 0 &&
            columnChartDataAll.series.length > 0,
        });

        setWeeklyExpenseAndIncomeInTotal({
          data: columnChartDataAll.summaryChartInTotal.seriesForTotal,
          legends: columnChartDataAll.legends,
          show:
            columnChartDataAll.summaryChartInTotal.seriesForTotal.length > 0 &&
            columnChartDataAll.legends.length > 0,
        });

        let categoryWise = [];
        let categoriesLables = [];
        let barColors = [];
        for (let i = 0; i < columnChartDataAll.labels.length; i++) {
          let array = [];
          chartData.category.forEach((category, index) => {
            if (category.toLowerCase() != "income") {
              if (i == 0) {
                categoriesLables.push(category);
                barColors.push(ColorArray[index]);
              }
              array.push(columnChartDataAll.categoryWise[category][i]);
            }
          });
          categoryWise.push(array);
        }
        setCategoryWiseSeries({
          legends: categoriesLables,
          data: categoryWise,
          barColors: barColors,
          show: categoriesLables.length > 0,
        });
      }
      setLoading(false);
    }
  }, [state.data, state.yearArray]);
  const onMonthChangeHandler = (type, value) => {
    setSelectedMonth(value);
    updateWeeklyFormData(selectedYear, value);
  };
  const onYearChangeHander = (type, value) => {
    setSelectedYear(value);
    updateWeeklyFormData(value, selectedMonth);
  };

  const updateWeeklyFormData = (year, month) => {
    setFilterLoading(false);
    let fMonth = padStart(month + 1);
    const date = `${year}-${fMonth}-01`;
    setChartExists(true);
    let monthDetails = getMonthWithStartEndDateDetails(date);
    const chartData = weeklyChartData(
      state.data,
      monthDetails.monthFirstDay,
      monthDetails.lastMonthDay
    );
    if (chartData.category.length == 0) {
      setChartExists(false);
    } else {
      const columnChartDataAll =
        generateWeeklyExpenseAndIncomeChartColumnData(chartData);
      setSummary(columnChartDataAll.summary);
      setLabels(columnChartDataAll.labels);
      setWeeklyLineGraph({
        legends: columnChartDataAll.legends,
        data: columnChartDataAll.series,
        show:
          columnChartDataAll.legends.length > 0 &&
          columnChartDataAll.series.length > 0,
      });

      setWeeklyExpenseAndIncomeInTotal({
        data: columnChartDataAll.summaryChartInTotal.seriesForTotal,
        legends: columnChartDataAll.legends,
        show:
          columnChartDataAll.summaryChartInTotal.seriesForTotal.length > 0 &&
          columnChartDataAll.legends.length > 0,
      });

      let categoryWise = [];
      let categoriesLables = [];
      let barColors = [];
      for (let i = 0; i < columnChartDataAll.labels.length; i++) {
        let array = [];
        chartData.category.forEach((category, index) => {
          if (category.toLowerCase() != "income") {
            if (i == 0) {
              categoriesLables.push(category);
              barColors.push(ColorArray[index]);
            }
            array.push(columnChartDataAll.categoryWise[category][i]);
          }
        });
        categoryWise.push(array);
      }
      setCategoryWiseSeries({
        legends: categoriesLables,
        data: categoryWise,
        barColors: barColors,
        show: categoriesLables.length > 0,
      });
    }
    setFilterLoading(true);
  };
  // console.log(filterLoading);
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      {state.data.length > 0 ? (
        <ScrollViewWrapper>
          {loading ? (
            <EActivityIndicator />
          ) : (
            <>
              <View style={styles.formItemContiainer}>
                <View style={styles.formInnerContainer}>
                  <Label name="Year" style={{ color: "white" }} />
                  <Eselector
                    selectItems={dropdownYear}
                    onSelectedItem={onYearChangeHander}
                    value={selectedYear}
                    type="year"
                    enabled={true}
                  />
                </View>
                <View style={styles.formInnerContainer}>
                  <Label name="Month" style={{ color: "white" }} />
                  <Eselector
                    selectItems={dropdownMonths}
                    onSelectedItem={onMonthChangeHandler}
                    value={selectedMonth}
                    type="month"
                    enabled={true}
                  />
                </View>
              </View>
              <View>
                {!filterLoading ? (
                  <EActivityIndicator />
                ) : (
                  <>
                    {chartExists ? (
                      <>
                        <ShowTotalSummary
                          income={summary.income}
                          expense={summary.expense}
                          balance={summary.balance}
                        />
                        {weeklyLineGraph.show && (
                          <View style={styles.graphContainer}>
                            <Heading heading="Expense Vs Income in Line Chart(Weekly)" />
                            <MultiLineGraph
                              datasets={weeklyLineGraph.data}
                              labels={labels}
                              legends={weeklyLineGraph.legends}
                            />
                          </View>
                        )}
                        {weeklyExpenseAndIncomeInTotal.show && (
                          <View style={styles.graphContainer}>
                            <Heading heading="Expense Vs Income in Line Chart(In Total)" />
                            <MultiLineGraph
                              datasets={weeklyExpenseAndIncomeInTotal.data}
                              labels={labels}
                              legends={weeklyExpenseAndIncomeInTotal.legends}
                            />
                          </View>
                        )}
                        {categoryWiseSeries.show && (
                          <View style={styles.graphContainer}>
                            <Heading heading="Monthly Expense data By CategoryWise In Stack Bar Chart" />
                            <StackBarChart
                              chartLegends={categoryWiseSeries.legends}
                              chartLabels={labels}
                              chartBarColors={categoryWiseSeries.barColors}
                              chartData={categoryWiseSeries.data}
                            />
                          </View>
                        )}
                      </>
                    ) : (
                      <View style={styles.noItemContainer}>
                        <Text style={styles.text}>No Data to show</Text>
                      </View>
                    )}
                  </>
                )}
              </View>
            </>
          )}
        </ScrollViewWrapper>
      ) : (
        <View style={styles.noItemContainer}>
          <Text style={styles.text}>No Data to show</Text>
        </View>
      )}
    </LinearGredientWrapper>
  );
};
export default ShowIncomeExpenseWeeklyGraphScreen;
const styles = StyleSheet.create({
  graphContainer: {
    marginTop: "5%",
  },
  noItemContainer: {
    backgroundColor: Colors.pink50,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    borderRadius: 6,
    marginTop: "20%",
    elevation: 8,
  },
  itemContainer: {
    marginTop: "5%",
  },
  text: {
    fontFamily: "ubuntu-bold",
  },
  formItemContiainer: {
    marginVertical: 15,
    backgroundColor: Colors.primaryBold,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 6,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formInnerContainer: {
    width: "45%",
  },
});
