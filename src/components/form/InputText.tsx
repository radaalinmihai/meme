import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ERROR_COLOR, WHITE } from "../../styles/colors";
import { ITextInput } from "../../helpers/interfaces";
import { ErrorMessage } from "formik";

const InputText = (props: ITextInput): JSX.Element => {
  const {touched, error} = props.getFieldMeta(props.name);
  const hasErrors = (): boolean => touched && error !== undefined;
  const addBorderError = () => hasErrors() && styles.errorBorder;
  const value = props.values[props.name];

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, addBorderError()]}
        placeholderTextColor={hasErrors() ? "#ff4f4f" : "white"}
        placeholder={props.placeholder}
        onChangeText={props.handleChange(props.name)}
        onBlur={props.handleBlur(props.name)}
        value={value}
        secureTextEntry={value.length > 0 ? props.secureTextEntry : false}
      />
      <ErrorMessage name={props.name}>{(message) => <Text style={styles.errorMessage}>{message}</Text>}</ErrorMessage>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    marginBottom: 19
  },
  input: {
    borderColor: WHITE,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 15,
    color: WHITE,
    fontFamily: "Roboto"
  },
  errorBorder: {
    borderColor: ERROR_COLOR
  },
  errorMessage: {
    color: ERROR_COLOR,
    marginLeft: "4%"
  }
});

export default InputText;
