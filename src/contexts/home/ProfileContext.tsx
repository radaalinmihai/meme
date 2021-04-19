import axios, { AxiosError, AxiosResponse } from "axios";
import React, { createContext, useContext, useReducer } from "react";

import Actions from "../../helpers/actions";
import {
	IProfile,
	PartialProfile,
	Profile,
	ProfileReq,
	ProfileTable,
} from "../../helpers/interfaces";
import showError from "../../helpers/showError";

const initialState: PartialProfile = {
	loading: false,
	profile: {} as IProfile,
};

const profileStore: React.Context<any> = createContext(initialState);

const { Provider } = profileStore;

const reducer = (state = initialState, action: any) => {
	switch (action.type) {
		case Actions.FETCH_PROFILE:
			return {
				...state,
				loading: true,
			};
		case Actions.FETCH_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				profile: action.payload,
			};
		case Actions.FETCH_PROFILE_FAIL:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

const ProfileProvider: React.FC = ({ children }): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const useProfile = () => {
	const { state, dispatch } = useContext(profileStore);
	const { loading, profile } = state as Profile;

	const getProfile = (): void => {
		dispatch({
			type: Actions.FETCH_PROFILE,
		});
		axios
			.get("/profile")
			.then((res: AxiosResponse<ProfileReq>) => {
				dispatch({
					type: Actions.FETCH_PROFILE_SUCCESS,
					payload: res.data.profile,
				});
			})
			.catch((err: AxiosError) => {
				console.error(err.response);
				showError("Something went wrong");
			});
	};

	const updateProfile = (body: ProfileTable): void => {
		axios
			.put(`/profile/${profile.profileId}`, JSON.stringify(body))
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err.response);
			});
	};

	return { loading, profile, getProfile, updateProfile };
};

export { ProfileProvider, useProfile };
