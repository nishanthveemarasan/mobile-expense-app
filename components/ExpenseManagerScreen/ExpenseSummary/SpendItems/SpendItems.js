import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { expenseStoreAction } from "../../../../store/store";
import CModal from "../../../../UI/CModal";
import SpendItem from "./SpendItem";

const SpendItems = ({ data, showCategory }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onDispalySpendItemHander = ({ item }) => {
    const onEditExpenseItemHandle = (itemData) => {
      dispatch(expenseStoreAction.updateExpenseItem({ data: itemData }));
      navigation.navigate("UpdateExpenseItemScreen");
    };
    return (
      <SpendItem
        data={item}
        showCategory={showCategory}
        onEdit={onEditExpenseItemHandle}
      />
    );
  };
  return (
    <>
      <FlatList
        data={data}
        renderItem={onDispalySpendItemHander}
        keyExtractor={(item) => item.uuid}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default SpendItems;
