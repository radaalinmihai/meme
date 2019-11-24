import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StatusBar,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TextOverImage from '../components/textOverImage';
import CloseButton from '../components/closeButton';
import AddTextInput from '../components/addTextInput';
import EditTextInput from '../components/editTextInput';
import {captureScreen} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import requestCameraPermission from '../components/grantExternalMemory';

export default class EditMemeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uri: null,
      unmounted: false,
      showInput: false,
      showEditInput: false,
      inputValue: null,
      editTextIndex: null,
      texts: [],
      hidden: false,
    };
  }
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
  hideEditText = () => this.setState({showEditInput: false});
  initEditText = (index, text) => {
    this.setState({
      showEditInput: true,
      inputValue: text,
      editTextIndex: index,
    });
  };
  editText = index =>
    this.setState(prevState => ({
      texts: prevState.texts.map((val, i) =>
        i == index ? {text: prevState.inputValue, y: val.y} : val,
      ),
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
  resetTexts = () =>
    this.state.texts.length > 0 ? this.setState({texts: []}) : null;
  getTextInput = text => this.setState({inputValue: text});
  deleteText = () => {
    this.setState(prevState => ({
      texts: prevState.texts.filter((text, i) => i !== prevState.editTextIndex),
    }));
    console.log('deleted');
  };
  takeSnap = async () => {
    this.setState(
      {
        hidden: true,
      },
      () => {
        captureScreen({
          format: 'jpg',
          quality: 1,
        })
          .then(async uri => {
            if (requestCameraPermission())
              await CameraRoll.save(uri, {type: 'photo', album: 'Meme'});
          })
          .catch(err => console.error(err));
        this.setState({hidden: false});
      },
    );
  };
  render() {
    const {
      uri,
      unmounted,
      showInput,
      inputValue,
      texts,
      showEditInput,
      editTextIndex,
      hidden,
    } = this.state;
    console.log(texts, hidden);
    if (uri !== null) {
      return (
        <ImageBackground
          source={{uri}}
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <StatusBar hidden={unmounted} />
          {!showInput && !showEditInput && !hidden ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 15,
                justifyContent: 'space-between',
              }}>
              <CloseButton />
              <View style={{flexDirection: 'row'}}>
                <TouchableNativeFeedback onPress={this.resetTexts}>
                  <View style={{width: 28, marginRight: 30}}>
                    <AwesomeIcon name="trash-o" size={28} color="white" />
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.addTextInput}>
                  <View style={{width: 28}}>
                    <Awesome5Icon name="font" size={28} color="white" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          ) : null}
          <AddTextInput
            showInput={showInput}
            addTexts={this.addTexts}
            inputValue={inputValue}
            getTextInput={this.getTextInput}
          />
          <EditTextInput
            show={showEditInput}
            editText={this.editText}
            deleteText={this.deleteText}
            onBlur={this.hideEditText}
            inputValue={inputValue}
            getTextInput={this.getTextInput}
            index={editTextIndex}
          />
          {texts.length > 0 && !showInput && !showEditInput ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 900,
              }}>
              {texts.map((val, i) => (
                <TextOverImage
                  initEditText={this.initEditText}
                  index={i}
                  keep={this.keep}
                  texts={val}
                  key={i}
                />
              ))}
            </View>
          ) : null}
          {!showInput && !showEditInput && !hidden ? (
            <View
              style={{
                padding: 20,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <TouchableOpacity onPress={this.takeSnap}>
                <AwesomeIcon name="save" color="white" size={32} solid />
              </TouchableOpacity>
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
