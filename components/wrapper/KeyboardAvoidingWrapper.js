import { KeyboardAvoidingView } from "react-native";

const KeyboardAvoidingWrapper = ({ children, style }) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={style}>
      {children}
    </KeyboardAvoidingView>
  );
};
export default KeyboardAvoidingWrapper;
