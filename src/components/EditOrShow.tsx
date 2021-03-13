import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { TextInput, TouchableNativeFeedback } from "react-native";
import { EditInput, EditWrapper, Icon } from "./styles";

interface IProps {
  placeholder: string;
}

const EditOrShow = ({ placeholder }: IProps) => {
  const [editable, setEditable] = useState<boolean>(false);
  const editInputRef = useRef() as RefObject<TextInput>;

  const toggleEdit = useCallback(() => {
    setEditable(edit => !edit);
  }, [editable]);

  useEffect(() => {
    if(editable) {
      editInputRef.current?.focus();
    }
  }, [editable]);

  return <EditWrapper>
    <EditInput
      autoFocus={editable}
      ref={editInputRef}
      editable={editable}
      placeholderTextColor="#545454"
      placeholder={placeholder}
    />
    <TouchableNativeFeedback onPress={toggleEdit}>
      <Icon name='edit' />
    </TouchableNativeFeedback>
  </EditWrapper>;
};

export default EditOrShow;
