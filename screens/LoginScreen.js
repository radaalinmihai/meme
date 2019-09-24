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
  };
  goToRegister = () => this.props.navigation.navigate('Register');
  login = () => {
    axios
      .post('/login', this.state, config)
      .then(async res => {
        await storeItem('@token', res.data.success.token);
        this.props.navigation.navigate('App');
      })
      .catch(error => {
        if(error.response) {
          console.log(error.response);
        }
      });
  };
  render() {
    const {username, password} = this.state;
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
          <View style={{marginBottom: 50}}>
            <Text style={{fontSize: 32, textAlign: 'center', color: '#cccccc'}}>
              Sign In
            </Text>
          </View>
          <View>
            <Awesome5Icon.Button
              style={styles.input}
              backgroundColor="transparent"
              name="user"
              color="#cccccc"
              size={20}
              solid>
              <TextInput
                style={{color: 'white'}}
                placeholder="Username"
                textContentType="username"
                value={username}
                placeholderTextColor="#cccccc"
                onChangeText={text => this.setState({username: text})}
              />
            </Awesome5Icon.Button>
            <MaterialCom.Button
              style={styles.input}
              backgroundColor="transparent"
              name="onepassword"
              color="#cccccc"
              size={20}>
              <TextInput
                style={{color: 'white'}}
                placeholder="Password"
                textContentType="password"
                value={password}
                placeholderTextColor="#cccccc"
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
