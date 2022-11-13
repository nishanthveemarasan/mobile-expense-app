import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../../constants/colors";
import { numberFormat } from "../../../helper/helper";
const OverAllDebtItem = ({ item }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  const navigation = useNavigation();
  const balance = item.lendTotal - item.borrowTotal;
  const balanceColor = {
    color: balance > 0 ? Colors.success400 : Colors.danger400,
  };
  const onShowAllDebtItemsHandler = () => {
    navigation.navigate("OverrollDebtItemsScreen", {
      data: item,
    });
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.rootContainer,
        pressed ? styles.pressed : null,
      ]}
      onPress={onShowAllDebtItemsHandler}
    >
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View>
          <Text style={styles.dateText}>
            Total Lend :{" "}
            <Text style={styles.lentAmount}>
              {numberFormat(item.lendTotal, state.currency)}
            </Text>
          </Text>
        </View>
        <View>
          <Text style={styles.dateText}>
            Total Borrow :{" "}
            <Text style={styles.borrowAmount}>
              {numberFormat(item.borrowTotal, state.currency)}
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <Text style={[styles.amountText, balanceColor]}>
          {numberFormat(balance, state.currency)}
        </Text>
      </View>
    </Pressable>
  );
};
export default OverAllDebtItem;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.pink50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 6,
    marginBottom: 8,
  },
  textContainer: {
    marginBottom: 6,
  },
  nameText: {
    fontFamily: "ubuntu-bold",
  },
  descriptionText: {
    fontFamily: "ubuntu-light-italic",
  },
  borrowAmount: {
    color: Colors.success400,
  },
  lentAmount: {
    color: Colors.danger400,
  },
  dateText: {
    fontFamily: "ubuntu-light",
    fontWeight: "bold",
    color: "#D3D3D3",
  },
  amountText: {
    fontFamily: "ubuntu-bold",
    fontSize: 19,
  },
  pressed: {
    opacity: 0.5,
  },
});
