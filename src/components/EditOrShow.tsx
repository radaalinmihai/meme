import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { TextInput, TouchableNativeFeedback } from "react-native";
import { EditInput, EditWrapper, Icon } from "./styles";
import useProfile from "../hooks/useProfile";
import { UpdateProfileLiterals } from "../helpers/interfaces";

interface IProps {
  placeholder: string;
  type: UpdateProfileLiterals;
}

const EditOrShow = ({ placeholder, type }: IProps) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const {updateProfile, profile} = useProfile();
  const editInputRef = useRef() as RefObject<TextInput>;

  const toggleEdit = useCallback(() => {
    setEditable(edit => !edit);
  }, [editable]);

  useEffect(() => {
    if(Object.keys(profile).length > 0)
      setValue(profile[type]);
  }, [profile]);

  useEffect(() => {
    if(editable) {
      editInputRef.current?.focus();
    }
  }, [editable]);

  return <EditWrapper>
    <EditInput
      onBlur={() => updateProfile({
        [type]: value
      })}
      onChangeText={text => setValue(text)}
      autoFocus={editable}
      ref={editInputRef}
      editable={editable}
      placeholderTextColor="#545454"
      placeholder={placeholder}
      value={value}
    />
    <TouchableNativeFeedback onPress={toggleEdit}>
      <Icon name='edit' />
    </TouchableNativeFeedback>
  </EditWrapper>;
};

export default EditOrShow;
