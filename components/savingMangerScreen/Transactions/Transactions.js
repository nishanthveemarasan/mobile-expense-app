import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../../constants/colors";
import TransactionItem from "./TransactionItem";

const Transactions = () => {
  const mapStateToProps = (state) => {
    return {
      data: state.savingStore.data,
    };
  };
  const state = useSelector(mapStateToProps);

  const onDisplayTransactionHandler = ({ item }) => {
    return <TransactionItem data={item} />;
  };
  return (
    <View style={styles.rootContainer}>
      {state.data.length == 0 && (
        <View style={styles.wargingTextContainer}>
          <Text style={styles.wargingText}>
            No Transaction has been made Yet
          </Text>
        </View>
      )}
      <FlatList
        data={state.data}
        keyExtractor={(item) => item.uuid}
        renderItem={onDisplayTransactionHandler}
        initialNumToRender={7}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default Transactions;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  wargingTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.pink50,
    paddingVertical: 30,
    borderRadius: 6,
    elevation: 8,
    marginTop: 40,
  },
  wargingText: {
    fontFamily: "ubuntu-regular",
    fontSize: 18,
    color: Colors.primary900,
  },
});
