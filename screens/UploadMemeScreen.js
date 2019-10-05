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

export default class UploadMemeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.camera = React.createRef();
  }
  takePicture = async () => {
    try {
      const pic = await this.camera.current.takePictureAsync();
      console.log(pic);
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <View>
        <StatusBar />
        <RNCamera
          ref={this.camera}
          style={{width: width, height: height}}
          captureAudio={false}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
            <TouchableNativeFeedback onPress={this.takePicture}>
              <Awesome5Icon
                name="circle"
                color="white"
                style={{marginBottom: 50}}
                size={100}
              />
            </TouchableNativeFeedback>
          </View>
        </RNCamera>
      </View>
    );
  }
}
