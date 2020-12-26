import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Formik } from "formik";
import authStyles from "../styles/authStyles";
import { RegisterValidator } from "../helpers/validators";
import Logo from "../components/Logo";
import InputText from "../components/form/InputText";
import SubmitButton from "../components/form/SubmitButton";
import { StackScreenProps } from "@react-navigation/stack";

const RegisterScreen = ({ navigation }: StackScreenProps<any>) => {
  const navigateToLogin = (): void => navigation.goBack();
  return (
    <ScrollView
      contentContainerStyle={authStyles.container}
      keyboardShouldPersistTaps="handled">
      <Logo />
      <Text style={authStyles.subtitle}>- Sign up -</Text>
      <Formik
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={RegisterValidator}
        initialValues={{
          username: "",
          email: "",
          password: "",
          retypePassword: ""
        }}>
        {(props) => (
          <View style={authStyles.formWrapper}>
            <InputText {...props} name="username" placeholder="Username" />
            <InputText {...props} name="email" placeholder="Email" />
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
            <View style={authStyles.ctaWrapper}>
              <SubmitButton
                onPress={props.handleSubmit}
                disabled={!props.isValid || props.isSubmitting}>
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
