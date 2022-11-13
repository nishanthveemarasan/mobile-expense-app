import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// import EActivityIndicator from "../UI/EActivityIndicator";
import { getSavingData } from "../store/reducer/saving-reducer";
import { Text } from "react-native";
import SavingTopTabNavigator from "../navigators/SavingTopTabNavigator";
import AddSaving from "../components/savingMangerScreen/Transactions/AddSaving";
import EActivityIndicator from "../UI/EActivityIndicator";

const SavingManagerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const mapStateToProps = (state) => {
    return {
      loading: state.savingStore.loaded,
      token: state.authStore.token,
    };
  };
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddSaving />,
    });
    dispatch(getSavingData(state.token));
  }, []);
  return (
    <>{state.loading ? <SavingTopTabNavigator /> : <EActivityIndicator />}</>
  );
};
export default SavingManagerScreen;
