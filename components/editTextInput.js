import React from 'react';
import {ScrollView, TouchableWithoutFeedback, TextInput} from 'react-native';
import AwesomeFont from 'react-native-vector-icons/FontAwesome';

export default class EditTextInput extends React.Component {
  onBlur = () => {
    this.props.editText(this.props.index);
    this.props.onBlur();
  };
  deleteText = () => {
    this.props.deleteText();
    this.onBlur();
  }
  render() {
    const {show, inputValue} = this.props;
    return show ? (
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, .5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback onPress={this.deleteText}>
          <AwesomeFont
            style={{position: 'absolute', right: '5%', top: '2%'}}
            name="trash-o"
            size={32}
            color="white"
          />
        </TouchableWithoutFeedback>
        <TextInput
          autoFocus
          style={{color: 'white', fontSize: 25}}
          value={inputValue}
          onBlur={this.onBlur}
          onChangeText={this.props.getTextInput}
        />
      </ScrollView>
    ) : null;
  }
}
