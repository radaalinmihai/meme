import { FormikErrors, FormikHandlers, FormikValues } from "formik";
import { AxiosError } from "axios";

export interface IAuth {
  code?: string;
  access_token: string;
  refresh_token: string;
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

export interface IErrorAuth extends AxiosError {
  data: {
    error: string
  }
}

export interface IBaseContext {
  loading: boolean;
}

export interface IProfile extends IBaseContext {
  Id: string;
  avatar: string;
  created_at: Date;
  email: string;
  firstName: string;
  lastName: string;
  profileId: number;
  updated_at: Date | null;
  userId: string;
  username: string;
}
