import React from 'react';
import {Dimensions} from 'react-native';
import AmazingCropper from 'react-native-amazing-cropper';

export default class CropImage extends React.Component {
  onDone = image => {
    this.props.navigation.navigate('EditMeme', {uri: image});
  }
  render() {
    const uri = this.props.navigation.getParam('uri'),
      width = this.props.navigation.getParam('width'),
      height = this.props.navigation.getParam('height');
      console.log(width, height);
    return (
      <AmazingCropper
        onDone={this.onDone}
        onCancel={() => console.log('hehehe')}
        imageUri={uri}
        imageWidth={width}
        imageHeight={height}
        NOT_SELECTED_AREA_OPACITY={0.1}
        BORDER_WIDTH={0}
      />
    );
  }
}
