import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import {
  getDateModules,
  getDateWithYYYYMMDD,
  remainingChars,
  restrictDecimalPlace,
} from "../../helper/helper";
import {
  addNewSaving,
  deleteSaving,
  updateSaving,
} from "../../store/reducer/saving-reducer";
import Label from "../../UI/Label";
import Input from "../../UI/Input";
import EButton from "../../UI/EButton";
import DatePicker from "../../UI/DatePicker";
import { Colors } from "../../constants/colors";
import ScrollViewWrapper from "../../components/wrapper/ScrollViewWrapper";
import KeyboardAvoidingWrapper from "../../components/wrapper/KeyboardAvoidingWrapper";
import Eselector from "../../UI/Eselector";
import { ADD_SAVINGS } from "../../constants/SelectItems";
import { required } from "../../helper/validator";
const AddSavingScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const params = route.params;
  const type = params.type;
  // console.log(params.type);

  const [showDeleteBUtton, setShowDeleteBUtton] = useState(false);
  const [formData, setFormData] = useState({
    amount: {
      value: "",
      valid: false,
      error: "Please enter a valid amount for saving!!",
      validator: [required],
    },
    date: {
      value: getDateWithYYYYMMDD(),
      valid: true,
    },
    type: {
      value: "add",
      valid: true,
    },
    description: {
      value: "",
      valid: true,
    },
  });
  useEffect(() => {
    navigation.setOptions({
      title: params.type == "edit" ? "Edit Saving" : "Add Saving",
    });
    if (params?.data) {
      setShowDeleteBUtton(true);
      setFormData((transaction) => {
        let copyData = { ...transaction };
        for (let key in copyData) {
          let newValue =
            key == "amount"
              ? restrictDecimalPlace(params.data[key])
              : params.data[key];
          copyData[key] = {
            ...copyData[key],
            value: newValue,
            valid: true,
          };
        }
        return { ...copyData };
      });
    }
  }, [params.type]);

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
          value: formValue,
          valid: true,
        },
      };
    });
  };

  const onCreateSavingHandler = () => {
    let isFormValid = true;
    for (let key in formData) {
      isFormValid = isFormValid && formData[key].valid;
      if (!formData[key].valid) {
        Alert.alert("Warning!", formData[key].error);
        return false;
      }
    }

    if (isFormValid) {
      let amount =
        formData.type.value == "add"
          ? restrictDecimalPlace(formData.amount.value)
          : -restrictDecimalPlace(formData.amount.value);
      const dateModules = getDateModules(formData.date.value);
      const data = {
        date: formData.date.value,
        amount: amount,
        type: formData.type.value,
        description: formData.description.value,
        day: dateModules.day,
        month: dateModules.month,
        week: dateModules.week,
        year: dateModules.year,
      };
      if (type == "save") {
        dispatch(addNewSaving(data, navigation));
      } else if (type == "edit") {
        data.uuid = params.data.uuid;
        dispatch(updateSaving(data, navigation));
      }
    }
  };

  const onDeleteSavingHandler = () => {
    dispatch(deleteSaving(params.data.uuid, navigation));
  };

  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <ScrollViewWrapper>
        <KeyboardAvoidingWrapper style={styles.rootContainer}>
          <View style={styles.amountContainer}>
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
          <View style={styles.amountContainer}>
            <Label name="Date Performed" />
            <DatePicker
              value={formData.date.value}
              onSetDate={onChangeFormData}
              type="date"
            />
          </View>
          <View style={styles.amountContainer}>
            <Label name="Saving Method" />
            <Eselector
              selectItems={ADD_SAVINGS}
              onSelectedItem={onChangeFormData}
              value={formData.type.value}
              type="type"
              enabled={true}
            />
          </View>
          <View style={styles.amountContainer}>
            <View style={{ flexDirection: "row" }}>
              <Label name="Description " />
              <Text style={styles.warningText}>
                ({remainingChars(formData.description.value, 30)} characters
                left)
              </Text>
            </View>
            <Input
              type="default"
              placeHolder="Description -- optional"
              multiLine={false}
              lines={2}
              maxLength={30}
              inputType="description"
              onChange={onChangeFormData}
              value={formData.description.value}
              editable={true}
            />
          </View>
          <View style={styles.amountContainer}>
            <EButton
              name="Save"
              color={Colors.primaryNormal}
              onPressed={onCreateSavingHandler}
            />
            {showDeleteBUtton && (
              <EButton
                name="Delete"
                color={Colors.danger400}
                onPressed={onDeleteSavingHandler}
              />
            )}
          </View>
        </KeyboardAvoidingWrapper>
      </ScrollViewWrapper>
    </LinearGredientWrapper>
  );
};
export default AddSavingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: "7%",
  },
  amountContainer: {
    marginBottom: "7%",
  },
  warningText: {
    marginTop: 3,
    fontFamily: "ubuntu-regular",
  },
});
