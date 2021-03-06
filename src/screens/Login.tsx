import { StackScreenProps } from "@react-navigation/stack";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import InputText from "../components/form/InputText";
import SubmitButton from "../components/form/SubmitButton";
import Logo from "../components/Logo";
import { useAuth } from "../contexts/auth/AuthContext";
import { IAuthCred } from "../helpers/interfaces";
import { LoginValidator } from "../helpers/validators";
import authStyles from "../styles/authStyles";

const LoginScreen = ({ navigation }: StackScreenProps<any>): JSX.Element => {
	const { login } = useAuth();

	const submitLogin = async (values: IAuthCred, actions: FormikHelpers<IAuthCred>) => {
		login(values);
		actions.setSubmitting(false);
	};

	const redirectToRegister = () => {
		navigation.push("Register");
	};

	return (
		<ScrollView contentContainerStyle={authStyles.container} keyboardShouldPersistTaps="handled">
			<Logo />
			<Text style={authStyles.subtitle}>- Sign in -</Text>
			<Formik
				enableReinitialize
				onSubmit={submitLogin}
				validationSchema={LoginValidator}
				initialValues={{
					username: "",
					password: "",
				}}>
				{(props) => (
					<View style={authStyles.formWrapper}>
						<InputText {...props} name="username" placeholder="Username" />
						<InputText {...props} name="password" placeholder="Password" secureTextEntry />
						<View style={authStyles.ctaWrapper}>
							<SubmitButton onPress={props.handleSubmit} disabled={props.isSubmitting}>
								Sign in
							</SubmitButton>
							<Text onPress={redirectToRegister} style={authStyles.subtext}>
								Don&apos;t have an account? Sign up here
							</Text>
						</View>
					</View>
				)}
			</Formik>
		</ScrollView>
	);
};

export default LoginScreen;
