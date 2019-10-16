import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StatusBar,
  TouchableNativeFeedback,
  TextInput,
  ScrollView,
} from 'react-native';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TextOverImage from '../components/textOverImage';

export default class EditMemeScreen extends React.Component {
  state = {
    uri: null,
    unmounted: false,
    showInput: false,
    inputValue: null,
    texts: [],
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
        uri: this.props.navigation.getParam('uri'),
        unmounted: true,
      });
    });
  };
  addTextInput = () =>
    this.setState(prevState => ({
      showInput: !prevState.showInput,
      inputValue: null,
    }));
  addTexts = () => {
    if (this.state.inputValue !== null || this.state.inputValue !== '')
      this.setState(prevState => ({
        texts: [...prevState.texts, this.state.inputValue],
      }));
    this.addTextInput();
  };
  render() {
    const {uri, unmounted, showInput, inputValue, texts} = this.state;
    console.log(texts);
    if (uri !== null) {
      return (
        <ImageBackground source={{uri}} style={{width: '100%', height: '100%'}}>
          <StatusBar hidden={unmounted} />
          {!showInput ? (
            <View style={{alignItems: 'flex-end', padding: 15}}>
              <TouchableNativeFeedback onPress={this.addTextInput}>
                <Awesome5Icon name="font" size={28} color="white" />
              </TouchableNativeFeedback>
            </View>
          ) : null}
          {showInput ? (
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, .5)',
              }}>
              <TextInput
                multiline
                autoFocus
                style={{color: 'white', fontSize: 25}}
                value={inputValue}
                onBlur={this.addTexts}
                onChangeText={text => this.setState({inputValue: text})}
              />
            </ScrollView>
          ) : null}
          {texts.length > 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {texts.map((val, i) => (
                <TextOverImage key={i}>{val}</TextOverImage>
              ))}
            </View>
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
