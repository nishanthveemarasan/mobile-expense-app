import { Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { CUR } from "../../../constants/months";
const SummaryLineGraph = ({ xAxis, yAxis, height }) => {
  return (
    <ScrollView horizontal={true}>
      <LineChart
        data={{
          labels: xAxis,
          datasets: [
            {
              data: yAxis,
            },
          ],
        }}
        width={Dimensions.get("window").width - 16} // from react-native
        height={height}
        yAxisLabel={CUR}
        fromZero={true}
        verticalLabelRotation={-30}
        yLabelsOffset={5}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8200",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
};
export default SummaryLineGraph;
