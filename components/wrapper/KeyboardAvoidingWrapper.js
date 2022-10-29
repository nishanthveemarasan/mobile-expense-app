import { KeyboardAvoidingView } from "react-native";

const KeyboardAvoidingWrapper = ({ children, style }) => {
  return (
    <KeyboardAvoidingView behavior="position" style={style}>
      {children}
    </KeyboardAvoidingView>
  );
};
export default KeyboardAvoidingWrapper;
