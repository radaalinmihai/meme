import { FormikErrors, FormikHandlers, FormikValues } from "formik";

export interface IAuth {
  access_token: string;
  refresh_token: string;
  error?: string;
};

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
  c_password: string;
}

export interface ITextInput extends Pick<FormikHandlers, 'handleChange' | 'handleBlur' | 'getFieldMeta'> {
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  values: FormikValues;
  errors: FormikErrors<FormikValues>;
}

export interface IRegisterRes {
  code: string;
  expires_in: string;
  access_token: string;
  refresh_token: string;
}
