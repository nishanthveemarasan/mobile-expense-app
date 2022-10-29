import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../../../constants/colors";
import { expenseStoreAction } from "../../../store/store";

const ExpenseCategory = ({ category, cIndex, action }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const onSelectedCategoryItem = (itemIndex) => {
    dispatch(
      expenseStoreAction.updateCategory({
        catId: categoryIndex,
        itemId: itemIndex,
      })
    );
    const page =
      action == "save" ? "AddExpenseItemScreen" : "UpdateExpenseItemScreen";
    navigation.navigate(page);
  };
  const onOpenCategoryHander = () => {
    setCategoryIndex(cIndex);
  };
  const onDisplayCategoryItemHandler = ({ item, index }) => {
    return (
      <Pressable
        style={styles.itemRootContainer}
        android_ripple={{ color: Colors.success900 }}
        onPress={onSelectedCategoryItem.bind(this, index)}
      >
        <Text style={styles.categoryText}>{item}</Text>
      </Pressable>
    );
  };
  return (
    <>
      <Pressable style={styles.rootContainer} onPress={onOpenCategoryHander}>
        <Text style={styles.categoryText}>{category.category}</Text>
      </Pressable>
      {categoryIndex == cIndex && (
        <FlatList
          data={category.items}
          keyExtractor={(item, index) => index}
          renderItem={onDisplayCategoryItemHandler}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};
export default ExpenseCategory;
const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.grey900,
    height: 70,
    justifyContent: "center",
    paddingLeft: 10,
    borderWidth: 1,
  },
  itemRootContainer: {
    backgroundColor: Colors.light500,
    height: 40,
    justifyContent: "center",
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  categoryText: {
    fontFamily: "ubuntu-bold",
    fontSize: 14,
  },
});
