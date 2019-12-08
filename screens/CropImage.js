import React from 'react';
import {View, Image, StatusBar, Dimensions, Button} from 'react-native';
import ImageCropper from 'react-native-simple-image-cropper';

export default class CropImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cropperParams: {},
      croppedImage: null,
    };
    const {width, height} = Dimensions.get('window');
    this.crop_area_width = width;
    this.crop_area_height = height;
  }
  setCropperParams = cropperParams =>
    this.setState(prevState => ({
      ...prevState,
      cropperParams,
    }));
  cropImage = async () => {
    const {cropperParams} = this.state;

    const cropSize = {
      width: 200,
      height: 200,
    };

    const cropAreaSize = {
      width: this.crop_area_width,
      height: this.crop_area_height,
    };

    try {
      const result = await ImageCropper.crop({
        ...cropperParams,
        imageUri: this.props.navigation.getParam('uri'),
        cropSize,
        cropAreaSize,
      });
      this.setState(prevState => ({
        ...prevState,
        croppedImage: result,
      }));
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    const {croppedImage} = this.state,
      uri = this.props.navigation.getParam('uri');
    return (
      <View>
        <ImageCropper
          imageUri={uri}
          cropAreaWidth={this.crop_area_width}
          cropAreaHeight={this.crop_area_height}
          setCropperParams={this.setCropperParams}
        />
        <Button title='Crop image' onPress={this.cropImage} color='blue' />
        {croppedImage !== null ? (
          <Image
            source={{uri: croppedImage}}
            style={{width: undefined, height: undefined}}
            resizeMode="contain"
          />
        ) : null}
      </View>
    );
  }
}
