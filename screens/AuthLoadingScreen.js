import React from 'react';
import {View, Text} from 'react-native';
import axios from 'react-native-axios';
import {getItem} from '../async_storage';
import config from '../axios_config';

export default class AuthLoadingScreen extends React.Component {
  componentDidMount = () => {
    this.checkToken();
    this.props.navigation.navigate('App');
  };
  checkToken = async () => {
    const token = await getItem('@token');
    console.log(token);
    if (token !== null) {
      axios
        .post('/checkToken', '', {
          baseURL: config.baseURL,
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        })
        .then(res => {
          this.props.navigation.navigate(res.data.success ? 'App' : 'Auth');
        })
        .catch(err => console.warn(err));
    } else this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}
