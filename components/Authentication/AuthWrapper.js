import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet } from "react-native";

const AuthWrapper = ({children}) => {
  return (
    <LinearGradient
      style={styles.rootContainer}
      colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}
    >
      <ImageBackground
        source={require("../../assets/images/background-login.png")}
        resizeMode="cover"
        style={styles.backImageContainer}
        imageStyle={{ opacity: 0.15 }}
      >
        {children}
      </ImageBackground>
    </LinearGradient>
  );
};
export default AuthWrapper;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  backImageContainer: {
    flex: 1,
  },
});
