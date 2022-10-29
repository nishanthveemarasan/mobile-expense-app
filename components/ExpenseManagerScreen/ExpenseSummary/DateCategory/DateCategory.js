import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../constants/colors";

const DateCategory = ({ data, change, curIndex }) => {
  const onChangeIndexHandler = (index) => {
    change(index);
  };
  const onDisplayDateHandler = ({ item, index }) => {
    return (
      <Pressable
        android_ripple={{ color: Colors.pink50 }}
        style={[
          styles.dateItemContainer,
          index == curIndex
            ? {
                backgroundColor: Colors.primary850,
              }
            : null,
        ]}
        onPress={onChangeIndexHandler.bind(this, index)}
      >
        <Text
          style={[
            styles.textContainer,
            index == curIndex ? { color: "white" } : null,
          ]}
        >{`${item.dateStart} - ${item.dateEnd}`}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={data}
        renderItem={onDisplayDateHandler}
        keyExtractor={(item, index) => index}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
export default DateCategory;

const styles = StyleSheet.create({
  rootContainer: {
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dateItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 10,
  },
  textContainer: {
    fontFamily: "ubuntu-regular",
  },
});
