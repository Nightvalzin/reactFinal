import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "firebase";
import Banner from "../components/Banner";

const Login = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    email: "john.vigneau@email.com",
    password: "arctic",
  });

  const onChangeTextEmail = (email) => {
    setLoginForm({
      ...loginForm,
      email,
    });
  };
  const onChangeTextPassword = (password) => {
    setLoginForm({
      ...loginForm,
      password,
    });
  };

  const loginHandler = () => {
    return new Promise(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(loginForm.email, loginForm.password)
        .then((res) => {
          navigation.navigate("Account");
        })
        .catch((err) => alert(err.message));
    });
  };

  const rpgHandler = () => {
    return new Promise(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(loginForm.email, loginForm.password)
        .then((res) => {
          navigation.navigate('GamesNav', { screen: 'RPGS' });
        })
        .catch((err) => alert(err.message));
    });
  };

  return (
    <View style={styles.container}>
      <Banner navigation={navigation} style={styles.myheader}/>
      <View style={{marginVertical: 15}}>
        <Text style={{textAlign: "center", color: "white", fontSize: 24, fontWeight: "bold"}}>Login</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={loginForm.email}
          onChangeText={onChangeTextEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={loginForm.password}
          secureTextEntry
          onChangeText={onChangeTextPassword}
        />
        <TouchableOpacity style={styles.button} onPress={loginHandler}>
          <Text style={styles.buttonText}>Login to Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={rpgHandler}>
          <Text style={styles.buttonText}>View Games</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%"
  },
  input: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 40,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
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
