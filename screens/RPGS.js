import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  Button,
  ScrollView
} from "react-native";
import firebase from "firebase";
import Banner from "../components/Banner";

const RPGS = ({ navigation, }) => {
    const [userInfo, setUserInfo] = useState();
    const [title, setTitle] = useState("");
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

    const addChainV = () => {
        firebase.firestore().collection("Users").doc(userInfo.uid).collection('Cart').add({
        title: "Astral Chain",
        console: "Switch",
        price: "79.99",
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
        <ScrollView>
            <Banner navigation={navigation}/>
            <Text style={styles.genre}>Here is a collection of the RPGs we have to offer!</Text>
            
            <View style={styles.gameEntry}>
                <TouchableHighlight navigation={navigation} onPress={() => {navigation.navigate("Code Vein");}}>
                <Image
                
                style={styles.gameImage}
                source={require('../assets/images/codevein.jpg')}
                />
                </TouchableHighlight>
                <TouchableOpacity onPress={() => navigation.navigate("Code Vein")}>
                    <Text style={styles.gameTitle}>CODE VEIN</Text>
                </TouchableOpacity>
                <Text style={styles.gameDetails}>PS4</Text>
                <Text style={styles.gameDetails}>$24.99</Text>
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
                <TouchableHighlight navigation={navigation} onPress={() => {navigation.navigate("Astral Chain");}}>
                <Image
                
                style={styles.gameImage}
                source={require('../assets/images/astralchain.jpg')}
                />
                </TouchableHighlight>
                <TouchableOpacity onPress={() => navigation.navigate("Astral Chain")}>
                    <Text style={styles.gameTitle}
                    
                    >Astral Chain</Text>
                </TouchableOpacity>
                <Text style={styles.gameDetails}>Switch</Text>
                <Text style={styles.gameDetails}>$79.99</Text>
                <Button 
                    onPress={addChainV}
                    style={styles.button, 
                    {
                        marginTop:5,
                    }} color="red" title="Add to Cart">
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </Button>
            </View>
        </ScrollView>
        

    </View>
    );
     
};

export default RPGS;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "whitesmoke",
      alignItems: "center",
    },
    genre: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 15,
        textAlign: "center"
    },
    gameEntry: {
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        padding: 15
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
    }
});
