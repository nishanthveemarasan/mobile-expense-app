import { ScrollView } from "react-native";

const ScrollViewWrapper = ({ children }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {children}
    </ScrollView>
  );
};
export default ScrollViewWrapper;
