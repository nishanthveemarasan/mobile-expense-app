import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import { Colors } from "../../../constants/colors";
import {
  getDateGroup,
  getDateWithYYYYMMDD,
  restrictDecimalPlace,
  splitStr,
} from "../../../helper/helper";
import { required } from "../../../helper/validator";
import DatePicker from "../../../UI/DatePicker";
import Eswitch from "../../../UI/Eswitch";
import Input from "../../../UI/Input";
import Label from "../../../UI/Label";
import InputWithIcon from "../../../UI/InputWithIcon";
import ECButton from "../../../UI/ECButton";
import {
  deleteExepenseItem,
  updateExepenseItem,
} from "../../../store/reducer/expense-reducer";

const UpdateExpenseItemScreen = ({ navigation, route }) => {
  const mapStateToProps = (state) => {
    return {
      selectedCategory: state.expenseStore.selectedCategory,
      selectedExpenseItem: state.expenseStore.selectedExpenseItem,
    };
  };
  const state = useSelector(mapStateToProps);

  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [formData, setFormData] = useState({
    amount: {
      value: "",
      valid: false,
      validator: [required],
      error: "Please enter a valid amount to process your request!!",
    },
    date: {
      value: getDateWithYYYYMMDD(),
      valid: true,
    },
    category: {
      value: "",
      valid: false,
      validator: [required],
      error: "Select a category to process your request!!",
    },
  });

  useEffect(() => {
    const data = state.selectedExpenseItem;
    navigation.setOptions({
      title:
        data.type == "expense"
          ? "Update/Delete Expense"
          : "Update/Delete Income",
      headerStyle: {
        backgroundColor:
          data.type == "expense" ? Colors.danger400 : Colors.success500,
      },
    });
    setIsEnabled(data.type == "expense" ? false : true);
    setFormData((prevState) => {
      const copyData = { ...prevState };
      copyData.amount = {
        ...copyData.amount,
        value: restrictDecimalPlace(data.amount),
        valid: true,
      };
      console.log(copyData);
      copyData.date = {
        ...copyData.date,
        value: getDateWithYYYYMMDD(data.date),
        valid: true,
      };
      copyData.category = {
        ...copyData.category,
        value: data.selectedCategory,
        valid: true,
      };
      return { ...copyData };
    });
    if (state.selectedCategory) {
      setFormData((prevState) => {
        return {
          ...prevState,
          category: {
            ...prevState.category,
            value: state.selectedCategory,
            valid: true,
          },
        };
      });
    }
  }, [state.selectedExpenseItem, state.selectedCategory]);

  const onChangeFormData = (type, value) => {
    let formValue = value;
    if (type == "date") {
      formValue = getDateWithYYYYMMDD(value);
    }

    let valid = true;
    if (formData[type].validator) {
      for (let validator of formData[type].validator) {
        valid = valid && validator(value);
      }
    }
    setFormData((prevState) => {
      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          value: formValue,
          valid: true,
        },
      };
    });
  };

  const onUpdateExpenseItemHandler = () => {
    console.log(state.selectedExpenseItem);
    const dateGroup = getDateGroup(formData.date.value);
    const getCategory = splitStr(formData.category.value, ":");
    const data = {
      ...state.selectedExpenseItem,
      newValue: isEnabled
        ? restrictDecimalPlace(formData.amount.value)
        : -restrictDecimalPlace(formData.amount.value),
      date: formData.date.value,
      day: dateGroup.dayNumber,
      month: dateGroup.monthNumber,
      week: dateGroup.weekNumber,
      year: dateGroup.yearNumber,
      selectedCategory: formData.category.value,
      category: getCategory[0],
      subCategory: getCategory.length == 2 ? getCategory[1] : getCategory[0],
    };
    dispatch(updateExepenseItem(data, navigation));
  };
  const onDeleteExpenseItemHandler = () => {
    dispatch(deleteExepenseItem(state.selectedExpenseItem, navigation));
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View style={styles.typeContainer}>
        <Eswitch
          value={isEnabled}
          array={["Income", "Expense"]}
          disabled={true}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formItemContiainer}>
          <Label name="Amount" />
          <Input
            type="decimal-pad"
            placeHolder="0.00"
            onChange={onChangeFormData}
            inputType="amount"
            value={formData.amount.value.toString()}
            editable={true}
          />
        </View>
        <View style={styles.formItemContiainer}>
          <Label name="Date Performed" />
          <DatePicker
            value={formData.date.value}
            onSetDate={onChangeFormData}
            type="date"
          />
        </View>
        <View style={styles.formItemContiainer}>
          <Label name="Category" />
          <InputWithIcon
            type="decimal-pad"
            placeHolder="0.00"
            onChange={onChangeFormData}
            inputType="category"
            value={formData.category.value}
            editable={false}
            disabled={isEnabled}
            action="update"
          />
        </View>
        <View style={styles.buttonContainer}>
          <ECButton
            name="Update"
            style={styles.saveButton}
            onPressed={onUpdateExpenseItemHandler}
          />
          <ECButton
            name="Delete"
            style={styles.addNewButton}
            onPressed={onDeleteExpenseItemHandler}
          />
        </View>
      </View>
    </LinearGredientWrapper>
  );
};
export default UpdateExpenseItemScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginVertical: 3,
    marginHorizontal: 5,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formContainer: {
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  formItemContiainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
  },
  saveButton: {
    backgroundColor: Colors.primary500,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  addNewButton: {
    backgroundColor: Colors.danger400,
    marginRight: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
});
