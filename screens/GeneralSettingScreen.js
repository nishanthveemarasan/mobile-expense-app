import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LinearGredientWrapper from "../components/wrapper/LinearGredientWrapper";
import { Colors } from "../constants/colors";
import { remainingChars } from "../helper/helper";
import { required } from "../helper/validator";
import {
  getSettingData,
  storeSettingData,
} from "../store/reducer/auth-reducer";
import EActivityIndicator from "../UI/EActivityIndicator";
import EButton from "../UI/EButton";
import Eselector from "../UI/Eselector";
import Input from "../UI/Input";
import Label from "../UI/Label";

const GeneralSettingScreen = () => {
  const mapStateToProps = (state) => {
    return {
      currencyList: state.authStore.currencyList,
      localeList: state.authStore.localeList,
      currency: state.authStore.currency,
      name: state.authStore.userName,
      loaded: state.authStore.loaded,
      dataLoaded: state.authStore.dataLoaded,
      token: state.authStore.token,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    currency: {
      value: "",
      valid: false,
      validator: [required],
      error: "Please select currency to process your request!!",
    },
    locale: {
      value: "",
      valid: false,
      validator: [required],
      error: "Please select locale to process your request!!",
    },
    name: {
      value: "",
      valid: true,
    },
  });
  useEffect(() => {
    // dispatch(getSettingData(state.token));
    setFormData((prevState) => {
      return {
        ...prevState,
        currency: {
          ...prevState.currency,
          value: state.currency.code,
          valid: true,
        },
        locale: {
          ...prevState.locale,
          value: state.currency.locale,
          valid: true,
        },
        name: {
          ...prevState.name,
          value: state.name,
          valid: true,
        },
      };
    });
  }, []);
  const onChangeFormData = (type, value) => {
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
          value,
          valid: true,
        },
      };
    });
  };

  const onLoginHandler = () => {
    let isFormValid = true;
    let data = {};
    for (let key in formData) {
      isFormValid = isFormValid && formData[key].valid;
      if (!formData[key].valid) {
        Alert.alert("Warning!", formData[key].error);
        return false;
      }
      data[key] = formData[key].value;
    }
    if (isFormValid) {
      const data = {
        currency_code: formData.currency.value,
        locale_code: formData.locale.value,
        name: formData.name.value,
      };
      dispatch(storeSettingData(data, state.token));
    }
  };
  if (state.loaded) {
    return <EActivityIndicator />;
  }
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View style={styles.formItemContiainer}>
        {/* <Label name="Name" /> */}
        <View style={{ flexDirection: "row" }}>
          <Label name="Description " />
          <Text style={styles.warningText}>
            ({remainingChars(formData.name.value, 12)} characters left)
          </Text>
        </View>
        <Input
          type="default"
          placeHolder="Enter your name here"
          onChange={onChangeFormData}
          inputType="name"
          value={formData.name.value}
          editable={true}
          autoCapitalize="words"
          maxLength={12}
        />
      </View>
      <View style={styles.formItemContiainer}>
        <Label name="Currency" />
        <Eselector
          selectItems={state.currencyList}
          onSelectedItem={onChangeFormData}
          value={formData.currency.value}
          type="currency"
          enabled={true}
        />
      </View>
      <View style={styles.formItemContiainer}>
        <Label name="Locale" />
        <Eselector
          selectItems={state.localeList}
          onSelectedItem={onChangeFormData}
          value={formData.locale.value}
          type="locale"
          enabled={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <EButton
          name="Save Settings"
          color={Colors.success400}
          onPressed={onLoginHandler}
          showIndicator={state.dataLoaded}
        />
      </View>
    </LinearGredientWrapper>
  );
};
export default GeneralSettingScreen;

const styles = StyleSheet.create({
  formItemContiainer: {
    marginBottom: 15,
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: "9%",
  },
  warningText: {
    marginTop: 3,
    fontFamily: "ubuntu-regular",
  },
});
