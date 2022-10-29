import { FlatList } from "react-native";
import DebtItem from "./DebtItem";

const DebtItems = ({ data }) => {
  const onDispalyDebtItemHander = ({ item }) => {
    return <DebtItem data={item} />;
  };
  return (
    <FlatList
      data={data}
      renderItem={onDispalyDebtItemHander}
      keyExtractor={(item) => item.uuid}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default DebtItems;
