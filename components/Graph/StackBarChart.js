import { Dimensions, ScrollView } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const StackBarChart = ({
  chartLabels,
  chartBarColors,
  chartData,
  chartLegends,
}) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <StackedBarChart
        data={{
          labels: chartLabels,
          legend: chartLegends,
          data: chartData,
          barColors: chartBarColors,
        }}
        width={Dimensions.get("window").width + 250}
        height={300}
        fromZero={true}
        yAxisLabel={state.currency.symbol}
        showValuesOnTopOfBars={true}
        showBarTops={true}
        barPercentage={0.5}
        xLabelsOffset={20}
        showLegend={true}
        decimalPlaces={0}
        chartConfig={{
          backgroundColor: "#ffefad",
          backgroundGradientFrom: "#ffefad",
          backgroundGradientTo: "#ffefad",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(122, 13, 100, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
};
export default StackBarChart;
