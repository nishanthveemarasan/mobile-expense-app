import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ColorArray, Colors } from "../../../../constants/colors";
import { CUR } from "../../../../constants/months";
import { getPercentage } from "../../../../helper/expense";
import { Ionicons } from "@expo/vector-icons";
import { getRandom } from "../../../../helper/helper";
const CategoryWiseItem = ({ data, category, balance, income }) => {
  const item = data[category];
  const navigation = useNavigation();
  // const onEditDebtItemHAndler = () => {
  //   navigation.navigate("AddDebtScreen", {
  //     data,
  //     type: "edit",
  //   });
  // };
  // const category = splitStr(data.selectedCategory, ":");

  const amountColor = {
    color: category == "income" ? Colors.success450 : Colors.danger400,
  };
  const borderColor = {
    borderLeftColor: ColorArray[getRandom(ColorArray.length)],
  };

  const onEditDebtItemHAndler = () => {
    navigation.navigate("CategoryExpenseItemsScreen", {
      data: item,
      category,
    });
  };
  return (
    <Pressable
      android_ripple={{ color: "#663399" }}
      style={({ pressed }) => [
        styles.rootContainer,
        borderColor,
        pressed ? styles.itemPressed : null,
      ]}
      onPress={onEditDebtItemHAndler}
    >
      <View>
        <Text style={styles.nameText}>{category}</Text>
      </View>
      <View>
        <Text style={[styles.amountText, amountColor]}>
          {getPercentage(item.total, category, balance, income)}
        </Text>
      </View>
      <View>
        <Ionicons name="arrow-forward-circle" size={24} color="#708090" />
      </View>
    </Pressable>
  );
};

export default CategoryWiseItem;

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
    borderLeftColor: ColorArray[getRandom(ColorArray.length)],
    height: 70,
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
    fontSize: 15,
    color: Colors.danger400,
  },
  itemPressed: {
    opacity: 0.5,
  },
});
