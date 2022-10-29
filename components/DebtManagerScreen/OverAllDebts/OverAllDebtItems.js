import { FlatList } from "react-native";
import OverAllDebtItem from "./OverAllDebtItem";

const OverAllDebtItems = ({ data }) => {
  const onDispalyDebtItemHander = ({ item }) => {
    return <OverAllDebtItem item={item} />;
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
export default OverAllDebtItems;
