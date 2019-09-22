import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';
import styles from '../style';
import axios from 'react-native-axios';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import config from '../axios_config';
import { storeItem } from '../async_storage';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      c_password: '',
    };
    this._getInputs = this._getInputs.bind(this);
  }

  register = () => {
    axios.post('/register', this.state, config).then(async res => {
        console.log(res.data.success);
      /* if(res.data.success) {
          await storeItem('@token', res.data.success.token);
          this.props.navigation.navigate('AuthLoading');
      } */
    }).catch(err => {
        console.log(err.response);
    });
  };

  goToLogin = () => this.props.navigation.goBack();

  _getInputs = (name, text) => this.setState({[name]: text});

  render() {
    const {username, email, password, c_password} = this.state;
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: '#242424',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <View style={{marginBottom: 50}}>
          <Text style={{fontSize: 32, textAlign: 'center', color: '#cccccc'}}>
            Sign Up
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
            name="email"
            color="#cccccc"
            size={20}
            solid>
            <TextInput
              style={{color: 'white'}}
              placeholder="Email"
              textContentType="emailAddress"
              value={email}
              placeholderTextColor="#cccccc"
              onChangeText={text => this.setState({email: text})}
            />
          </MaterialCom.Button>
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
          <MaterialCom.Button
            style={styles.input}
            backgroundColor="transparent"
            name="onepassword"
            color="#cccccc"
            size={20}>
            <TextInput
              style={{color: 'white'}}
              placeholder="Retype password"
              textContentType="password"
              value={c_password}
              placeholderTextColor="#cccccc"
              onChangeText={text => this.setState({c_password: text})}
            />
          </MaterialCom.Button>
          <TouchableNativeFeedback useForeground onPress={this.register}>
            <View style={styles.principalButtons}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                Sign Up
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: '#009cff'}} onPress={this.goToLogin}>
            Have an account? Sign in!
          </Text>
        </View>
      </ScrollView>
    );
  }
}
