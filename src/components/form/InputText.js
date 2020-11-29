import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ERROR_COLOR, WHITE} from '../../styles/colors';

const InputText = (props) => {
	const hasErrors = () => Object.keys(props.errors).length > 0 && props.errors.hasOwnProperty(props.name);
  const addBorderError = () => hasErrors() && styles.errorBorder;
  
  return (
    <View style={styles.inputContainer}>
      <TextInput
				{...props}
				style={[styles.input, addBorderError()]}
        placeholderTextColor={WHITE}
        onChangeText={props.handleChange(props.name)}
        onBlur={props.handleBlur(props.name)}
				value={props.values[props.name]}
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
    fontFamily: 'Roboto'
  },
  errorBorder: {
    borderColor: ERROR_COLOR,
  },
  errorMessage: {
		color: ERROR_COLOR,
		marginLeft: '4%'
  },
});

export default InputText;
