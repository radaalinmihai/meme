import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableNativeFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from '../style';

export default class LoginScreen extends React.Component {
    state = {
        username: '',
        password: '',
    }
    goToRegister = () => this.props.navigation.navigate('Register');
    login = async () => {
        const formData = new FormData();

        for(let key in this.state)
            formData.append(key, this.state[key]);

        await fetch('http://localhost:8000/api/details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNlM2IxMDAxMDI5ODM0OGMwMWU5ZTY3MmQxYmI0OTc1N2IwMDFlNmQ2NDNmZmRkMTcyZDYwYzRlY2RjZGIwOGFmZmZkYTVkNjljZjE5NmE2In0.eyJhdWQiOiIxIiwianRpIjoiM2UzYjEwMDEwMjk4MzQ4YzAxZTllNjcyZDFiYjQ5NzU3YjAwMWU2ZDY0M2ZmZGQxNzJkNjBjNGVjZGNkYjA4YWZmZmRhNWQ2OWNmMTk2YTYiLCJpYXQiOjE1NjUxNzgwMzAsIm5iZiI6MTU2NTE3ODAzMCwiZXhwIjoxNTk2ODAwNDMwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.PsFTn7C6SFxr0p31ukn8dhmRoO4ZHj9XW5o2006hjEnpoZuuLbFfk53MyNS79b2f6d-L736shg5j0QjXNI6vsE34LVjWXuglpo7HEdndjVQvThg_4xgUAB-deINtuGH33tvk523wo0S6oHFVPoj18myWLeFz-3PwzAMjDEBo-FsQ3-LKBtMP7x4K3TB665YSTFvp6MApSv6s6MPi3WF-K8gu_6cY1e28B9XM6DW8o5jHtvwILlsK8YTnOXidzoTFX7exXKhNXLbcH0eQtDurvt3T3Nx-qAbKIfT8kh2wDxnBCAy9GJg5DSOTpIgLoGBvn0nvqkRoz4tVa-XUPhFz93fMPnn3HTdQg-uxi1NY5-jMUHkjl2LZQ94hSa4iw4uNz__B2M2-0a0oZoj1QZbgc69xMNTzOO0KAFc7jturzafz0uGBjYx8NW_qOOPq3IuA93gFNScU8QNIPZdG2qYBRkezp5DYbQiAzgt_LyLc6zqr5_CzMXX-wFYK_j-lHAuCaSoQoeXdIGE1HTeL0tMKMYTAzFez-VwNxTYgILejYLtHVGJANpChCjhDCuGKgjjv78dmRYFnqMwRJPu3eNHjtXF9pGUbhdB1x7JveVPmGkxxJBKScLowbUAOaJkugJZYbw4rGkTH9L02diyTuMBR6gz6Hti6juMH1wOlDdIyqRw',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(this.state),
        })
        /* .then(res => res.json()) */
        .then(res => console.log(res))
        .catch(err => console.warn(err));
    }
    render() {
        const { username, password } = this.state;
        return (
            <ScrollView contentContainerStyle={{ flex: 1, width: '90%', justifyContent: 'center', alignSelf: 'center' }}>
                <View style={{ marginBottom: 50 }}>
                    <Text style={{ fontSize: 32, textAlign: 'center' }}>Sign In</Text>
                </View>
                <View>
                    <View style={styles.input}>
                        <FontAwesomeIcon icon={faUser} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                        <TextInput placeholder='Username' textContentType='username' value={username} onChangeText={text => this.setState({ username: text })} />
                    </View>
                    <View style={styles.input}>
                        <FontAwesomeIcon icon={faLock} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                        <TextInput placeholder='Password' textContentType='password' secureTextEntry value={password} onChangeText={text => this.setState({ password: text })} />
                    </View>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
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