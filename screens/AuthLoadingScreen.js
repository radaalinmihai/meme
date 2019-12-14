import React from 'react';
import {View, Text} from 'react-native';
import axios from 'react-native-axios';
import {getItem, storeItem} from '../async_storage';
import config from '../axios_config';

export default class AuthLoadingScreen extends React.Component {
  componentDidMount = () => this.checkToken();
  checkToken = async () => {
    const token = await getItem('@token');
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
        .catch(err => {
          if (err.response && err.response.data.message == 'Unauthenticated.') {
            axios
              .post(
                '/refreshToken',
                {refresh_token: token.refresh_token},
                {
                  baseURL: config.baseURL,
                },
              )
              .then(async res => {
                if (res.data.success) {
                  await storeItem('@token', res.data.success.token);
                  this.props.navigation.navigate('App');
                }
              })
              .catch(err => {
                if (err.response.data && err.response.status == 500)
                  this.props.navigation.navigate('Auth');
              });
          }
        });
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
