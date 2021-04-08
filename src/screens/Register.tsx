import {StackScreenProps} from "@react-navigation/stack";
import {Formik} from "formik";
import React from "react";
import {ScrollView, Text, View} from "react-native";

import InputText from "../components/form/InputText";
import SubmitButton from "../components/form/SubmitButton";
import Logo from "../components/Logo";
import {RegisterValidator} from "../helpers/validators";
import useAuth from "../hooks/useAuth";
import authStyles from "../styles/authStyles";

const RegisterScreen = ({navigation}: StackScreenProps<any>) => {
  const navigateToLogin = (): void => navigation.goBack();
  const {register} = useAuth();
  return (
    <ScrollView contentContainerStyle={authStyles.container} keyboardShouldPersistTaps="handled">
      <Logo />
      <Text style={authStyles.subtitle}>- Sign up -</Text>
      <Formik
        enableReinitialize
        onSubmit={(values, {resetForm, setSubmitting}) => {
          register(values);
          setSubmitting(false);
        }}
        validationSchema={RegisterValidator}
        initialValues={{
          username: "",
          email: "",
          password: "",
          c_password: "",
        }}>
        {(props) => (
          <View style={authStyles.formWrapper}>
            <InputText {...props} name="username" placeholder="Username" />
            <InputText {...props} name="email" placeholder="Email" />
            <InputText {...props} name="password" placeholder="Password" secureTextEntry />
            <InputText {...props} name="c_password" placeholder="Retype password" secureTextEntry />
            <View style={authStyles.ctaWrapper}>
              <SubmitButton onPress={props.handleSubmit} disabled={props.isSubmitting}>
                Sign up
              </SubmitButton>
              <Text onPress={navigateToLogin} style={authStyles.subtext}>
                Have an account? Login here
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default RegisterScreen;
