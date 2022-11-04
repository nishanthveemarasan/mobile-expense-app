import { useEffect, useState } from "react";
import { Alert, StyleSheet, Switch, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import { Colors } from "../../../constants/colors";
import {
  findIndex,
  getDateGroup,
  getDateWithYYYYMMDD,
  getTimeStamp,
  makeNumberPositive,
  remainingChars,
  restrictDecimalPlace,
  splitStr,
  UUID,
} from "../../../helper/helper";
import { required } from "../../../helper/validator";
import {
  addNewExpense,
  addRecurringItem,
  deleteRecurringPaymentItem,
  updateRecurringPaymentItem,
} from "../../../store/reducer/expense-reducer";
import DatePicker from "../../../UI/DatePicker";
import ECButton from "../../../UI/ECButton";
import Eswitch from "../../../UI/Eswitch";
import Input from "../../../UI/Input";
import InputWithIcon from "../../../UI/InputWithIcon";
import Label from "../../../UI/Label";
import { v4 as uuid } from "uuid";
import Eselector from "../../../UI/Eselector";
import { RECURRING_TYPE } from "../../../constants/SelectItems";
import EButton from "../../../UI/EButton";
import ECheckBox from "../../../UI/ECheckBox";
import ScrollViewWrapper from "../../../components/wrapper/ScrollViewWrapper";
import { expenseStoreAction } from "../../../store/store";

const AddRecurringPaymentScreen = ({ navigation, route }) => {
  const action = route.params?.action;
  const mapStateToProps = (state) => {
    return {
      selectedCategory: state.expenseStore.selectedCategory,
      formData: state.expenseStore.recurringPayment,
      isCheckPaymentNumber: state.expenseStore.checked_payment_number,
      recurringPayType: state.expenseStore.recurringPayType,
      selectedRecurringPayItem: state.expenseStore.selectedRecurringItem,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (state.selectedCategory) {
      dispatch(
        expenseStoreAction.updateRecurringFormData({
          type: "category",
          value: state.selectedCategory,
        })
      );
    }
    if (state.recurringPayType) {
      setIsEnabled(state.recurringPayType == "expense" ? false : true);
    }
  }, [state.selectedCategory, state.recurringPayType, action]);
  const onSwitchChangeHandler = () => {
    setIsEnabled((prevState) => !prevState);
    let type = !isEnabled ? "income" : "expense";
    dispatch(expenseStoreAction.updateRecurringPayType({ type }));
  };
  const onChangeFormData = (type, value) => {
    let formattedValue = value;
    if (type == "date") {
      formattedValue = getDateWithYYYYMMDD(value);
    }
    dispatch(
      expenseStoreAction.updateRecurringFormData({
        type,
        value: formattedValue,
      })
    );
  };

  const onCheckHandler = (value) => {
    dispatch(expenseStoreAction.updateRecurringPayCheckBox({ value }));
  };

  const onAddRecurringPaymentHandler = () => {
    let isFormValid = true;
    for (let key in state.formData) {
      isFormValid = isFormValid && state.formData[key].valid;
      if (!state.formData[key].valid) {
        Alert.alert("Warning!", state.formData[key].error);
        return false;
      }
    }

    if (isFormValid) {
      const data = {
        uuid: uuid(),
        type: state.recurringPayType,
        name: state.formData.name.value,
        amount: restrictDecimalPlace(state.formData.amount.value),
        pay_method: state.formData.pay_method.value,
        num_of_pay: state.isCheckPaymentNumber
          ? 0
          : makeNumberPositive(state.formData.num_of_pay.value),
        start_date: state.formData.date.value,
        last_pay_date: state.formData.date.value,
        category:
          state.recurringPayType == "expense"
            ? state.formData.category.value
            : "income",
        current_pay_num: 1,
        status: "active",
        susbscription_type: state.isCheckPaymentNumber
          ? "unlimited"
          : "limited",
      };
      dispatch(addRecurringItem(data, navigation));
    }
  };

  const onUpdateRecurringPaymentHandler = () => {
    let isFormValid = true;
    for (let key in state.formData) {
      isFormValid = isFormValid && state.formData[key].valid;
      if (!state.formData[key].valid) {
        Alert.alert("Warning!", state.formData[key].error);
        return false;
      }
      if (key == "num_of_pay" && state.formData[key].value != 0) {
        if (
          state.formData[key].value <=
          state.selectedRecurringPayItem.current_pay_num
        ) {
          isFormValid = false;
          let error =
            "You have already paid " +
            state.selectedRecurringPayItem.current_pay_num +
            ". So, your payment number should be greater than " +
            state.selectedRecurringPayItem.current_pay_num;
          Alert.alert("Warning!", error);
          return false;
        }
      }

      if (key == "date") {
        if (getTimeStamp(state.formData[key].value) < getTimeStamp()) {
          isFormValid = false;
          const date = getDateWithYYYYMMDD();
          let error = "Next Payment date should be greater or equal to " + date;
          Alert.alert("Warnings!", error);
          return false;
        }
      }
    }
    if (isFormValid) {
      const data = {
        uuid: state.selectedRecurringPayItem.uuid,
        type: state.selectedRecurringPayItem.type,
        name: state.formData.name.value,
        amount: state.formData.amount.value,
        pay_method: state.formData.pay_method.value,
        num_of_pay: state.isCheckPaymentNumber
          ? 0
          : makeNumberPositive(state.formData.num_of_pay.value),
        next_pay_date: state.formData.date.value,
        status: "active",
        susbscription_type: state.isCheckPaymentNumber
          ? "unlimited"
          : "limited",
      };
      dispatch(updateRecurringPaymentItem(data, navigation));
    }
  };
  const onDeleteRecurringPaymentHandler = () => {
    const data = {
      uuid: state.selectedRecurringPayItem.uuid,
      num_of_pay: state.selectedRecurringPayItem.current_pay_num,
      status: "completed",
    };
    dispatch(deleteRecurringPaymentItem(data, navigation));
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <ScrollViewWrapper>
        <View>
          <View style={styles.typeContainer}>
            <Eswitch
              value={isEnabled}
              onChange={onSwitchChangeHandler}
              array={["Income", "Expense"]}
              disabled={action == "edit" ? true : false}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formItemContiainer}>
              <View style={{ flexDirection: "row" }}>
                <Label name="Description " />
                <Text style={styles.warningText}>
                  ({remainingChars(state.formData.name.value, 30)} characters
                  left)
                </Text>
              </View>
              <Input
                type="default"
                placeHolder="Description"
                maxLength={30}
                inputType="name"
                onChange={onChangeFormData}
                value={state.formData.name.value}
                editable={true}
              />
            </View>
            <View style={styles.formItemContiainer}>
              <Label name="Amount" />
              <Input
                type="decimal-pad"
                placeHolder="0.00"
                onChange={onChangeFormData}
                inputType="amount"
                value={state.formData.amount.value.toString()}
                editable={true}
              />
            </View>
            <View style={styles.formItemContiainer}>
              <Label name="Frequently" />
              <Eselector
                selectItems={RECURRING_TYPE}
                onSelectedItem={onChangeFormData}
                value={state.formData.pay_method.value}
                type="pay_method"
                enabled={true}
              />
            </View>
            <View style={styles.formItemContiainer}>
              <Label name="Total Number of Payment" />
              <Input
                type="number-pad"
                placeHolder=""
                onChange={onChangeFormData}
                inputType="num_of_pay"
                value={state.formData.num_of_pay.value.toString()}
                editable={!state.isCheckPaymentNumber}
              />
              <ECheckBox
                value={state.isCheckPaymentNumber}
                onChange={onCheckHandler}
                label="chose if this transaction happens continuously!!"
                labelStyle={{ color: Colors.danger900 }}
              />
            </View>
            <View style={styles.formItemContiainer}>
              <Label
                name={
                  action == "edit"
                    ? "Next Payment to be payed on"
                    : "First Payment Start on"
                }
              />
              <DatePicker
                value={state.formData.date.value}
                onSetDate={onChangeFormData}
                type="date"
              />
            </View>
            <View style={styles.formItemContiainer}>
              <Label name="Category" />
              <InputWithIcon
                type="default"
                placeHolder="0.00"
                onChange={onChangeFormData}
                inputType="category"
                value={state.formData.category.value}
                editable={false}
                disabled={isEnabled}
                action="recurring"
              />
            </View>
            <View style={styles.buttonContainer}>
              {action == "edit" ? (
                <>
                  <EButton
                    name="Update Payment"
                    color={Colors.primaryNormal}
                    onPressed={onUpdateRecurringPaymentHandler}
                  />
                  <EButton
                    name="Stop Payment"
                    color={Colors.danger400}
                    onPressed={onDeleteRecurringPaymentHandler}
                  />
                </>
              ) : (
                <EButton
                  name="Save Payment"
                  color={Colors.primaryNormal}
                  onPressed={onAddRecurringPaymentHandler}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollViewWrapper>
    </LinearGredientWrapper>
  );
};
export default AddRecurringPaymentScreen;
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
    marginBottom: "7%",
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
  warningText: {
    marginTop: 3,
    fontFamily: "ubuntu-regular",
  },
});
