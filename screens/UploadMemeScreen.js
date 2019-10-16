import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../components/backButton';

export default class UploadMemeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.camera = React.createRef();
    this.state = {
      unmounted: false,
    };
  }
  componentDidMount = () => {
    const {navigation} = this.props;
    navigation.addListener('willFocus', () => this.hideStatusBar());
    navigation.addListener('willBlur', () => this.hideStatusBar());
  };
  hideStatusBar = () =>
    this.setState(prevState => ({
      unmounted: !prevState.unmounted,
    }));
  takePicture = async () => {
    try {
      const options = {
        quality: 1,
        fixOrientation: true,
      };
      if(this.camera.current) {
        const {uri} = await this.camera.current.takePictureAsync(options);
        this.props.navigation.navigate('EditMeme', {uri});
      }
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    const {width, height} = Dimensions.get('window');
    const {unmounted} = this.state;
    if (unmounted)
      return (
        <View>
          <StatusBar hidden={unmounted} />
          <RNCamera
            ref={this.camera}
            style={{width: width, height: height}}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}>
            <View style={{flex: 1}}>
              <BackButton />
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                }}>
                <Awesome5Icon name="images" color="white" size={32} solid />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <TouchableNativeFeedback onPress={this.takePicture}>
                  <Awesome5Icon
                    name="circle"
                    color="white"
                    style={{marginBottom: 50}}
                    size={100}
                  />
                </TouchableNativeFeedback>
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
