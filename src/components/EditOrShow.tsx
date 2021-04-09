import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { TextInput, TouchableNativeFeedback } from "react-native";

import { UpdateProfileLiterals } from "../helpers/interfaces";
import useProfile from "../hooks/useProfile";
import { EditInput, EditWrapper, Icon } from "./styles";

interface IProps {
	placeholder: string;
	type: UpdateProfileLiterals;
	disabled?: boolean;
}

const EditOrShow = ({ placeholder, type, disabled }: IProps): JSX.Element => {
	const [editable, setEditable] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");
	const { updateProfile, profile } = useProfile();
	const editInputRef = useRef() as RefObject<TextInput>;

	const toggleEdit = useCallback((): void => {
		setEditable((edit: boolean) => !edit);
	}, [editable]);

	useEffect(() => {
		if (Object.keys(profile).length > 0) setValue(profile[type]);
	}, [profile]);

	useEffect(() => {
		if (editable) {
			editInputRef.current?.focus();
		}
	}, [editable]);

	return (
		<EditWrapper>
			<EditInput
				onBlur={() =>
					updateProfile({
						[type]: value,
					})
				}
				onChangeText={(text: string) => setValue(text)}
				autoFocus={editable}
				ref={editInputRef}
				editable={editable}
				placeholderTextColor="#545454"
				placeholder={placeholder}
				value={value}
			/>
			<TouchableNativeFeedback disabled={disabled} onPress={toggleEdit}>
				<Icon name="edit" disabled={disabled} />
			</TouchableNativeFeedback>
		</EditWrapper>
	);
};

export default EditOrShow;
