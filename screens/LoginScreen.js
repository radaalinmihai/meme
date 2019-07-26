import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableNativeFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from '../style';

export default class LoginScreen extends React.Component {
    goToRegister = () => this.props.navigation.navigate('Register');
    render() {
        return (
            <ScrollView contentContainerStyle={{ flex: 1, width: '90%', justifyContent: 'center', alignSelf: 'center' }}>
                <View style={{ marginBottom: 50 }}>
                    <Text style={{ fontSize: 32, textAlign: 'center' }}>Login</Text>
                </View>
                <View>
                    <View style={[styles.input, { flexDirection: 'row' }]}>
                        <FontAwesomeIcon icon={faUser} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                        <TextInput placeholder='Username' style={{ height: 40 }} style={{ color: 'black' }} textContentType='username' />
                    </View>
                    <TextInput placeholder='Password' style={styles.input} textContentType='password' secureTextEntry />
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        useForeground>
                        <View style={{ backgroundColor: '#06cf3c', padding: 10, borderRadius: 4 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Login</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#009cff' }} onPress={this.goToRegister}>
                        Don't have an account? Register!
                    </Text>
                </View>
            </ScrollView>
        );
    }
}