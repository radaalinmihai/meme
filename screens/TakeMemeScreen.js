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

export default class TakeMemeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unmounted: false,
      type: 'back',
    };
    this.camera = React.createRef();
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
        mirrorImage: true,
      };
      if (this.camera.current) {
        const {uri} = await this.camera.current.takePictureAsync(options);
        this.props.navigation.navigate('EditMeme', {uri});
      }
    } catch (err) {
      console.warn(err);
    }
  };
  reverseCam = () => this.setState(prevState => ({
    type: prevState.type == 'back' ? 'front' : 'back'
  }));
  render() {
    const {width, height} = Dimensions.get('window');
    const {unmounted, type} = this.state;
    console.log(type);
    if (unmounted)
      return (
        <View>
          <StatusBar hidden={unmounted} />
          <RNCamera
            ref={this.camera}
            style={{width: width, height: height}}
            captureAudio={false}
            type={RNCamera.Constants.Type[type]}>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <BackButton />
              <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginBottom: 30}}>
                <TouchableWithoutFeedback onPress={() => console.log('pressed')}>
                  <View>
                    <Awesome5Icon name='images' size={30} solid color='white' />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.takePicture}>
                  <View>
                    <Awesome5Icon name='circle' size={100} color='white' />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.reverseCam}>
                  <View>
                    <Ionicons name='md-reverse-camera' size={30} color='white' solid />
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
