import React from 'react';
import {ScrollView, Text, StatusBar, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TouchableNativeFeedback} from 'react-native';
import axios from 'react-native-axios';
import config from '../axios_config';
import {getItem} from '../async_storage';

export default class ProfileScreen extends React.Component {
  state = {
    user: null,
  };
  componentDidMount = () => {
      this.getUser();
  }
  getUser = async () => {
    const token = await getItem('@token');
    axios
      .post('/details', '', {
        baseURL: config.baseURL,
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
      .then(res => {
        this.setState({
          user: res.data.success,
        });
      })
      .catch(err => {
        console.warn(err.response);
      });
  };
  render() {
    const {user} = this.state;
    console.log(user);
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
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back"
                color="white"
                size={32}
                style={{marginLeft: 20, marginTop: 5}}
              />
            </TouchableNativeFeedback>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#424242',
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}>
              {user.avatar == null ? (
                <TouchableNativeFeedback
                  onPress={() => console.log('change photo')}>
                  <View style={{position: 'relative', alignItems: 'center'}}>
                    <AwesomeIcon name="user-circle" size={100} color="white" />
                    <AwesomeIcon
                      name="camera"
                      style={{
                        position: 'absolute',
                        borderRadius: 50,
                        padding: 5,
                        backgroundColor: 'white',
                        bottom: -5,
                        right: -5,
                      }}
                      size={20}
                      color="black"
                    />
                  </View>
                </TouchableNativeFeedback>
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
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'OpenSans-Regular',
                  color: 'white',
                }}>
                Memers: {user.memers}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'OpenSans-Regular',
                  color: 'white',
                }}>
                Memed: {user.memed}
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
