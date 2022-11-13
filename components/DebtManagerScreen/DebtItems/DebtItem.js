import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { numberFormat } from "../../../helper/helper";

const DebtItem = ({ data }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  const navigation = useNavigation();
  const onEditDebtItemHAndler = () => {
    navigation.navigate("AddDebtScreen", {
      data,
      type: "edit",
    });
  };
  const amountColor = {
    color: data.type == "lend" ? Colors.success400 : Colors.danger400,
  };
  const borderColor = {
    borderLeftColor: data.type == "lend" ? Colors.success400 : Colors.danger400,
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.rootContainer,
        borderColor,
        pressed ? styles.itemPressed : null,
      ]}
      onPress={onEditDebtItemHAndler}
    >
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{data.name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.descriptionText}>{data.description}</Text>
        </View>
        <View>
          <Text style={styles.dateText}>{data.date}</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.amountText, amountColor]}>
          {numberFormat(data.amount, state.currency)}
        </Text>
      </View>
    </Pressable>
  );
};

export default DebtItem;

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
    borderLeftWidth: 10,
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
  dateText: {
    fontFamily: "ubuntu-light",
    color: "#D3D3D3",
  },
  amountText: {
    fontFamily: "ubuntu-bold",
    fontSize: 19,
    color: Colors.primary500,
  },
  itemPressed: {
    opacity: 0.5,
  },
});
