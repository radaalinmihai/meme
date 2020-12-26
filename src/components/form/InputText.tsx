import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ERROR_COLOR, WHITE } from "../../styles/colors";
import { ITextInput } from "../../helpers/interfaces";

const InputText = (props: ITextInput): JSX.Element => {
  const hasErrors = (): boolean => Object.keys(props.errors).length > 0 && props.errors.hasOwnProperty(props.name);
  const addBorderError = () => hasErrors() && styles.errorBorder;
  const value = props.values[props.name];

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, addBorderError()]}
        placeholderTextColor='white'
        placeholder={props.placeholder}
        onChangeText={props.handleChange(props.name)}
        onBlur={props.handleBlur(props.name)}
        value={value}
        secureTextEntry={value.length > 0 ? props.secureTextEntry : false}
      />
      {hasErrors() && <Text style={styles.errorMessage}>{props.errors[props.name]}</Text>}
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
