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
import Banner from "../components/Banner";

const Signup = ({ navigation }) => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onChangeTextEmail = (email) => {
    setSignupForm({
      ...signupForm,
      email,
    });
  };
  const onChangeTextPassword = (password) => {
    setSignupForm({
      ...signupForm,
      password,
    });
  };
  const onChangeTextName = (name) => {
    setSignupForm({
      ...signupForm,
      name,
    });
  };

  const createAccount = () => {
    return new Promise(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(signupForm.email, signupForm.password)
        .then((res) => {
          firebase
            .firestore()
            .collection("Users")
            .doc(res.user.uid)
            .set({
              uid: res.user.uid,
              email: res.user.email,
              name: signupForm.name,
            })
            .then(() => {
              console.log("User successfully created!");
              navigation.navigate( {
                screen: "uploadStory",
                params: { email: res.user.email },
              });
            })
            .catch((err) => {
              console.log(err);
              alert("Create account failed, Error:" + err.message);
            });
        })
        .catch((err) => alert(err.message));
    });
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={{position:"absolute",top:0, left:0, width: 411}}>
        <Banner navigation={navigation} style={styles.myheader}/>
      </View>
      <KeyboardAvoidingView style={styles.keyboard} behavior="position" enabled>
      <TextInput
        ref={emailRef}
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={onChangeTextEmail}
        returnKeyType="next"
        onSubmitEditing={()=> {
          console.log("Clicked");
          passwordRef.current.focus();
        }}
      />
      <TextInput
        ref={passwordRef}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={onChangeTextPassword}
        returnKeyType="next"
        onSubmitEditing={()=> {
          console.log("Clicked");
          nameRef.current.focus();
        }}
      />
      <TextInput
        ref={nameRef}
        style={styles.input}
        placeholder="Name"
        onChangeText={onChangeTextName}
        returnKeyType="done"
        onSubmitEditing={()=>{navigation.navigate("Login");}}
      />
      <TouchableOpacity style={styles.button} onPress={createAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Go to login</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkslateblue",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  keyboard:{
    position: "absolute",
    width:"100%",

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
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
});
