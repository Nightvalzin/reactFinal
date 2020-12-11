import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
  ScrollView
} from "react-native";
import firebase from "firebase";
import Banner from "../components/Banner";

const CodeVein = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState();
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [game, setGame] = useState("");
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState();

    const getUserData = (uid) => {
    const docRef = firebase.firestore().collection("Users").doc(uid);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        setUserInfo(userData);
        setTitle(userData.title);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      } else {
        setLoading(false);
        console.log("DOcument not exist!");
      }
    });
  };

    const addCodeV = () => {
        firebase.firestore().collection("Users").doc(userInfo.uid).collection('Cart').add({
        title: "Code Vein",
        console: "PS4",
        price: "24.99",
        id: userInfo.uid
        })

        navigation.navigate("Home");
    }

    const addReview = () => {
      if (name === "") return;
      if (review === "") return;
  
      firebase.firestore().collection("Users").doc(userInfo.uid).collection('Reviews').add({
        name: name,
        game: "Code Vein",
        review: review,
        id: userInfo.uid
      })
  
      navigation.navigate("Home");
    }

    useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getUserData(user.uid);
        }
      });
    }); 

    return isFocused;
  }, [userInfo, loading, navigation, title]);
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrolling}>
                <Banner navigation={navigation}/>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.backText}
                        onPress={() => {navigation.navigate('RPGS')}}
                        >Go Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.gameEntry}>
                    <Image
                    style={styles.gameImage}
                    source={require('../assets/images/codevein.jpg')}
                    />
                    <Text style={styles.gameTitle}>Code Vein</Text>
                    <Text style={styles.gameDetails}>Console: PS4</Text>
                    <Text style={styles.gameDetails}>Price: $24.99</Text>
                    <Text style={styles.description}>In the not too distant future, a mysterious disaster has brought collapse to the world as we know
                    it.  Towering skyscrapers, once symbols of prosperity, are now lifeless graves of humanity’s past pierced by the Thorns of 
                    Judgment. At the center of the destruction lies a hidden society of Revenants called Vein. This ?nal stronghold is where the 
                    remaining few ?ght to survive, blessed with Gifts of power in exchange for their memories and a thirst for blood. Give into the 
                    bloodlust fully and risk becoming one of the Lost, ?endish ghouls devoid of any remaining humanity. Wandering aimlessly in search 
                    of blood, the Lost will stop at nothing to satisfy their hunger. Team up and embark on a journey to the ends of hell to unlock your 
                    past and escape your living nightmare in CODE VEIN.</Text>
                    <Button 
                        onPress={addCodeV}
                        style={styles.button, 
                        {
                            marginTop:5,
                        }} color="red" title="Add to Cart">
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </Button>
                </View>
                <View style={styles.gameEntry}>

                <KeyboardAvoidingView style={styles.keyboard} behavior="position" keyboardVerticalOffset={-90} enabled>
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>Review Code Vein</Text>
                  <Text style={styles.labelText}>Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="My Name"
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                    }}
                    />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.labelText}>Enter Review:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Review Code Vein"
                    value={review}
                    onChangeText={(text) => {
                      setReview(text);
                    }}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={addReview}>
                  <Text style={styles.buttonText}>Submit Review</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>

                </View>
            </ScrollView>
            
        </View>
    );
};

export default CodeVein;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "whitesmoke",
      alignItems: "center",
    },
    scrolling: {
        width: "100%"
    },
    backText: {
        fontSize: 20,
        color: "royalblue",
        marginLeft: 10,
        marginVertical: 15,
        fontWeight: "bold",
    },
    gameEntry: {
        backgroundColor: "lightgray",
        marginBottom: 10,
        marginLeft: 25,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        padding: 15,
        width: "90%"
    },
    gameImage: {
        marginLeft: "auto",
        marginRight: "auto",
        height: 200,
        width: 200,
        resizeMode: "contain"
    },
    gameTitle: {
        textAlign: "center",
        fontSize: 18,
        color: "red",
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginBottom: 5
    },
    gameDetails: {
        textAlign: "center",
        fontSize: 18,
        color: "black",
        marginBottom: 5
    },
    description: {
        fontSize: 14,
        color: "black",
        textAlign: "left"
    },
    heading: {
      color: "black",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      textDecorationStyle: "solid",
      textDecorationLine: "underline",
      paddingBottom: 5,
    },
    labelText: {
      color: "red",
      fontSize: 18,
      paddingBottom: 10,
    },
    input: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 40,
      marginBottom: 10,
    },
    buttonText: {
      color: "white",
      backgroundColor: "red",
      width: 150,
      borderRadius: 10,
      textAlign: "center",
      fontSize: 20,
      padding: 10,
      marginLeft: 75,
      marginTop: 10,
    }
});