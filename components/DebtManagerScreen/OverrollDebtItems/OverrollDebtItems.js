import { FlatList } from "react-native";
import OverAllDebtItem from "../OverAllDebts/OverAllDebtItem";
import OverrollDebtItem from "./OverrollDebtItem";
import DebtItem from "./OverrollDebtItem";

const OverrollDebtItems = ({ data, name }) => {
  const onDispalyDebtItemHander = ({ item }) => {
    return <OverrollDebtItem data={item} name={name} />;
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

export default OverrollDebtItems;
