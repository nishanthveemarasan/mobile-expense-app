import { FlatList, StyleSheet, View } from "react-native";
import OverAllDebtItem from "../OverAllDebts/OverAllDebtItem";
import OverrollDebtItem from "./OverrollDebtItem";
import DebtItem from "./OverrollDebtItem";

const OverrollDebtItems = ({ data, name }) => {
  const onDispalyDebtItemHander = ({ item }) => {
    return <OverrollDebtItem data={item} name={name} />;
  };
  return (
    <View style={styles.rootConatiner}>
      <FlatList
        data={data}
        renderItem={onDispalyDebtItemHander}
        keyExtractor={(item) => item.uuid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OverrollDebtItems;

const styles = StyleSheet.create({
  rootConatiner: {
    flex: 1,
    marginTop: 15,
  },
});
