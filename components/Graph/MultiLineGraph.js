import { Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import ScrollViewWrapper from "../wrapper/ScrollViewWrapper";
const MultiLineGraph = ({ datasets, labels, legends }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <LineChart
        data={{
          labels: labels,
          datasets: datasets,
          legend: legends,
        }}
        width={Dimensions.get("window").width + 30}
        height={300}
        fromZero={true}
        yAxisLabel={state.currency.symbol}
        showValuesOnTopOfBars={true}
        showBarTops={true}
        verticalLabelRotation={-30}
        xLabelsOffset={20}
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
export default MultiLineGraph;
