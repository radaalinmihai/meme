import {Formik} from 'formik';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import InputText from '../components/form/InputText';
import SubmitButton from '../components/form/SubmitButton';
import Logo from '../components/Logo';
import {LoginValidator} from '../helpers/validators';
import authStyles from '../styles/authStyles';

const LoginScreen = ({navigation}) => {
  const redirectToRegister = () => {
    navigation.push('Register');
  }
  return (
    <ScrollView
      contentContainerStyle={authStyles.container}
      keyboardShouldPersistTaps="handled">
      <Logo />
      <Formik
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={LoginValidator}
        initialValues={{
          username: '',
          password: '',
        }}>
        {(props) => (
          <View style={authStyles.formWrapper}>
            <InputText {...props} name="username" placeholder="Username" />
            <InputText {...props} name="password" placeholder="Password" secureTextEntry />
            <SubmitButton onPress={props.handleSubmit} disabled={!props.isValid || props.isSubmitting}>Login</SubmitButton>
            <Text onPress={redirectToRegister} style={authStyles.subtext}>Don't have an account? Sign up here</Text>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LoginScreen;
