import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../../../constants/colors";
import {
  numberFormat,
  restrictDecimalPlace,
  splitStr,
  upperCase,
} from "../../../../helper/helper";

const SpendItem = ({ data, showCategory, onEdit }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  // console.log(data);
  // const onEditDebtItemHAndler = () => {
  //   navigation.navigate("AddDebtScreen", {
  //     data,
  //     type: "edit",
  //   });
  // };
  const category = splitStr(data.selectedCategory, ":");

  const amountColor = {
    color: data.type == "income" ? Colors.success400 : Colors.danger400,
  };
  const borderColor = {
    borderLeftColor:
      data.type == "income" ? Colors.success400 : Colors.danger400,
  };
  const onEditDebtItemHAndler = () => {
    onEdit(data);
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
        {showCategory && (
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{upperCase(category[0])}</Text>
          </View>
        )}
        {data.type == "expense" && (
          <View style={styles.textContainer}>
            <Text style={styles.descriptionText}>{upperCase(category[1])}</Text>
          </View>
        )}
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

export default SpendItem;

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
    height: 80,
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
    color: "#A9A9A9",
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
