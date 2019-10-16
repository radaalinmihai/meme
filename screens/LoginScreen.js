import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';
import axios from 'react-native-axios';
import styles from '../style';
import config from '../axios_config';
import {storeItem} from '../async_storage';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';

export default class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
    error: false,
    errorMessage: null,
  };
  componentDidMount = () => {
    const {navigation} = this.props;
    navigation.addListener('willBlur', () => {
      this.setState({
        error: false,
        errorMessage: null
      });
    });
  }
  goToRegister = () => this.props.navigation.navigate('Register');
  login = () => {
    const {username, password} = this.state;
    const data = {username, password};
    axios
      .post('/login', data, config)
      .then(async res => {
        await storeItem('@token', res.data.success.token);
        this.props.navigation.navigate('App');
      })
      .catch(error => {
        if (error.response.status === 401)
          this.setState({
            error: true,
            errorMessage: error.response.data.error,
            username: null,
            password: null,
          });
      });
  };
  render() {
    const {username, password, error, errorMessage} = this.state;
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#212121" />
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            width: '100%',
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#242424',
          }}>
          <Text
            style={[
              {
                fontSize: 32,
                textAlign: 'center',
                color: '#cccccc',
              },
              !error ? {marginBottom: 50} : null,
            ]}>
            Sign In
          </Text>
          {error ? (
            <View
              style={{
                backgroundColor: '#ff5145',
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: '#8a0000',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#cccccc',
                  textAlign: 'center',
                }}>
                {errorMessage}
              </Text>
            </View>
          ) : null}
          <View>
            <Awesome5Icon.Button
              style={[
                styles.input,
                error ? {borderColor: '#ff5145'} : {borderColor: '#cccccc'},
              ]}
              backgroundColor="transparent"
              name="user"
              /* color={error ? '#ff5145' : '#cccccc'} */
              color='#ccc'
              size={20}
              solid>
              <TextInput
                style={{color: 'white'}}
                placeholder="Username"
                placeholderTextColor={error ? '#ff5145' : '#cccccc'}
                textContentType="username"
                value={username}
                onChangeText={text => this.setState({username: text})}
              />
            </Awesome5Icon.Button>
            <MaterialCom.Button
              style={[
                styles.input,
                error ? {borderColor: '#ff5145'} : {borderColor: '#cccccc'},
              ]}
              backgroundColor="transparent"
              name="onepassword"
              /* color={error ? '#ff5145' : '#cccccc'} */
              color='#ccc'
              size={20}>
              <TextInput
                secureTextEntry={true}
                style={{color: 'white'}}
                placeholder="Password"
                placeholderTextColor={error ? '#ff5145' : '#cccccc'}
                textContentType="password"
                value={password}
                onChangeText={text => this.setState({password: text})}
              />
            </MaterialCom.Button>
            <TouchableNativeFeedback useForeground onPress={this.login}>
              <View style={styles.principalButtons}>
                <Text
                  style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  Sign In
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#009cff'}} onPress={this.goToRegister}>
              Don't have an account? Sign up!
            </Text>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}
