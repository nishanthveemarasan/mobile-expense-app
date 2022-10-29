import { StyleSheet, Text, View } from "react-native";
import { ColorArray, Colors } from "../../../constants/colors";
import {
  objKeysLength,
  restrictDecimalPlace,
  toLower,
} from "../../../helper/helper";
import PieGraph from "../../Graph/PieGraph";

const DashboardPieChart = ({ chartData }) => {
  const chart = [];
  let i = 0;
  for (const key in chartData) {
    let color = key == "income" ? Colors.success450 : ColorArray[i];
    if (toLower(key) != "income") {
      let element = {
        name: `${key}`,
        population: restrictDecimalPlace(chartData[key]),
        color: color,
        legendFontColor: color,
        legendFontSize: 15,
      };
      chart.push(element);
      i++;
    }
  }
  return (
    <View>
      {objKeysLength(chartData) == 0 ? (
        <View style={styles.outerContainer}>
          <Text style={styles.text}>No Data to Show</Text>
        </View>
      ) : (
        <PieGraph chartData={chart} />
      )}
    </View>
  );
};
export default DashboardPieChart;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: Colors.pink50,
    borderRadius: 6,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    elevation: 6,
    marginTop: 20,
  },
  text: {
    fontFamily: "ubuntu-bold",
  },
});
