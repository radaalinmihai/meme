import React from 'react';
import {ScrollView, TextInput} from 'react-native';

export default class AddTextInput extends React.Component {
  render() {
    const {showInput, inputValue} = this.props;
    return showInput ? (
      <ScrollView
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
        <TextInput
          autoFocus
          style={{color: 'white', fontSize: 25}}
          value={inputValue}
          onBlur={this.props.addTexts}
          onChangeText={this.props.getTextInput}
        />
      </ScrollView>
    ) : null;
  }
}
