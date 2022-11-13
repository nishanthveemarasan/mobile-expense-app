import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import ShowTotalSummary from "../../../components/ExpenseManagerScreen/ExpenseSummary/ShowExpenseSummaryScreen/ShowTotalSummary";
import Heading from "../../../components/General/Heading";
import MultiBarChart from "../../../components/Graph/MultiBarChart";
import MultiLineGraph from "../../../components/Graph/MultiLineGraph";
import StackBarChart from "../../../components/Graph/StackBarChart";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../../components/wrapper/ScrollViewWrapper";
import { ColorArray, Colors } from "../../../constants/colors";
import {
  extractMonthlyExpenseIncomeDataValues,
  getMonthlySummaryChartData,
} from "../../../helper/expense";
import { generateDropdownFormat } from "../../../helper/helper";
import EActivityIndicator from "../../../UI/EActivityIndicator";
import Eselector from "../../../UI/Eselector";
import Label from "../../../UI/Label";

const ShowIncomeExpenseMonthlyGraphScreen = ({ navigation, route }) => {
  const params = route.params;
  const mapStateToProps = (state) => {
    return {
      data: state.expenseStore.payment.data.expense,
      yearArray: state.expenseStore.expenseYearArray,
    };
  };
  const state = useSelector(mapStateToProps);

  const [loading, setLoading] = useState();
  const [labels, setLabels] = useState([]);
  const [monthlyLineGraph, setMonthlyLineGraph] = useState({
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
  const [selectedYear, setSelectedYear] = useState("");
  const [dropdownYear, setDropdownYear] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [monthlyExpenseAndIncomeInTotal, setMonthlyExpenseAndIncomeInTotal] =
    useState({
      legends: [],
      data: [],
      show: false,
    });
  useEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
    if (state.data.length > 0) {
      setLoading(true);
      setSelectedYear(state.yearArray[0]);
      let dropdownYearArray = generateDropdownFormat(state.yearArray);
      setDropdownYear(dropdownYearArray);

      const allGraphData = getMonthlySummaryChartData(
        state.data,
        state.yearArray[0]
      );
      const result = extractMonthlyExpenseIncomeDataValues(
        allGraphData.summaryData,
        state.yearArray[0]
      );

      setLabels(result.summaryChartInTotal.labels);
      setMonthlyLineGraph({
        legends: result.legends,
        data: result.series,
        show: result.series.length > 0 && result.legends.length > 0,
      });
      setSummary({
        expense: result.summaryChartInTotal.totalExpense,
        income: result.summaryChartInTotal.totalIncome,
        balance: result.summaryChartInTotal.totalBalance,
      });
      setMonthlyExpenseAndIncomeInTotal({
        data: result.summaryChartInTotal.series,
        legends: result.summaryChartInTotal.legends,
        show:
          result.summaryChartInTotal.series.length > 0 &&
          result.summaryChartInTotal.legends.length > 0,
      });
      const categoryMonthlyData = allGraphData.categoryChartData;

      let categoryWise = [];
      let categoriesLables = [];
      let barColors = [];
      for (let i = 0; i <= 11; i++) {
        let array = [];
        allGraphData.categories.forEach((category, index) => {
          if (category.toLowerCase() != "income") {
            if (i == 0) {
              categoriesLables.push(category);
              barColors.push(ColorArray[index]);
            }
            array.push(categoryMonthlyData[category][i]);
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
      setLoading(false);
    }
  }, [state.data, state.yearArray]);

  const onChangeYearHandler = (type, value) => {
    setLoading(true);
    setSelectedYear(value);
    let dropdownYearArray = generateDropdownFormat(state.yearArray);
    setDropdownYear(dropdownYearArray);

    const allGraphData = getMonthlySummaryChartData(state.data, value);
    const result = extractMonthlyExpenseIncomeDataValues(
      allGraphData.summaryData,
      value
    );
    setLabels(result.summaryChartInTotal.labels);
    setMonthlyLineGraph({
      legends: result.legends,
      data: result.series,
      show: result.series.length > 0 && result.legends.length > 0,
    });
    setSummary({
      expense: result.summaryChartInTotal.totalExpense,
      income: result.summaryChartInTotal.totalIncome,
      balance: result.summaryChartInTotal.totalBalance,
    });
    setMonthlyExpenseAndIncomeInTotal({
      data: result.summaryChartInTotal.series,
      legends: result.summaryChartInTotal.legends,
      show:
        result.summaryChartInTotal.series.length > 0 &&
        result.summaryChartInTotal.legends.length > 0,
    });
    const categoryMonthlyData = allGraphData.categoryChartData;

    let categoryWise = [];
    let categoriesLables = [];
    let barColors = [];
    for (let i = 0; i <= 11; i++) {
      let array = [];
      allGraphData.categories.forEach((category, index) => {
        if (category.toLowerCase() != "income") {
          if (i == 0) {
            categoriesLables.push(category);
            barColors.push(ColorArray[index]);
          }
          array.push(categoryMonthlyData[category][i]);
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
    setLoading(false);
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      {state.data.length > 0 ? (
        <ScrollViewWrapper>
          {loading ? (
            <EActivityIndicator />
          ) : (
            <>
              <View style={styles.formItemContiainer}>
                <Label name="Year" style={{ color: "white" }} />
                <Eselector
                  selectItems={dropdownYear}
                  onSelectedItem={onChangeYearHandler}
                  value={selectedYear}
                  type="year"
                  enabled={true}
                />
              </View>
              <View>
                <ShowTotalSummary
                  income={summary.income}
                  expense={summary.expense}
                  balance={summary.balance}
                />
              </View>
              {monthlyLineGraph.show && (
                <View style={styles.graphContainer}>
                  <Heading heading="Expense Vs Income in Line Chart(Monthly)" />
                  <MultiLineGraph
                    datasets={monthlyLineGraph.data}
                    labels={labels}
                    legends={monthlyLineGraph.legends}
                  />
                </View>
              )}
              {monthlyExpenseAndIncomeInTotal.show && (
                <View style={styles.graphContainer}>
                  <Heading heading="Expense Vs Income in Line Chart(In Total)" />
                  <MultiLineGraph
                    datasets={monthlyExpenseAndIncomeInTotal.data}
                    labels={labels}
                    legends={monthlyExpenseAndIncomeInTotal.legends}
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
export default ShowIncomeExpenseMonthlyGraphScreen;
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 6,
    elevation: 5,
  },
});
