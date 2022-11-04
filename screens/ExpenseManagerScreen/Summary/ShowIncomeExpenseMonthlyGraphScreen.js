import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import Heading from "../../../components/General/Heading";
import MultiLineGraph from "../../../components/Graph/MultiLineGraph";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../../components/wrapper/ScrollViewWrapper";
import {
  extractMonthlyExpenseIncomeDataValues,
  getMonthlySummaryChartData,
} from "../../../helper/expense";
import EActivityIndicator from "../../../UI/EActivityIndicator";

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
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [legends, setLegends] = useState([]);
  const [categoryWiseSeries, setCategoryWiseSeries] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    avg: 0,
  });
  const [monthlyExpenseAndIncomeInTotal, setMonthlyExpenseAndIncomeInTotal] =
    useState({
      labels: [],
      series: [],
    });
  useEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
    setLoading(true);
    setSelectedYear(state.yearArray[0]);

    const allGraphData = getMonthlySummaryChartData(
      state.data,
      state.yearArray[0]
    );
    const result = extractMonthlyExpenseIncomeDataValues(
      allGraphData.summaryData,
      state.yearArray[0]
    );
    console.log(result);
    setSeries(result.series);
    setLegends(result.legends);
    setLabels(result.summaryChartInTotal.labels);
    setSummary({
      expense: result.summaryChartInTotal.totalExpense,
      income: result.summaryChartInTotal.totalIncome,
      avg: result.summaryChartInTotal.avgSpending,
    });
    setMonthlyExpenseAndIncomeInTotal({
      series: result.summaryChartInTotal.series,
      labels: result.summaryChartInTotal.labels,
    });
    const categoryMonthlyData = allGraphData.categoryChartData;
    let categoryWise = [];
    allGraphData.categories.forEach((category) => {
      if (category.toLowerCase() != "income") {
        categoryWise.push({
          name: category,
          data: categoryMonthlyData[category],
        });
      }
    });
    setCategoryWiseSeries(categoryWise);
    setLoading(false);
  }, [state.data, state.yearArray]);
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <ScrollViewWrapper>
        {loading ? (
          <EActivityIndicator />
        ) : (
          <>
            <Heading heading="Expense Vs Income in Line Chart(Monthly)" />
            <MultiLineGraph
              datasets={series}
              labels={labels}
              legends={legends}
            />
            <Heading heading="Expense Vs Income in Line Chart(In Total)" />
            <MultiLineGraph
              datasets={monthlyExpenseAndIncomeInTotal.series}
              labels={labels}
              legends={legends}
            />
          </>
        )}
      </ScrollViewWrapper>
    </LinearGredientWrapper>
  );
};
export default ShowIncomeExpenseMonthlyGraphScreen;
