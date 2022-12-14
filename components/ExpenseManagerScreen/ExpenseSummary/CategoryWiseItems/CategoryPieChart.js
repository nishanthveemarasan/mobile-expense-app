import { StyleSheet, Text, View } from "react-native";
import { ColorArray, Colors } from "../../../../constants/colors";
import {
  objKeysLength,
  restrictDecimalPlace,
  toLower,
} from "../../../../helper/helper";
import PieGraph from "../../../Graph/PieGraph";

const CategoryPieChart = ({ chartData }) => {
  let i = 0;
  const chart = [];
  for (const key in chartData) {
    if (toLower(key) != "income") {
      let element = {
        name: `${key}`,
        population: restrictDecimalPlace(chartData[key].total),
        color: ColorArray[i],
        legendFontColor: ColorArray[i],
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
        <>
          {chart.length > 0 && (
            <>
              <View style={styles.summaryHeading}>
                <Text style={styles.summaryText}>Expense Summary Chart</Text>
              </View>
              <PieGraph chartData={chart} />
            </>
          )}
        </>
      )}
    </View>
  );
};
export default CategoryPieChart;

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
  summaryHeading: {
    backgroundColor: Colors.primary900,
    paddingVertical: 10,
    borderRadius: 5,
  },
  summaryText: {
    color: "white",
    fontFamily: "ubuntu-regular",
    textAlign: "center",
    fontWeight: "bold",
  },
});
