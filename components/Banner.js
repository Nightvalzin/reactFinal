import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Image
} from "react-native";

const Banner = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  
  return (
    <View style={{height:100, width:'100%'}}>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim // Bind opacity to animated value
          }
        ]}
      >
        <TouchableOpacity>
          <Text style={styles.textTitle}
          onPress={() => {navigation.navigate('Home')}}
          >Vigames</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Cart')}}>
          <Image
          style={styles.headImage}
          source={require('../assets/images/carticon.png')}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default Banner;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "whitesmoke",
      alignItems: "center",
    },
    text: {
      fontSize: 15,
    },
    header: {
      height: 40,
      width: "100%",
      backgroundColor: "red",
      flex: 1,
      flexDirection:'row',
    },
    textTitle: {
      color: "black",
      fontSize: 32,
      fontWeight: "700",
      textAlign: "center",
      marginTop: 35,
      marginLeft: 120,
      marginRight: 90
    },
    headImage: {
      width: 35,
      height: 35,
      marginTop: 35,
      marginRight: 10,
    },
});