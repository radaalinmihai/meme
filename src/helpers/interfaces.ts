import { AxiosError } from "axios";
import { FormikErrors, FormikHandlers, FormikValues } from "formik";

export interface IAuth {
	code?: string;
	access_token: string;
	refresh_token: string;
}

export interface IAction<T> {
	type: string;
	payload: T;
}

export interface IAuthCred {
	username: string;
	password: string;
}

export interface IRegister extends IAuthCred {
	email: string;
	c_password: string;
}

export interface ITextInput
	extends Pick<FormikHandlers, "handleChange" | "handleBlur" | "getFieldMeta"> {
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
		error: string;
	};
}

type Base = "profile";

export type PartialBaseContext<U> = { [key in Base]: Partial<U> } & {
	loading: boolean;
};

export type BaseContext<U> = { [key in Base]: U } & {
	loading: boolean;
};

export interface IProfile {
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

export type UpdateProfileLiterals = "firstName" | "avatar" | "lastName" | "email";

export type ProfileTable = Partial<Pick<IProfile, UpdateProfileLiterals>>;

export type PartialProfile = PartialBaseContext<IProfile>;

export type Profile = BaseContext<IProfile>;

export type ProfileReq = { profile: IProfile };

export interface ITabBarIconProps {
	focused: boolean;
}

export interface ICardProps {
	src: string;
	active: boolean;
	second: boolean;
	removeItem: (finished: boolean) => void;
}

export interface CardCtx {
	startX: number;
}

export interface IAppConfiguration {
	cardRotationValue: number;
	cardThresholdFraction: number;
	cardActiveStartRotation: number;
}
