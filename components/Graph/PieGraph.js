import { Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { CUR } from "../../constants/months";

const PieGraph = ({ chartData }) => {
  return (
    <ScrollView horizontal={true}>
      <PieChart
        data={chartData}
        width={Dimensions.get("window").width + 50}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </ScrollView>
  );
};
export default PieGraph;
