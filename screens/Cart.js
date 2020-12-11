import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Button} from "react-native";
import firebase from "firebase";
import Banner from "../components/Banner";

const Cart = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();

  
  const getUserData = (uid) => {
    const docRef = firebase.firestore().collection("Users").doc(uid);

  };

  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getUserData(user.uid);

          firebase.firestore().collection("Users").doc(user.uid).collection('Cart').get()
          .then(response => {
          const allItems = [];
          response.docs.forEach(document => {
            const selectItem = {
              id: document.id,
              ...document.data(),
            };
            allItems.push(selectItem);
          });
          setItems(allItems);
          })

        } else {
          setUserInfo(null);
          setLoading(false);
          navigation.navigate("Home");
        }

        
      });

    });

    return isFocused;

  }, [userInfo, loading, navigation, items]);  
  
  return (
    <View style={styles.container}>
        
        <ScrollView style={styles.scrolling}>
          <Banner navigation={navigation}/>
          {items.map(item => (
          <View style={styles.entry}>
            <Text style={styles.titleText}>Game Title: {item.title}</Text>
            <Text style={styles.gameText}>Console: {item.console}</Text>
            <Text style={styles.gameText}>Price: ${item.price}</Text>
          </View>
          ))}
          <TouchableOpacity style={styles.goCheckout}>
            <Button 
              onPress={() => navigation.navigate("Checkout")} 
              color="red" title="Checkout">
            <Text style={styles.buttonText}>Checkout</Text></Button>
          </TouchableOpacity>
          </ScrollView>
    </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
  },
  scrolling: {
      width: "100%"
  },
  entry: {
    marginVertical: 20,
    borderWidth: 2,
    backgroundColor: "lightgray",
    borderColor: "orange",
    borderRadius: 10,
    borderWidth: 2,
    width: "90%",
    marginLeft: 25,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 20,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    marginHorizontal: 15,
    paddingVertical: 10,
    color: "red",
    fontWeight: "700",
  },
  gameText: {
    fontSize: 18,
    marginHorizontal: 15,
    paddingVertical: 10,
    color: "black",
    fontWeight: "700",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
  },
  goCheckout: {
    width: 150,
    height: 200,
    marginLeft: 120,
    marginTop: 15,
    borderRadius: 10,
  }
})