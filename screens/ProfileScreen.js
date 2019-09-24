import React from 'react';
import {ScrollView, Text, StatusBar, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TouchableNativeFeedback} from 'react-native';

export default class ProfileScreen extends React.Component {
  state = {
    user: null,
  };
  componentDidMount = () =>
    this.setState({
      user: this.props.navigation.getParam('user'),
    });
  render() {
    const {user} = this.state;
    if (user !== null)
      return (
        <React.Fragment>
          <StatusBar barStyle="light-content" backgroundColor="#212121" />
          <ScrollView
            contentContainerStyle={{
              backgroundColor: '#242424',
              flexDirection: 'column',
            }}>
            <TouchableNativeFeedback
              style={{marginLeft: 20}}
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back"
                color="white"
                size={32}
                style={{marginLeft: 20}}
              />
            </TouchableNativeFeedback>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {user.avatar == null ? (
                <AwesomeIcon name="user-circle" size={100} color="white" />
              ) : null}
              <Text
                style={{
                  fontSize: 30,
                  color: 'white',
                  fontFamily: 'OpenSans-Regular',
                }}>
                {user.username}
              </Text>
            </View>
          </ScrollView>
        </React.Fragment>
      );
    else
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
  }
}
