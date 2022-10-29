import { useEffect } from "react";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import AddDebtItem from "../../../components/DebtManagerScreen/NavigatorItem/AddDebtItem";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, View } from "react-native";
import ExpenseCategory from "../../../components/ExpenseManagerScreen/ExpenseCategory/ExpenseCategory";
const ShowExpenseCategoryScreen = ({ navigation, route }) => {
  const action = route.params.action;
  const mapStateToProps = (state) => {
    return {
      data: state.expenseStore.payment.data.category,
    };
  };
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddDebtItem page="AddNewCategoryScreen" />,
    });
  }, []);
  const onDisplayCategoryHandler = ({ item, index }) => {
    return <ExpenseCategory category={item} cIndex={index} action={action} />;
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View style={styles.rootContainer}>
        <FlatList
          data={state.data}
          keyExtractor={(item, index) => item.category}
          renderItem={onDisplayCategoryHandler}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGredientWrapper>
  );
};
export default ShowExpenseCategoryScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginVertical: 10,
  },
});
