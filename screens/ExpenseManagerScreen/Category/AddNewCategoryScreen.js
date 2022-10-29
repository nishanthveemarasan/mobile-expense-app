import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import { required } from "../../../helper/validator";
import Input from "../../../UI/Input";
import Label from "../../../UI/Label";
import { Ionicons } from "@expo/vector-icons";
import Eselector from "../../../UI/Eselector";
import { Colors } from "../../../constants/colors";
import ECButton from "../../../UI/ECButton";
import SubInputGroup from "../../../components/ExpenseManagerScreen/ExpenseCategory/SubInputGroup";
import SubInputGroups from "../../../components/ExpenseManagerScreen/ExpenseCategory/SubInputGroups";
import { getFirstLetterUpperWord } from "../../../helper/helper";
import { addNewCategory } from "../../../store/reducer/expense-reducer";

const AddNewCategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const mapStateToProps = (state) => {
    return {
      token: state.expenseStore.appToken,
      categoryNames: state.expenseStore.payment.categoryNames,
    };
  };
  const state = useSelector(mapStateToProps);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    items: [],
  });
  useEffect(() => {
    let category = state.categoryNames[0].value;
    setFormData((prevState) => {
      return {
        ...prevState,
        category,
      };
    });
  }, [state.categoryNames]);
  const onChangeFormData = (type, value) => {
    setFormData((preState) => {
      return {
        ...preState,
        category: value,
      };
    });
  };
  const onOpenAddCategoryHandler = () => {
    setShowAddCategory(true);
    setFormData((prevState) => {
      return {
        ...prevState,
        category: "",
      };
    });
  };

  const onAddSubCategoryHandler = () => {
    if (!required(formData.category)) {
      Alert.alert("Warning!", "Please Enter a main category/subCategory");
      return false;
    }
    const array = formData.items.slice();
    array.push("");
    setFormData((preState) => {
      return {
        ...preState,
        items: [...array],
      };
    });
  };
  const onUpdateSubItemHandler = (value, index) => {
    setFormData((prevState) => {
      const copyItems = prevState.items.slice();
      copyItems[index] = getFirstLetterUpperWord(value);
      return {
        ...prevState,
        items: [...copyItems],
      };
    });
  };

  const onDeleteSubItemHandler = (index) => {
    setFormData((prevState) => {
      const copyItems = prevState.items.slice();
      copyItems.splice(index, 1);
      return {
        ...prevState,
        items: [...copyItems],
      };
    });
  };

  const onAddCategoryHandler = () => {
    if (!required(formData.category)) {
      Alert.alert("Warning!", "Please Enter a main category/subCategory");
      return false;
    }
    let formIsValid = true;
    formData.items.forEach((item, index) => {
      if (!required(item)) {
        Alert.alert(
          "Warning!",
          `Please remove or fill in the empty sub item box`
        );
        formIsValid = false;
        return false;
      }
    });
    if (formIsValid) {
      dispatch(addNewCategory(formData, navigation));
    }
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      {showAddCategory ? (
        <View style={styles.amountContainer}>
          <Label name="Main Category" />
          <Input
            type="default"
            placeHolder="Enter Main Category here.."
            onChange={onChangeFormData}
            inputType="mainCategory"
            value={formData.category}
            editable={true}
          />
        </View>
      ) : (
        <View style={styles.amountContainer}>
          <View style={{ flexDirection: "row" }}>
            <Label name="Main Category" />
            {!showAddCategory && (
              <Text style={styles.warningText}>(Add if not in the list)</Text>
            )}
          </View>
          <View style={styles.usersContainer}>
            <View style={styles.selectContainer}>
              <Eselector
                selectItems={state.categoryNames}
                onSelectedItem={onChangeFormData}
                value={formData.category}
                type="category"
                enabled={true}
              />
            </View>
            <View style={styles.iconContainer}>
              <Pressable
                android_ripple={{ color: "pink" }}
                style={({ pressed }) => [
                  styles.pressable,
                  pressed ? styles.pressed : null,
                ]}
                disabled={showAddCategory}
                onPress={onOpenAddCategoryHandler}
              >
                <Ionicons
                  name="add-circle"
                  size={48}
                  color="white"
                  style={[
                    styles.dataIcon,
                    !showAddCategory ? { color: Colors.primary500 } : null,
                  ]}
                />
              </Pressable>
            </View>
          </View>
        </View>
      )}
      <View style={styles.amountContainer}>
        <ECButton
          name="Add Sub Category"
          style={styles.subCateButton}
          onPressed={onAddSubCategoryHandler}
        />
      </View>
      <View>
        {formData.items.length > 0 && (
          <View style={styles.groupContainer}>
            <SubInputGroups
              data={formData.items}
              onChange={onUpdateSubItemHandler}
              onDelete={onDeleteSubItemHandler}
              onAddHandler={onAddCategoryHandler}
            />
          </View>
        )}
      </View>
    </LinearGredientWrapper>
  );
};
export default AddNewCategoryScreen;

const styles = StyleSheet.create({
  amountContainer: {
    marginVertical: 14,
  },
  warningText: {
    marginTop: 3,
    fontFamily: "ubuntu-regular",
  },
  iconContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  usersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectContainer: {
    width: "85%",
  },
  subCateButton: {
    backgroundColor: Colors.danger400,
    marginRight: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  groupContainer: {
    marginTop: 10,
  },
});
