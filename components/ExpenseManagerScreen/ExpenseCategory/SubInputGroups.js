import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/colors";
import ECButton from "../../../UI/ECButton";
import LinearGredientWrapper from "../../wrapper/LinearGredientWrapper";
import SubInputGroup from "./SubInputGroup";

const SubInputGroups = ({ data, onChange, onDelete, onAddHandler }) => {
  const onDisplaySubGroupHandler = ({ item, index }) => {
    const onInputChangeHandler = (type, value) => {
      onChange(value, index);
    };
    const onDeleteInputHandler = () => {
      onDelete(index);
    };
    return (
      <SubInputGroup
        iconName="trash"
        onChange={onInputChangeHandler}
        value={item}
        onDelete={onDeleteInputHandler}
      />
    );
  };
  const addButtonComponent = () => {
    return (
      <View style={styles.buttonContainer}>
        <ECButton
          name="Save"
          style={styles.saveButton}
          onPressed={onAddHandler}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.flatListContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={onDisplaySubGroupHandler}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          onEndReachedThreshold={4}
          ListFooterComponent={addButtonComponent}
        />
      </View>
    </>
  );
};
export default SubInputGroups;
const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 20,
  },
  flatListContainer: {
    height: Dimensions.get("window").height - 300,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: Colors.primary500,
    paddingHorizontal: 8,
    borderRadius: 6,
    width: 150,
  },
});
