import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const MultiBarChart = () => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  return (
    <BarChart
      data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            // color: (opacity = 1) => `rgba(163, 15, 5, ${opacity})`,
          },
          {
            data: [200, 45, 28, 80, 99, 43],
            // color: (opacity = 1) => `rgba(163, 15, 5, ${opacity})`,
          },
        ],
        legend: ["Income", "Expense"],
      }}
      width={Dimensions.get("window").width - 16}
      height={220}
      fromZero={true}
      yAxisLabel={state.currency.symbol}
      showValuesOnTopOfBars={true}
      showBarTops={true}
      verticalLabelRotation={-30}
      chartConfig={{
        backgroundColor: "#1cc910",
        backgroundGradientFrom: "#eff3ff",
        backgroundGradientTo: "#efefef",
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
  );
};
export default MultiBarChart;
