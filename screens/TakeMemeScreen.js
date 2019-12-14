import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../components/backButton';
import Orientation from 'react-native-orientation';

export default class TakeMemeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unmounted: false,
      type: 'back',
      orientation: '',
    };
    this.camera = React.createRef();
  }
  componentDidMount = () => {
    const {navigation} = this.props;
    Orientation.addSpecificOrientationListener(orientation => console.log(orientation));
    navigation.addListener('willFocus', () => this.hideStatusBar());
    navigation.addListener('willBlur', () => this.hideStatusBar());
  };
  hideStatusBar = () =>
    this.setState(prevState => ({
      unmounted: !prevState.unmounted,
    }));
  takePicture = async () => {
    const {type} = this.state;
    try {
      const options = {
        quality: 1,
        orientation: 'portrait',
        skipProcessing: false,
        mirrorImage: type === 'front',
        fixOrientation: type === 'front',
      };
      if (this.camera.current) {
        const {uri} = await this.camera.current.takePictureAsync(options);
        this.props.navigation.navigate('EditMeme', {uri});
      }
    } catch (err) {
      console.warn(err);
    }
  };
  reverseCam = () =>
    this.setState(prevState => ({
      type: prevState.type === 'back' ? 'front' : 'back',
    }));
  render() {
    const {width, height} = Dimensions.get('window');
    const {unmounted, type} = this.state;
    const isActive = this.props.navigation.isFocused();
    console.log(type);
    if (isActive)
      return (
        <View>
          {console.log('yes')}
          <StatusBar hidden={unmounted} />
          <RNCamera
            ref={this.camera}
            style={{width: width, height: height}}
            captureAudio={false}
            type={RNCamera.Constants.Type[type]}>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <BackButton />
              <View
                style={{
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 30,
                }}>
                <TouchableWithoutFeedback
                  onPress={() => console.log('pressed')}>
                  <View>
                    <Awesome5Icon name="images" size={30} solid color="white" />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.takePicture}>
                  <View>
                    <Awesome5Icon name="circle" size={100} color="white" />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.reverseCam}>
                  <View>
                    <Ionicons
                      name="md-reverse-camera"
                      size={30}
                      color="white"
                      solid
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </RNCamera>
        </View>
      );
    else
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
  }
}
