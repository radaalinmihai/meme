import React from 'react';
import {TouchableNativeFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withNavigation} from 'react-navigation';

class CloseButton extends React.Component {
  render() {
    return (
      <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()}>
        <Ionicons
          name="md-close"
          color="white"
          size={32}
          style={{marginLeft: 20, marginTop: 20}}
        />
      </TouchableNativeFeedback>
    );
  }
}

export default withNavigation(CloseButton);