import { FormikErrors, FormikHandlers, FormikValues } from "formik";

export interface IAction {
  type: string;
  payload: any;
}

export interface IAuthCred {
  username: string;
  password: string;
}

export interface IRegister extends IAuthCred {
  email: string;
  retypePassword: string;
}

export interface ITextInput extends Pick<FormikHandlers, 'handleChange' | 'handleBlur'> {
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  values: FormikValues;
  errors: FormikErrors<FormikValues>;
}
