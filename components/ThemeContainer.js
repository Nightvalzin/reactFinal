import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import ThemeContext from "../contexts/ThemeContext";

const ThemeContainer = (props) => {
  const { theme } = useContext(ThemeContext);
  const { children } = props;
  return <View style={styles.container(theme)}>{children}</View>;
};

export default ThemeContainer;

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme === "dark" ? "darkslateblue" : "white",
    justifyContent: "center",
    paddingHorizontal: 20,
  }),
});