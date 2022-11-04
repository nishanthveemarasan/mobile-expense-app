import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { CUR } from "../../constants/months";
const MultiLineGraph = ({ datasets, labels, legends }) => {
  console.log(datasets);
  return (
    <LineChart
      data={{
        labels: labels,
        datasets: datasets,
        legend: legends,
      }}
      width={Dimensions.get("window").width - 16}
      height={300}
      fromZero={true}
      yAxisLabel={CUR}
      showValuesOnTopOfBars={true}
      showBarTops={true}
      verticalLabelRotation={-30}
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
  );
};
export default MultiLineGraph;
