import * as Yup from "yup";

import { IAuthCred, IRegister } from "./interfaces";

export const LoginValidator = Yup.object().shape<IAuthCred>({
	username: Yup.string().required("Username is required"),
	password: Yup.string().required("Password is required"),
});

export const RegisterValidator = Yup.object().shape<IRegister>({
	username: Yup.string().required("Username is required"),
	email: Yup.string().email("Enter a valid email").required("Email is required"),
	password: Yup.string().required("A password is required"),
	c_password: Yup.string().required("Passwords must match"),
});
