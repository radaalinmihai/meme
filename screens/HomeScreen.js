import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null
        }
    }
    async componentDidMount() {
        try {
            const loggedIn = await AsyncStorage.getItem('token');
            if(loggedIn !== null) {
                this.setState({
                    token: loggedIn
                });
            } else {
                this.props.navigation.navigate('Login');
            }
        } catch(error) {
            console.warn(error);
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>#muiepsd</Text>
            </View>
        );
    }
}