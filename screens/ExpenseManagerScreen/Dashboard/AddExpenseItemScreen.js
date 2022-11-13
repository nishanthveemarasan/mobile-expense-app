import { useEffect, useState } from "react";
import { Alert, StyleSheet, Switch, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Transactions from "../../../components/ExpenseManagerScreen/AddExpense/Transactions";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import { Colors } from "../../../constants/colors";
import {
  findIndex,
  getDateGroup,
  getDateWithYYYYMMDD,
  restrictDecimalPlace,
  splitStr,
  UUID,
} from "../../../helper/helper";
import { required } from "../../../helper/validator";
import { addNewExpense } from "../../../store/reducer/expense-reducer";
import DatePicker from "../../../UI/DatePicker";
import ECButton from "../../../UI/ECButton";
import Eswitch from "../../../UI/Eswitch";
import Input from "../../../UI/Input";
import InputWithIcon from "../../../UI/InputWithIcon";
import Label from "../../../UI/Label";
import { v4 as uuid } from "uuid";

const AddExpenseItemScreen = ({ navigation }) => {
  const mapStateToProps = (state) => {
    return {
      selectedCategory: state.expenseStore.selectedCategory,
      token: state.authStore.token,
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
  }, [state.selectedCategory]);
  const onSwitchChangeHandler = () => {
    setIsEnabled((prevState) => !prevState);
    if (!isEnabled) {
      setFormData((prevState) => {
        return {
          ...prevState,
          category: {
            ...prevState.category,
            value: "Income",
            valid: true,
          },
        };
      });
    } else {
      setFormData((prevState) => {
        return {
          ...prevState,
          category: {
            ...prevState.category,
            value: "",
            valid: false,
          },
        };
      });
    }
  };
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

  const onAddNewTransactionHandler = () => {
    let isFormValid = true;
    for (let key in formData) {
      isFormValid = isFormValid && formData[key].valid;
      if (!formData[key].valid) {
        Alert.alert("Warning!", formData[key].error);
        return false;
      }
    }

    if (isFormValid) {
      const type = isEnabled ? "income" : "expense";
      const dateGroup = getDateGroup(formData.date.value);
      const getCategory = splitStr(formData.category.value, ":");

      const data = {
        uuid: uuid(),
        type: type,
        date: formData.date.value,
        day: dateGroup.dayNumber,
        month: dateGroup.monthNumber,
        selectedCategory: formData.category.value,
        week: dateGroup.weekNumber,
        year: dateGroup.yearNumber,
        category: getCategory[0],
        subCategory: getCategory.length == 2 ? getCategory[1] : getCategory[0],
        amount: isEnabled
          ? restrictDecimalPlace(formData.amount.value)
          : -restrictDecimalPlace(formData.amount.value),
      };

      setTransaction((prevState) => {
        const copyArray = [...prevState];
        copyArray.push(data);
        return [...copyArray];
      });
      setFormData((prevState) => {
        return {
          ...prevState,
          amount: {
            ...prevState.amount,
            value: "",
            valid: null,
          },
          category: {
            ...prevState.category,
            value: "",
            valid: null,
          },
        };
      });
    }
  };

  const ondeleteTransactionHander = (uuid) => {
    const index = findIndex(transaction, "uuid", uuid);
    setTransaction((prevState) => {
      const copyArray = prevState.slice();
      copyArray.splice(index, 1);
      return [...copyArray];
    });
  };

  const onAddTransactionHandler = () => {
    if (!formData.amount.valid) {
    }
    if (transaction.length == 0) {
      Alert.alert("Warning!", "Add at least one expense/income to process");
      return false;
    } else if (formData.amount.valid) {
      Alert.alert(
        "Warning!",
        "Please complete the form and add current Expense/income to process"
      );
      return false;
    } else if (formData.category.valid) {
      Alert.alert(
        "Warning!",
        "Please complete the form and add current Expense/income to process"
      );
      return false;
    } else {
      dispatch(
        addNewExpense({ expense: transaction }, navigation, state.token)
      );
    }

    setFormData((prevState) => {
      return {
        ...prevState,
        amount: {
          ...prevState.amount,
          value: "",
          valid: null,
        },
        category: {
          ...prevState.category,
          value: "",
          valid: null,
        },
      };
    });
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View style={styles.typeContainer}>
        <Eswitch
          value={isEnabled}
          onChange={onSwitchChangeHandler}
          array={["Income", "Expense"]}
          disabled={false}
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
            value={formData.amount.value}
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
            action="save"
          />
        </View>
        <View style={styles.buttonContainer}>
          <ECButton
            name="Save"
            style={styles.saveButton}
            onPressed={onAddTransactionHandler}
          />
          <ECButton
            name="Add New"
            style={styles.addNewButton}
            onPressed={onAddNewTransactionHandler}
          />
        </View>
      </View>
      {transaction.length > 0 && (
        <Transactions
          data={transaction}
          onDeletePressed={ondeleteTransactionHander}
        />
      )}
    </LinearGredientWrapper>
  );
};
export default AddExpenseItemScreen;
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
