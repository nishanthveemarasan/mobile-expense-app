import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import { Colors } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { updateRecurringFormDataForUpdate } from "../../../store/reducer/expense-reducer";
// import { expenseStoreAction } from "../../../store";

const ShowRecurringPaymentItemScreen = ({ route, navigation }) => {
  const mapStateToProps = (state) => {
    return {
      data: state.expenseStore.selectedRecurringItem,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      title: state.data.name,
      headerRight: () => (
        <Pressable
          onPress={onChangePageHandler}
          style={({ pressed }) => (pressed ? styles.pressed : null)}
        >
          {state.data.status == "active" && (
            <Ionicons name="create" size={35} color="white" />
          )}
        </Pressable>
      ),
    });
  }, [state.data]);

  const onChangePageHandler = () => {
    if (state.data.status == "active") {
      dispatch(updateRecurringFormDataForUpdate(navigation));
    }
  };

  const repeatPayments = state.data.repeat_payments;

  const onShowPayItemHandler = ({ item, index }) => {
    return (
      <View style={styles.repeatPayitemContainer}>
        <Text style={styles.itemText}>{index + 1}</Text>
        <Text style={styles.itemText}>{item.pay_date}</Text>
        <Text style={styles.itemText}>{item.amount}</Text>
      </View>
    );
  };

  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View>
        <View style={styles.summaryContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.headingText}>Category : </Text>
            <Text style={styles.valueText}>{state.data.category} </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.headingText}>Cycle Length : </Text>
            <Text style={styles.valueText}>
              {state.data.num_of_pay == 0 ? "Unlimited" : state.data.num_of_pay}{" "}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.headingText}>Payment Made : </Text>
            <Text style={styles.valueText}>{state.data.current_pay_num} </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.headingText}>Next Payment Date : </Text>
            <Text style={styles.valueText}>{state.data.next_pay_date} </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.headingText}>Status : </Text>
            <Text style={styles.valueText}>{state.data.status} </Text>
          </View>
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.historyText}>Payment History</Text>
        </View>
        <View>
          {repeatPayments.length > 0 ? (
            <View style={{ marginVertical: 15 }}>
              <View style={styles.repeatPayHeading}>
                <Text style={styles.repeatPayHeadingText}>Pay Number</Text>
                <Text style={styles.repeatPayHeadingText}>Date</Text>
                <Text style={styles.repeatPayHeadingText}>Amount</Text>
              </View>
              <View>
                <FlatList
                  data={repeatPayments}
                  keyExtractor={(item) => item.uuid}
                  renderItem={onShowPayItemHandler}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          ) : (
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>
                No Payment has been made Yet!!!
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGredientWrapper>
  );
};
export default ShowRecurringPaymentItemScreen;

const styles = StyleSheet.create({
  summaryContainer: {
    borderWidth: 1,
    borderRadius: 6,
    elevation: 4,
    padding: 8,
    marginVertical: 10,
    backgroundColor: "#03021f",
  },
  rowContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingVertical: 10,
  },
  headingText: {
    fontFamily: "ubuntu-regular",
    fontSize: 14,
    color: "#b861b1",
  },
  valueText: {
    fontFamily: "ubuntu-regular",
    marginLeft: 6,
    color: "#9c9ad6",
  },
  repeatPayHeading: {
    backgroundColor: Colors.danger400,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  repeatPayHeadingText: {
    color: "white",
    fontFamily: "ubuntu-bold",
  },
  repeatPayitemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.pink50,
    marginVertical: 6,
    borderRadius: 6,
    elevation: 6,
  },
  itemText: {
    fontFamily: "ubuntu-regular",
    color: Colors.primary500,
  },
  pressed: {
    opacity: 0.5,
  },

  warningContainer: {
    height: 70,
    backgroundColor: Colors.pink50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    elevation: 4,
    marginTop: "10%",
  },
  warningText: {
    fontFamily: "ubuntu-bold",
    fontSize: 15,
  },
  headingContainer: {
    backgroundColor: Colors.primary1000,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    elevation: 4,
    marginTop: "5%",
    paddingVertical: 10,
  },
  historyText: {
    fontFamily: "ubuntu-bold",
    fontSize: 15,
    color: "white",
  },
});
