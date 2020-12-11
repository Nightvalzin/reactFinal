import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import firebase from "firebase";
import Banner from "../components/Banner";

const CodeVein = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Banner></Banner>
        </View>
    );
};

export default CodeVein;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "whitesmoke",
      alignItems: "center",
    }
});