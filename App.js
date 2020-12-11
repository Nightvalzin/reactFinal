import React from "react";

import { YellowBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import RPGS from "./screens/RPGS";
import Cart from "./screens/Cart";

import firebase from "firebase";
import "@firebase/firestore";
import CodeVein from "./screens/CodeVein";
import AstralChain from "./screens/AstralChain";
import Checkout from "./screens/Checkout";

const firebaseConfig = {
  apiKey: "AIzaSyAOckg5aY5jMioiW9ZkcW0Ku8WBdyqPLC8",
  authDomain: "voltindustriproject2.firebaseapp.com",
  databaseURL: "https://voltindustriproject2.firebaseio.com",
  projectId: "voltindustriproject2",
  storageBucket: "voltindustriproject2.appspot.com",
  messagingSenderId: "540803518942",
  appId: "1:540803518942:web:06ff3db4bc6ac1342b4d4f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

const Drawer = createDrawerNavigator();
const GamesStack = createStackNavigator();
const HeaderStack = createStackNavigator();

const GamesNav = () => {
  return (
    <GamesStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <GamesStack.Screen name="RPGS" component={RPGS} />
      <GamesStack.Screen name="Code Vein" component={CodeVein} />
      <GamesStack.Screen name="Astral Chain" component={AstralChain} />
    </GamesStack.Navigator>
  );
}

const HeaderNav = () => {
  return (
    <HeaderStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <HeaderStack.Screen name="Home" component={Home} />
      <HeaderStack.Screen name="Cart" component={Cart} />
      <HeaderStack.Screen name="Checkout" component={Checkout} />
    </HeaderStack.Navigator>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HeaderNav" component={HeaderNav} options={{ title: "Home" }} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="GamesNav" component={GamesNav} options={({ title: "Games" })}/>
    </Drawer.Navigator>
  );
};



export default function App() {
  
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    
  );
}

