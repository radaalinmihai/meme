import React from 'react';
import { View, Text, TouchableNativeFeedback, Alert } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Drawer extends React.Component {
    signOut = () => Alert.alert(
        'Sign out', 
        'Are you sure you want to sign out?',
        [
            {
                text: 'No', 
                onPress: () => console.log('stay logged in'),
            },
            {
                text: 'Yes',
                onPress: () => console.log('logged out'),
            }
        ], { cancelable: true }
        );
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#383838' }}>
                <View>
                    <View style={{ padding: 8, flexDirection: 'row', backgroundColor: '#2b2b2b' }}>
                        <AwesomeIcon.Button backgroundColor='#2b2b2b' onPress={() => console.log('hehe')} name='user-circle' size={40} color='white'>
                            PewDiePie
                        </AwesomeIcon.Button>
                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginLeft: 10 }}>
                            <View style={{ backgroundColor: '#009cff', marginLeft: 5, borderRadius: 10, padding: 5, alignSelf: 'center' }}>
                                <Text style={{ color: '#e3e3e3' }}>Master MEMER</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableNativeFeedback>
                        <View style={{ padding: 20 }}>
                            <Text style={{ color: 'white' }}>Memes</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={{ padding: 20 }}>
                            <Text style={{ color: 'white' }}>Badges</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={{ padding: 20 }}>
                            <Text style={{ color: 'white' }}>Statistics</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <TouchableNativeFeedback onPress={this.signOut}>
                    <View style={{ padding: 15.5, width: '100%', backgroundColor: '#2b2b2b' }}>
                        <Text style={{ textAlign: 'center', color: '#ff1717' }}>Sign out</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}