import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Formik} from 'formik';
import authStyles from '../styles/authStyles';
import { RegisterValidator } from '../helpers/validators';
import Logo from '../components/Logo';
import InputText from '../components/form/InputText';
import SubmitButton from '../components/form/SubmitButton';

const RegisterScreen = ({navigation}) => {
    const navigateToLogin = () => navigation.goBack();
  return (
    <ScrollView
      contentContainerStyle={authStyles.container}
      keyboardShouldPersistTaps="handled">
      <Logo />
      <Formik
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={RegisterValidator}
        initialValues={{
          username: '',
          email: '',
          password: '',
          retypePassword: ''
        }}>
        {(props) => (
          <View style={authStyles.formWrapper}>
            <InputText {...props} name="username" placeholder="Username" />
            <InputText {...props} name='email' placeholder='Email' />
            <InputText
              {...props}
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <InputText
              {...props}
              name="retypePassword"
              placeholder="Retype your password"
              secureTextEntry
            />
            <SubmitButton
              onPress={props.handleSubmit}
              disabled={!props.isValid || props.isSubmitting}>
              Register
            </SubmitButton>
            <Text onPress={navigateToLogin} style={authStyles.subtext}>Have an account? Login here</Text>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default RegisterScreen;
