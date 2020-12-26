import React, { ChangeEvent } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ERROR_COLOR, WHITE } from "../../styles/colors";
import { FormikProps, FormikValues } from "formik";

interface ITextInput {
  name: string;
  placeholder: string;
  placeholderColor: string;
  secureTextEntry: boolean;
}

const InputText: React.FC<FormikProps<FormikValues> & ITextInput> = (props) => {
  const hasErrors = () => Object.keys(props.errors).length > 0 && props.errors.hasOwnProperty(props.name);
  const addBorderError = () => hasErrors() && styles.errorBorder;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        style={[styles.input, addBorderError()]}
        placeholderTextColor={props.placeholderColor}
        onChangeText={props.handleChange(props.name)}
        onBlur={props.handleBlur(props.name)}
        value={props.values[props.name]}
        secureTextEntry={props.secureTextEntry}
      />
      <Text style={styles.errorMessage}>{props.errors[props.name]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 5
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
