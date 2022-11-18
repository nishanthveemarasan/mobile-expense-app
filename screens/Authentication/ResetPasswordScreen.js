import { useEffect } from "react";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AuthWrapper from "../../components/Authentication/AuthWrapper";
import KeyboardAvoidingWrapper from "../../components/wrapper/KeyboardAvoidingWrapper";
import { Colors } from "../../constants/colors";
import { showOutput } from "../../helper/error";
import { email, length, match, required } from "../../helper/validator";
import {
  requestVarificationCode,
  resetPassword,
} from "../../store/reducer/auth-reducer";
import { authStoreAction } from "../../store/store";
import EButton from "../../UI/EButton";
import ECButton from "../../UI/ECButton";
import Input from "../../UI/Input";
import Label from "../../UI/Label";

const ResetPasswordScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    password: {
      value: "",
      valid: false,
      touched: false,
      validator: [required, length({ min: 6 })],
      error: "Password should have atleast 6 charactors",
    },
    password_confirmation: {
      value: "",
      valid: false,
      touched: false,
      validator: [match],
      error: "Password does not match!!",
    },
  });
  const mapStateToProps = (state) => {
    return {
      resetPasswordLoaded: state.authStore.resetPasswordLoaded,
      resetEmail: state.authStore.resetEmail,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.resetEmail) {
      let message =
        "Please request for verification code again to start the process again!!";
      showOutput(message, "Action Expired!");
      navigation.navigate("ForgetPasswordScreen");
    }
  }, [state.resetEmail]);

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
    setFormData((prevState) => {
      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          value,
          valid,
        },
      };
    });
  };

  const onResetPasswordHandler = () => {
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
      data.email = state.resetEmail;
      dispatch(resetPassword(data, navigation));
    }
  };

  return (
    <AuthWrapper>
      <KeyboardAvoidingWrapper style={styles.rootContainer}>
        <View style={styles.formContainer}>
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
              name="Reset Password"
              color={Colors.success400}
              onPressed={onResetPasswordHandler}
              showIndicator={state.resetPasswordLoaded}
            />
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </AuthWrapper>
  );
};

export default ResetPasswordScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginVertical: "10%",
    marginHorizontal: 20,
  },
  formContainer: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary900,
  },
  codeFormContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.danger1000,
  },
  formItemContainer: {
    marginBottom: "7%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
