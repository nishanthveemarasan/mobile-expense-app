import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import KeyboardAvoidingWrapper from "../../components/wrapper/KeyboardAvoidingWrapper";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../components/wrapper/ScrollViewWrapper";
import { Colors } from "../../constants/colors";
import { DEBT_TYPES } from "../../constants/SelectItems";
import { Ionicons } from "@expo/vector-icons";
import {
  getDateWithYYYYMMDD,
  getFirstLetterUpperWord,
  remainingChars,
  restrictDecimalPlace,
} from "../../helper/helper";
import DatePicker from "../../UI/DatePicker";
import EButton from "../../UI/EButton";
import Eselector from "../../UI/Eselector";
import Input from "../../UI/Input";
import Label from "../../UI/Label";
import { required } from "../../helper/validator";
import {
  addNewDebt,
  deleteDebt,
  updateDebt,
} from "../../store/reducer/debt-reducer";
import { v4 as uuid } from "uuid";

const AddDebtScreen = ({ navigation, route }) => {
  let params = route.params;
  const type = params.type;
  const mapStateToProps = (state) => {
    return {
      users: state.debtStore.names,
      token: state.authStore.token,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const [showDeleteBUtton, setShowDeleteBUtton] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [disabledSelect, setDisabledSelect] = useState(true);
  const [formData, setFormData] = useState({
    name: {
      value: "",
      valid: true,
      validator: [required],
      error: "Please enter a valid Username to process your request!!",
    },
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
    type: {
      value: "lend",
      valid: true,
    },
    description: {
      value: "",
      valid: true,
    },
  });

  useEffect(() => {
    if (params?.data) {
      setDisabledSelect(false);
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
    } else {
      if (state.users.length > 0) {
        setFormData((prevState) => {
          return {
            ...prevState,
            name: {
              ...prevState.name,
              value: state.users[0].value,
            },
          };
        });
      } else {
        setShowAddUser(true);
      }
    }
  }, [params]);

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
      const data = {
        action: formData.type.value,
        formData: {
          uuid: uuid(),
          amount: restrictDecimalPlace(formData.amount.value),
          date: formData.date.value,
          type: formData.type.value,
          name:
            type == "save"
              ? getFirstLetterUpperWord(formData.name.value)
              : formData.name.value,
          description: formData.description.value,
        },
      };
      if (type == "save") {
        data.update = false;
        dispatch(addNewDebt(data, navigation, state.token));
      } else if (type == "edit") {
        data.formData.uuid = params.data.uuid;
        data.update = true;
        dispatch(updateDebt(data, navigation, state.token));
      }
    }
  };
  const onDeleteSavingHandler = () => {
    const data = {
      action: formData.type.value,
      formData: {
        uuid: params.data.uuid,
        amount: restrictDecimalPlace(formData.amount.value),
        date: formData.date.value,
        type: formData.type.value,
        name: getFirstLetterUpperWord(formData.name.value),
        description: formData.description.value,
      },
    };
    dispatch(deleteDebt(data, navigation, state.token));
  };
  const onOpenAddUSer = () => {
    if (!disabledSelect) {
      return false;
    }
    setShowAddUser(true);
    setFormData((prevState) => {
      return {
        ...prevState,
        name: {
          ...prevState.name,
          value: "",
          valid: false,
        },
      };
    });
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <ScrollViewWrapper>
        <KeyboardAvoidingWrapper style={styles.rootContainer}>
          {showAddUser ? (
            <View style={styles.amountContainer}>
              <Label name="Name" />
              <Input
                type="default"
                placeHolder="Enter user name here.."
                onChange={onChangeFormData}
                inputType="name"
                value={formData.name.value}
                editable={true}
              />
            </View>
          ) : (
            <View style={styles.amountContainer}>
              <View style={{ flexDirection: "row" }}>
                <Label name="Name" />
                {disabledSelect && (
                  <Text style={styles.warningText}>
                    (Add user if not in the list)
                  </Text>
                )}
              </View>
              <View style={styles.usersContainer}>
                <View style={styles.selectContainer}>
                  <Eselector
                    selectItems={state.users}
                    onSelectedItem={onChangeFormData}
                    value={formData.name.value}
                    type="name"
                    enabled={disabledSelect}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.pressable,
                      pressed && disabledSelect ? styles.pressed : null,
                    ]}
                    onPress={onOpenAddUSer}
                  >
                    <Ionicons
                      name="add-circle"
                      size={48}
                      color="white"
                      style={[
                        styles.dataIcon,
                        !disabledSelect ? { color: "#A9A9A9" } : null,
                      ]}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          )}
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
            <Label name="Type" />
            <Eselector
              selectItems={DEBT_TYPES}
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
export default AddDebtScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: "1%",
  },
  amountContainer: {
    marginBottom: "7%",
  },
  warningText: {
    marginTop: 3,
    fontFamily: "ubuntu-regular",
  },
  usersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectContainer: {
    width: "85%",
  },
  pressed: {
    opacity: 0.5,
  },
  iconContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dataIcon: {
    color: Colors.purple100,
  },
});
