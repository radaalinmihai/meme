import { StyleSheet } from "react-native";
import { WHITE } from "./colors";

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
    height: "100%",
    justifyContent: "center",
  },
  formWrapper: {
    marginTop: "20%",
  },
  text: {
    color: WHITE,
  },
  subtext: {
    color: WHITE,
    alignSelf: "center",
    marginTop: 19,
  },
  ctaWrapper: {
    flexDirection: "column",
    marginTop: 46,
  },
  subtitle: {
    color: "white",
    fontSize: 23,
    alignSelf: "center",
  },
});

export default authStyles;
