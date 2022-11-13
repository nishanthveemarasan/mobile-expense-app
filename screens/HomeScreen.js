import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "../components/DebtManagerScreen/NavigatorItem/LogoutButton";
import LinearGredientWrapper from "../components/wrapper/LinearGredientWrapper";
import { Colors } from "../constants/colors";
import { logout } from "../store/reducer/auth-reducer";

const HomeScreen = ({ navigation }) => {
  const mapStateToProps = (state) => {
    return {
      userName: state.authStore.userName,
      token: state.authStore.token,
    };
  };
  const state = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  let title = `Welcome ${state.userName}`;
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.primaryNormal,
      },
      title: title,
      headerRight: () => (
        <LogoutButton icon="ios-log-out" onAction={onLogoutHandler} />
      ),
    });
  }, [state.userName]);

  const onLogoutHandler = () => {
    dispatch(logout(state.token, navigation));
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View style={styles.rootContainer}>
        <View style={styles.rowContainer}>
          <Pressable
            style={[styles.boxContainer, { backgroundColor: "#050242" }]}
            android_ripple={{ color: "white" }}
            onPress={() => navigation.navigate("ExpenseMangerScreen")}
          >
            <Text style={styles.text}>Expense</Text>
          </Pressable>
          <Pressable
            style={styles.boxContainer}
            android_ripple={{ color: "white" }}
            onPress={() => navigation.navigate("DebtManagerScreen")}
          >
            <Text style={styles.text}>Debt</Text>
          </Pressable>
        </View>
        <View style={styles.rowContainer}>
          <Pressable
            style={styles.boxContainer}
            android_ripple={{ color: "white" }}
            onPress={() => navigation.navigate("SavingMangerScreen")}
          >
            <Text style={styles.text}>Savings</Text>
          </Pressable>
          <Pressable
            style={styles.boxContainer}
            android_ripple={{ color: "white" }}
            onPress={() => navigation.navigate("GeneralSettingScreen")}
          >
            <Text style={styles.text}>Settings</Text>
          </Pressable>
        </View>
      </View>
    </LinearGredientWrapper>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
  },
  boxContainer: {
    borderWidth: 1,
    height: 120,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 6,
    elevation: 4,
    backgroundColor: "#050242",
  },
  text: {
    fontFamily: "ubuntu-bold",
    color: "white",
    fontSize: 16,
  },
});
