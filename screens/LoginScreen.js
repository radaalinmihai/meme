import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import axios from 'react-native-axios';
import styles from '../style';
import config from '../axios_config';
import {storeItem} from '../async_storage';

export default class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
  };
  goToRegister = () => this.props.navigation.navigate('Register');
  login = () => {
    axios
      .post('/login', this.state, config)
      .then(
        async res => {
          await storeItem('@token', res.data.success.token);
          this.props.navigation.navigate('App');
        },
        error => console.warn(error),
      )
      .catch(error => console.warn(error));
  };
  render() {
    const {username, password} = this.state;
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: '90%',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <View style={{marginBottom: 50}}>
          <Text style={{fontSize: 32, textAlign: 'center'}}>Sign In</Text>
        </View>
        <View>
          <View style={styles.input}>
            <TextInput
              placeholder="Username"
              textContentType="username"
              value={username}
              onChangeText={text => this.setState({username: text})}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              value={password}
              onChangeText={text => this.setState({password: text})}
            />
          </View>
          <TouchableNativeFeedback useForeground onPress={this.login}>
            <View style={styles.principalButtons}>
              <Text style={{textAlign: 'center', color: 'white'}}>Sign In</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: '#009cff'}} onPress={this.goToRegister}>
            Don't have an account? Sign up!
          </Text>
        </View>
      </ScrollView>
    );
  }
}
