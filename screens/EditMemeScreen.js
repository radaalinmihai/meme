import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {TextInput} from 'react-native-gesture-handler';

export default class EditMemeScreen extends React.Component {
  state = {
    uri: null,
    unmounted: false,
    showInput: false,
    inputValue: null,
  };
  componentDidMount = () => {
    const {navigation} = this.props;
    navigation.addListener('willBlur', () => {
      this.setState({
        uri: null,
        unmounted: false,
      });
    });
    navigation.addListener('willFocus', () => {
      this.setState({
        unmounted: true,
      });
    });
    this.setState({
      uri: this.props.navigation.getParam('uri'),
    });
  };
  addTextInput = () =>
    this.setState(prevState => ({
      showInput: !prevState.showInput,
    }));
  render() {
    const {uri, unmounted, showInput, inputValue} = this.state;
    console.log(inputValue);
    if (uri !== null) {
      return (
        <ImageBackground source={{uri}} style={{width: '100%', height: '100%'}}>
          <StatusBar hidden={unmounted} />
          <View style={{alignItems: 'flex-end', padding: 15}}>
            <TouchableNativeFeedback onPress={this.addTextInput}>
              <Awesome5Icon name="font" size={28} color="white" />
            </TouchableNativeFeedback>
          </View>
          {showInput ? (
            <TextInput
              value={inputValue}
              onChangeText={text => this.setState({inputValue: text})}
              style={{backgroundColor: 'rgba(0, 0, 0, .5)'}}
            />
          ) : null}
        </ImageBackground>
      );
    } else
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
  }
}
