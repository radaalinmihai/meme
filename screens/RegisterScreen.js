import React from 'react';
import { View, Text, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native';
import styles from '../style';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            retype_pass: '',
        };
        this._getInputs = this._getInputs.bind(this);
    }
    goToLogin = () => this.props.navigation.goBack();

    _getInputs = (name, text) => this.setState({ [name]: text });
    render() {
        console.log(this.state);
        const { username, email, password, retype_pass } = this.state;
        return (
            <ScrollView contentContainerStyle={{ flex: 1, width: '90%', justifyContent: 'center', alignSelf: 'center' }}>
                <View style={{ marginBottom: 50 }}>
                    <Text style={{ fontSize: 32, textAlign: 'center' }}>Register</Text>
                </View>
                <View>
                    <TextInput placeholder='Username' style={styles.input} textContentType='username' onChangeText={text => this._getInputs('username', text)} value={username} />
                    <TextInput placeholder='Email' style={styles.input} textContentType='emailAddress' onChangeText={text => this._getInputs('email', text)} value={email} />
                    <TextInput placeholder='Password' style={styles.input} textContentType='password' secureTextEntry onChangeText={text => this._getInputs('password', text)} value={password} />
                    <TextInput placeholder='Re-type password' textContentType='password' style={styles.input} secureTextEntry onChangeText={text => this._getInputs('retype_pass', text)} value={retype_pass} />
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        useForeground>
                        <View style={{ backgroundColor: '#06cf3c', padding: 10, borderRadius: 4 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Register</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#009cff' }} onPress={this.goToLogin}>
                        Have an account? Login!
                    </Text>
                </View>
            </ScrollView>
        );
    }
}