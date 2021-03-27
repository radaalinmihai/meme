import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WHITE } from "../styles/colors";

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Meme</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoText: {
    fontSize: 52,
    color: WHITE,
    fontFamily: "Montserrat",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Logo;
