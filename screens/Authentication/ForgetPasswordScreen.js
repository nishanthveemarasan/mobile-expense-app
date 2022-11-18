import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AuthWrapper from "../../components/Authentication/AuthWrapper";
import KeyboardAvoidingWrapper from "../../components/wrapper/KeyboardAvoidingWrapper";
import { Colors } from "../../constants/colors";
import { email, required } from "../../helper/validator";
import {
  requestVarificationCode,
  verifyVarificationCode,
} from "../../store/reducer/auth-reducer";
import { authStoreAction } from "../../store/store";
import EButton from "../../UI/EButton";
import ECButton from "../../UI/ECButton";
import Input from "../../UI/Input";
import Label from "../../UI/Label";

const ForgetPasswordScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: {
      value: "",
      valid: false,
      error: "Please enter a valid Email Address!!",
      validator: [email],
    },
  });
  const [codeFormData, serCodeFormData] = useState({
    code: {
      value: "",
      valid: false,
      error: "Please enter the varifivation code",
      validator: [required],
    },
  });
  const mapStateToProps = (state) => {
    return {
      showCodeForm: state.authStore.showCodeForm,
      requestCodeLoaded: state.authStore.requestCodeLoaded,
      verificationCodeLoaded: state.authStore.verificationCodeLoaded,
    };
  };

  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();

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
          valid,
        },
      };
    });
  };

  const onChangeCodeFormData = (type, value) => {
    let valid = true;
    if (codeFormData[type].validator) {
      for (let validator of codeFormData[type].validator) {
        valid = valid && validator(value);
      }
    }
    serCodeFormData((prevState) => {
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

  const onShowCodeFormHandler = () => {
    dispatch(authStoreAction.showCodeForm());
  };
  const onRequestCodeHandler = () => {
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
      dispatch(requestVarificationCode(data));
    }
  };

  const onMoveResetPasswordHandler = () => {
    let isFormValid = true;
    let data = {};
    for (let key in codeFormData) {
      isFormValid = isFormValid && codeFormData[key].valid;
      if (!codeFormData[key].valid) {
        Alert.alert("Warning!", codeFormData[key].error);
        return false;
      }
      data[key] = codeFormData[key].value;
    }
    if (isFormValid) {
      dispatch(verifyVarificationCode(data, navigation));
    }
  };

  return (
    <AuthWrapper>
      <KeyboardAvoidingWrapper style={styles.rootContainer}>
        <View style={styles.formContainer}>
          <View style={styles.formItemContainer}>
            <View style={{ marginBottom: 17 }}>
              <Label
                name="Please Enter your Email address to Reset your Password?"
                style={{ color: "white" }}
              />
            </View>
            <Input
              type="email-address"
              placeHolder="********@***.***"
              onChange={onChangeFormData}
              inputType="email"
              value={formData.email.value}
              editable={true}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.buttonContainer}>
            <ECButton
              name="Submit"
              style={{
                backgroundColor: "green",
                marginRight: 10,
                paddingHorizontal: 15,
                borderRadius: 4,
              }}
              textStyle={{ fontSize: 12 }}
              onPressed={onRequestCodeHandler}
              showIndicator={state.requestCodeLoaded}
            />
            <ECButton
              name="Received Code Already"
              style={{
                backgroundColor: "blue",
                paddingHorizontal: 15,
                borderRadius: 4,
              }}
              textStyle={{ fontSize: 12 }}
              onPressed={onShowCodeFormHandler}
            />
          </View>
        </View>
        {state.showCodeForm && (
          <View style={styles.codeFormContainer}>
            <View style={styles.formItemContainer}>
              <View style={{ marginBottom: 17 }}>
                <Label
                  name="Please Enter the Verfication code received via Email?"
                  style={{ color: "white" }}
                />
              </View>
              <Input
                type="number-pad"
                placeHolder="******"
                onChange={onChangeCodeFormData}
                inputType="code"
                value={codeFormData.code.value}
                editable={true}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.buttonContainer}>
              <ECButton
                name="Submit"
                style={{
                  backgroundColor: "blue",
                  marginRight: 10,
                  paddingHorizontal: 15,
                  borderRadius: 4,
                }}
                textStyle={{ fontSize: 12 }}
                onPressed={onMoveResetPasswordHandler}
                showIndicator={state.verificationCodeLoaded}
              />
            </View>
          </View>
        )}
      </KeyboardAvoidingWrapper>
    </AuthWrapper>
  );
};

export default ForgetPasswordScreen;
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
