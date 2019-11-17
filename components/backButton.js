import React from 'react';
import {TouchableWithoutFeedback, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withNavigation} from 'react-navigation';

class BackButton extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        accessibilityRole={'button'}
        onPress={() => this.props.navigation.goBack()}>
        <View style={{width: 32, margin: 20}}>
          <Ionicons name="ios-arrow-back" color="white" size={32} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(BackButton);
