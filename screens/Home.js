import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Animated, Image } from "react-native";
import Banner from "../components/Banner";

export default function Home({ navigation }) {
  const fadeAnim1 = useRef(new Animated.Value(0)).current
  const fadeAnim2 = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(
      fadeAnim1,
      {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }
    ).start();
    Animated.timing(
      fadeAnim2,
      {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim1, fadeAnim2])
  
  return (
    <View style={styles.container}>
      <Banner navigation={navigation}/>
      
      <Animated.View
        style={[
          styles.heroBody,
          {
            opacity: fadeAnim1 // Bind opacity to animated value
          }
        ]}
      >
         <Image
          style={styles.heroImage}
          source={require('../assets/images/gamestop.jpg')}
          />
      </Animated.View>

      <Animated.View
        style={[
          styles.body,
          {
            opacity: fadeAnim2 // Bind opacity to animated value
          }
        ]}
      >
        <Text style={[styles.text, styles.textBody]}>Vigames will let you search for your favourite games.</Text>
        <Text style={[styles.text, styles.textBody]}>Choose from games of many different genres!</Text>
        <Text style={[styles.text, styles.textBody]}>Feel free to search our collection!</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.body,
          {
            opacity: fadeAnim2, // Bind opacity to animated value
            flex: 1,
            width: "100%"
          }
        ]}
      >
        <Text style={[styles.text, styles.textBody], {marginBottom:50, fontSize: 18, textAlign:"center"}}>
          Have a look at the games we have to offer.</Text>
        <Button 
        onPress={() => navigation.navigate('GamesNav', { screen: 'RPGS' })}
        style={styles.button, 
          {
            marginTop:75,
          }} color="red" title="View Games">
            <Text style={styles.buttonText}>View Games</Text></Button>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "justify"
  },
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "red",
    flex: 1,
    flexDirection:'row',
  },
  textTitle: {
    color: "black",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 30,
    marginLeft: 150,
    marginRight: 150,
  },
  body: {
    backgroundColor: "lightgray",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderColor: "black",
    borderRadius: 1,
    borderWidth: 3,
  },
  textBody: {
    color: "red",
    fontSize: 20,
    paddingBottom: 5,
    textAlign: "center"
  },
  heroBody: {
    width: "100%"
  },
  heroImage: {
    height: 175,
    width: "100%"
  },
  button: {
    width: 50,
    height: 200,
    marginTop: 100,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
  }
});
