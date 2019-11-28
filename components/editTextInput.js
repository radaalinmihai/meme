import React from 'react';
import {ScrollView, TouchableWithoutFeedback, TextInput, View} from 'react-native';
import AwesomeFont from 'react-native-vector-icons/FontAwesome';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

export default class EditTextInput extends React.Component {
  onBlur = () => {
    this.props.editText(this.props.index);
    this.props.onBlur();
  };
  deleteText = () => {
    this.props.deleteText();
    this.onBlur();
  };
  increaseTextSize = () => this.props.increaseTextSize(this.props.index);
  decreaseTextSize = () => this.props.decreaseTextSize(this.props.index);
  render() {
    const {show, inputValue, fontSize} = this.props;
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
        <View style={{position: 'absolute', right: '5%', top: '2%'}}>
          <TouchableWithoutFeedback onPress={this.deleteText}>
            <AwesomeFont
              name="trash-o"
              size={32}
              color="white"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.increaseTextSize}>
            <MaterialCommunity
              style={{marginTop: 10}}
              name="format-font-size-increase"
              size={32}
              color="white"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.decreaseTextSize}>
            <MaterialCommunity
              style={{marginTop: 10}}
              name="format-font-size-decrease"
              size={32}
              color="white"
            />
          </TouchableWithoutFeedback>
        </View>
        <TextInput
          autoFocus
          style={{color: 'white', fontSize: fontSize !== null ? fontSize : 20}}
          value={inputValue}
          onBlur={this.onBlur}
          onChangeText={this.props.getTextInput}
        />
      </ScrollView>
    ) : null;
  }
}
