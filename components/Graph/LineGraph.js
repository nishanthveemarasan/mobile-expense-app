import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const LineGraph = ({ xAxis, yAxis, height }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  return (
    <BarChart
      data={{
        labels: xAxis,
        datasets: [
          {
            data: yAxis,
          },
        ],
      }}
      width={Dimensions.get("window").width - 25}
      height={height}
      fromZero={true}
      withInnerLines={false}
      yAxisLabel={state.currency.symbol}
      showBarTops={true}
      showValuesOnTopOfBars={true}
      chartConfig={{
        backgroundColor: "#994b57",
        backgroundGradientFrom: "#1cc910",
        backgroundGradientTo: "#1cc910",
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
export default LineGraph;
