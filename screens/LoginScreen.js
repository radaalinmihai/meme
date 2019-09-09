import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableNativeFeedback } from 'react-native';
import axios from 'react-native-axios';
import styles from '../style';

export default class LoginScreen extends React.Component {
    state = {
        username: '',
        password: '',
    }
    goToRegister = () => this.props.navigation.navigate('Register');
    login = () => {
        axios.post('http://192.168.0.154:8000/api/login', this.state)
        .then(res => console.log(res.data.success))
        .catch(error => console.warn(error));
    }
    /* componentDidMount = () => {
        axios('http://192.168.0.154:8000/api/details', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU1MGNlMWZkNDJkMzE4ZTNlOWFkZTIzNWE0YzAxNzA1YzU4NDk3MGVmMWFmNDAwM2I1NDM0MjYzYjdjZTk4YjkxMTcyOTJhMjRjOWNiNTBkIn0.eyJhdWQiOiIxIiwianRpIjoiNTUwY2UxZmQ0MmQzMThlM2U5YWRlMjM1YTRjMDE3MDVjNTg0OTcwZWYxYWY0MDAzYjU0MzQyNjNiN2NlOThiOTExNzI5MmEyNGM5Y2I1MGQiLCJpYXQiOjE1NjUyNTk4NjIsIm5iZiI6MTU2NTI1OTg2MiwiZXhwIjoxNTk2ODgyMjYyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.X5afEALN7WN_xpYqFbveWBLD0as3NZtiwC3VPqtcn6hBBdVtnxEJQtay8lU2-O3lziNNL_XMOx2C7HXhF1iv4VY7Yw0xZzy_tTy9c909WWNntDsWjPAe0OP5J31oHzwE3Y8pDy1phjAMjn7YqVAsCRuGDozNRl1iuMTQOA4xuTBx3rJ_YCFmQcp_QAfi81ewwdB11I3VxhDUwiRqPqKRDyqZTPXLU8gA7HNMJbNCDuOyeOvHkdJKDNZNJIhVQeIWBlsSplMcufCYVJHd0s4aPhkXTwMCR02FBgPiY8YgdvIGpt5hPtWEApKYW6TpgbPOzBrLoi2JqbY3HyMYdSQGc9Vp5fXkMuFI2jz3Ziadnpu-sRLhEf0bBhKrhsKuExB2v0PZ-XmSKxIEyHpEdt-pZXNsmeqUFh64cRPzeT_OeGQGXrZQ40DM_quBF-EBOwVNnssb3x5CbDghTqx7e2-ZD9_OUjENpQYMdk0JDRl_H7AqFLBW4HMRUVLhXi3E1xxP9p_FARR9u8DQCeQ-RTgiSuXR-qRmbCvcK2L4b8FChbyYrnc8WsUhiz8oaXozBrBZG9BHvKmCBXRJjahVUQE6Lg_XxAbvT0wSd3YrcZ1jKQqMUYydZuXAESsdRkZNj8a-2_pmcDClljxKzrJ23-rOSwoP6pFS5TvUglDNdl-06DE'
            }
        })
        .then(res => console.log(res))
        .catch(err => console.warn(err));
    } */
    render() {
        const { username, password } = this.state;
        return (
            <ScrollView contentContainerStyle={{ flex: 1, width: '90%', justifyContent: 'center', alignSelf: 'center' }}>
                <View style={{ marginBottom: 50 }}>
                    <Text style={{ fontSize: 32, textAlign: 'center' }}>Sign In</Text>
                </View>
                <View>
                    <View style={styles.input}>
                        <TextInput placeholder='Username' textContentType='username' value={username} onChangeText={text => this.setState({ username: text })} />
                    </View>
                    <View style={styles.input}>
                        <TextInput placeholder='Password' textContentType='password' secureTextEntry value={password} onChangeText={text => this.setState({ password: text })} />
                    </View>
                    <TouchableNativeFeedback
                        useForeground
                        onPress={this.login}>
                        <View style={styles.principalButtons}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Sign In</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#009cff' }} onPress={this.goToRegister}>
                        Don't have an account? Sign up!
                    </Text>
                </View>
            </ScrollView>
        );
    }
}