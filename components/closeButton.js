import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withNavigation} from 'react-navigation';

class CloseButton extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
        <View style={{width: 32, alignItems: 'center'}}>
          <Ionicons
            name="md-close"
            color="white"
            size={32}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(CloseButton);
