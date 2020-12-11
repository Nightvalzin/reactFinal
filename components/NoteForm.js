import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const NoteForm = ({ inputValue, onChangeText, onNoteAdd }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerInner}>
        <TextInput
          style={styles.textInput}
          placeholder={"New note"}
          placeholderTextColor={"mediumpurple"}
          onChangeText={onChangeText}
          value={inputValue}
        />
        <TouchableOpacity style={styles.btn} onPress={onNoteAdd}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteForm;

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    width: "100%",
    height: 90,
    bottom: 0,
  },
  footerInner: {
    position: "relative",
    width: "100%",
    height: 92,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lavender",
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    marginRight: 10,
    borderColor: "mediumpurple",
    backgroundColor: "darkslateblue",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
  },
  textInput: {
    zIndex: 0,
    flex: 1,
    padding: 20,
    fontSize: 16,
    marginRight: 10,
    color: "black",
  },
});
