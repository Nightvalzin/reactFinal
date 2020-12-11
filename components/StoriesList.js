import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "firebase";

const uploadStory = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [timeline, setTimeline] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState();

  const getUserData = (uid) => {
    const docRef = firebase.firestore().collection("Users").doc(uid);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        setUserInfo(userData);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      } else {
        setLoading(false);
        console.log("DOcument not exist!");
      }
    });

  };

  const getStoryData = (uid) => {
    const storyRef = firebase.firestore().collection("Users").doc(userInfo.uid).collection('Stories');

    
  }

  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getUserData(user.uid);
        } else {
          setUserInfo(null);
          setLoading(false);
          navigation.navigate("Login");
        }
      });
    }); 

    return isFocused;
  }, [userInfo, loading, navigation, title]);



  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Welcome, {userInfo.name}!</Text>
      <ScrollView style={styles.scrollView}>
        {notes.map((note, i) => (
          <TouchableOpacity
            key={i}
            style={styles.note}
            onPress={() => {
              navigation.navigate("Note", {
                noteIndex: i,
              });
            }}
          >
            <Text style={styles.noteText}>
              {note.split("").length > 40
                ? note.substring(0, 40) + "..."
                : note}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default StoriesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "royalblue",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  keyboard:{
    position: "absolute",
    width: "100%",
  },
  textContainer: {
    position: "relative",
    width: "100%",
  },
  heading: {
    color: "whitesmoke",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    paddingBottom: 5,
  },
  labelText: {
    color: "whitesmoke",
    fontSize: 15,
    paddingBottom: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 40,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "mediumpurple",
    borderRadius: 40,
    marginBottom: 10,
    padding: 20,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
});
