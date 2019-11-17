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
import CloseButton from '../components/closeButton';

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
      this.resetTexts();
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
    if (this.state.inputValue !== null && this.state.inputValue !== '')
      this.setState(prevState => ({
        texts: [...prevState.texts, {text: this.state.inputValue, y: 0}],
      }));
    this.addTextInput();
  };
  keep = (index, yPos) => {
    this.setState(prevState => ({
      texts: prevState.texts.map((val, i) =>
        i == index ? {text: val.text, y: yPos} : val,
      ),
    }));
  };
  resetTexts = () => this.setState({texts: []});
  render() {
    const {uri, unmounted, showInput, inputValue, texts} = this.state;
    console.log(texts);
    if (uri !== null) {
      return (
        <ImageBackground source={{uri}} style={{width: '100%', height: '100%'}}>
          <StatusBar hidden={unmounted} />
          {!showInput ? (
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 15, justifyContent: 'space-between'}}>
              <CloseButton />
              <View>
                <TouchableNativeFeedback onPress={this.addTextInput}>
                  <View style={{ width: 28 }}>
                    <Awesome5Icon name="font" size={28} color="white" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          ) : null}
          {showInput ? (
            <ScrollView
              contentContainerStyle={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, .5)',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <TextInput
                autoFocus
                style={{color: 'white', fontSize: 25}}
                value={inputValue}
                onBlur={this.addTexts}
                onChangeText={text => this.setState({inputValue: text})}
              />
            </ScrollView>
          ) : null}
          {texts.length > 0 && !showInput ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              {texts.map((val, i) => (
                <TextOverImage index={i} keep={this.keep} texts={val} key={i} />
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
