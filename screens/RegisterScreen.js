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
                    <Text style={{ fontSize: 32, textAlign: 'center' }}>Sign Up</Text>
                </View>
                <View>
                    <View style={styles.input}>
                        <TextInput placeholder='Username' textContentType='username' onChangeText={text => this._getInputs('username', text)} value={username} />
                    </View>
                    <View style={styles.input}>
                        <TextInput placeholder='Email' textContentType='emailAddress' onChangeText={text => this._getInputs('email', text)} value={email} />
                    </View>
                    <View style={styles.input}>
                        <TextInput placeholder='Password' textContentType='password' secureTextEntry onChangeText={text => this._getInputs('password', text)} value={password} />
                    </View>
                    <View style={styles.input}>
                        <TextInput placeholder='Re-type password' textContentType='password' secureTextEntry onChangeText={text => this._getInputs('retype_pass', text)} value={retype_pass} />
                    </View>
                    <TouchableNativeFeedback
                        useForeground>
                        <View style={styles.principalButtons}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Sign Up</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#009cff' }} onPress={this.goToLogin}>
                        Have an account? Sign in!
                    </Text>
                </View>
            </ScrollView>
        );
    }
}