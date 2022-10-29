import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

const CModal = ({ visible, data, onClose }) => {
  console.log(data, visible);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        // onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalheadingContainer}>
              <Text style={styles.modalheadingText}>Update Expense/Income</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default CModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    marginTop: "40%",
    marginHorizontal: 2,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 5,
    width: "100%",
  },
  modalheadingContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: Colors.primary850,
  },
  modalheadingText: {
    fontFamily: "ubuntu-bold",
    color: Colors.light500,
    fontSize: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
