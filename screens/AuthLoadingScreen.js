import React from 'react';
import {View, Text} from 'react-native';
import axios from 'react-native-axios';
import {getItem} from '../async_storage';
import config from '../axios_config';

export default class AuthLoadingScreen extends React.Component {
  componentDidMount = async () => {
    const token = await getItem('@token');
    console.log(token);
    let res = await axios.post('/checkToken', '', {
      baseURL: config.baseURL,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    let {success} = res.data;
    if (res.data.success)
      this.props.navigation.navigate(success ? 'App' : 'Auth');
    console.log(success);
  };
  render() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}
