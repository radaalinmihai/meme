import { Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import InputText from "../components/form/InputText";
import SubmitButton from "../components/form/SubmitButton";
import Logo from "../components/Logo";
import { LoginValidator } from "../helpers/validators";
import useAuth from "../hooks/useAuth";
import authStyles from "../styles/authStyles";
import { StackScreenProps } from "@react-navigation/stack";

interface ILogin {
  username: string;
  password: string;
}

const LoginScreen = ({ navigation }: StackScreenProps<any>): JSX.Element => {
  const { state, login } = useAuth();

  console.log(state);

  const submitLogin = (values: ILogin, actions: FormikHelpers<ILogin>) => {
    login(values);
    actions.setSubmitting(false);
  };

  const redirectToRegister = () => {
    navigation.push("Register");
  };

  return (
    <ScrollView
      contentContainerStyle={authStyles.container}
      keyboardShouldPersistTaps="handled">
      <Logo />
      <Formik
        onSubmit={submitLogin}
        validationSchema={LoginValidator}
        initialValues={{
          username: "",
          password: ""
        }}>
        {({ handleSubmit, isValid, isSubmitting, errors, handleChange, handleBlur, values }) => (
          <View style={authStyles.formWrapper}>
            <InputText
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              name="username"
              placeholder="Username"
              placeholderColor="white"
            />
            <InputText
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <SubmitButton
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}>
              Login
            </SubmitButton>
            <Text onPress={redirectToRegister} style={authStyles.subtext}>
              Don't have an account? Sign up here
            </Text>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LoginScreen;
