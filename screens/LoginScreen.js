import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableNativeFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from '../style';

export default class LoginScreen extends React.Component {
    goToRegister = () => this.props.navigation.navigate('Register');
    render() {
        return (
            <ScrollView contentContainerStyle={{ flex: 1, width: '90%', justifyContent: 'center', alignSelf: 'center' }}>
                <View style={{ marginBottom: 50 }}>
                    <Text style={{ fontSize: 32, textAlign: 'center' }}>Sign In</Text>
                </View>
                <View>
                    <View style={styles.input}>
                        <FontAwesomeIcon icon={faUser} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                        <TextInput placeholder='Username' textContentType='username' />
                    </View>
                    <View style={styles.input}>
                        <FontAwesomeIcon icon={faLock} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                        <TextInput placeholder='Password' textContentType='password' secureTextEntry />
                    </View>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        useForeground>
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