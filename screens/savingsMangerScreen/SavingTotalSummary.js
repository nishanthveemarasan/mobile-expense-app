import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import SummaryLineGraph from "../../components/savingMangerScreen/Graph/SummaryLineGraph";
import SummayForYear from "../../components/savingMangerScreen/Transactions/SummayForYear";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../components/wrapper/ScrollViewWrapper";
import { monthsName } from "../../constants/months";

import {
  generateDropdownFormat,
  getSummaryMonthlyWise,
  getYear,
} from "../../helper/helper";
import EActivityIndicator from "../../UI/EActivityIndicator";
import Eselector from "../../UI/Eselector";
import Label from "../../UI/Label";

const SavingTotalSummary = () => {
  const mapStateToProps = (state) => {
    return {
      yearArray: state.savingStore.years,
      data: state.savingStore.data,
    };
  };
  const state = useSelector(mapStateToProps);
  const [yearArray, setYearArray] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const years = generateDropdownFormat(state.yearArray);
    let currentYear = getYear(new Date());
    setYearArray(years);
    setSelectedYear(currentYear);
    const chartData = getSummaryMonthlyWise(state.data, currentYear);
    setChartData(chartData);
  }, [state.data]);

  const onYearChangeHandler = (type, year) => {
    setSelectedYear(year);
    setChartData([]);
    const chartData = getSummaryMonthlyWise(state.data, year);
    setChartData(chartData);
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      {yearArray.length > 0 && chartData.length > 0 ? (
        <ScrollViewWrapper>
          <View style={styles.rootContainer}>
            <View style={styles.amountContainer}>
              <Label name="Selected Year" />
              <Eselector
                selectItems={yearArray}
                onSelectedItem={onYearChangeHandler}
                value={selectedYear}
                type="year"
              />
            </View>
            <SummayForYear data={chartData} />
            <View>
              <SummaryLineGraph
                yAxis={chartData}
                xAxis={monthsName}
                height={450}
              />
            </View>
          </View>
        </ScrollViewWrapper>
      ) : (
        <EActivityIndicator />
      )}
    </LinearGredientWrapper>
  );
  // <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
  //   <ScrollViewWrapper>
  //     <View style={styles.rootContainer}>
  //       <View style={styles.amountContainer}>
  //         <Label name="Selected Year" />
  //         {/* <Eselector
  //           selectItems={yearArray}
  //           onSelectedItem={onYearChangeHandler}
  //           value={selectedYear}
  //           type="year"
  //         /> */}
  //       </View>
  //       <View>
  //         {/* <SummaryLineGraph
  //           yAxis={chartData}
  //           xAxis={monthsName}
  //           height={450}
  //         /> */}
  //       </View>
  //     </View>
  //   </ScrollViewWrapper>
  // </LinearGredientWrapper>
};
export default SavingTotalSummary;

const styles = StyleSheet.create({
  rootContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  amountContainer: {
    marginBottom: "7%",
  },
});
