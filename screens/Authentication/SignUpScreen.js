import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AuthWrapper from "../../components/Authentication/AuthWrapper";
import KeyboardAvoidingWrapper from "../../components/wrapper/KeyboardAvoidingWrapper";
import { Colors } from "../../constants/colors";
import { email, length, match, required } from "../../helper/validator";
import EButton from "../../UI/EButton";
import FlatButton from "../../UI/FlatButton";
import Input from "../../UI/Input";
import Label from "../../UI/Label";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/reducer/auth-reducer";
import { toLower } from "../../helper/helper";
import LoadingOverlay from "../../UI/LoadingOverlay";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const mapStateToProps = (state) => {
    return {
      loaded: state.authStore.loaded,
    };
  };
  const state = useSelector(mapStateToProps);
  const diaptch = useDispatch();
  const [formData, setFormData] = useState({
    email: {
      value: "",
      valid: false,
      error: "Please enter a valid email!!",
      validator: [email],
    },
    password: {
      value: "",
      valid: false,
      touched: false,
      validator: [required, length({ min: 5 })],
      error: "Password should have atleast 5 charactors",
    },
    password_confirmation: {
      value: "",
      valid: false,
      touched: false,
      validator: [match],
      error: "Password does not match!!",
    },
  });

  const onChangeFormData = (type, value) => {
    let valid = true;
    if (formData[type].validator) {
      for (let validator of formData[type].validator) {
        let exValidate =
          type == "password_confirmation"
            ? validator(formData.password.value, value)
            : validator(value);
        valid = valid && exValidate;
      }
    }
    const newValue = type == "email" ? toLower(value) : value;
    setFormData((prevState) => {
      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          value: newValue,
          valid: valid,
        },
      };
    });
  };

  const onSwitchModeHandler = () => {
    navigation.replace("LoginScreen");
  };
  const onRegisterHandler = () => {
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
      diaptch(registerUser(data, navigation));
    }
  };
  if (state.loaded) {
    return <LoadingOverlay message="Signing you up in" />;
  }
  return (
    <AuthWrapper>
      <KeyboardAvoidingWrapper style={styles.rootContainer}>
        <View style={styles.formContainer}>
          <View style={styles.formItemContainer}>
            <Label name="Email Address" style={{ color: "white" }} />
            <Input
              type="email-address"
              placeHolder="email"
              onChange={onChangeFormData}
              inputType="email"
              value={formData.email.value}
              editable={true}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formItemContainer}>
            <Label name="Password" style={{ color: "white" }} />
            <Input
              type="default"
              placeHolder="*****"
              onChange={onChangeFormData}
              inputType="password"
              secure={true}
              value={formData.password.value}
              editable={true}
            />
          </View>
          <View style={styles.formItemContainer}>
            <Label name="Conform Password" style={{ color: "white" }} />
            <Input
              type="default"
              placeHolder="*****"
              onChange={onChangeFormData}
              inputType="password_confirmation"
              secure={true}
              value={formData.password_confirmation.value}
              editable={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <EButton
              name="Register"
              color={Colors.success400}
              onPressed={onRegisterHandler}
              //  showIndicator={state.loaded}
            />
            <FlatButton onPress={onSwitchModeHandler}>Login</FlatButton>
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </AuthWrapper>
  );
};
export default SignUpScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: "30%",
  },
  formContainer: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary900,
  },
  formItemContainer: {
    marginBottom: "7%",
  },
  buttonContainer: {
    marginTop: "9%",
  },
  backImageContainer: {
    flex: 1,
  },
});
