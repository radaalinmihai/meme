import React from 'react';
import { View, Text, TouchableNativeFeedback, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

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
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <View style={{ padding: 20, flexDirection: 'row', borderBottomColor: '#d4d4d4', borderBottomWidth: 1 }}>
                        <TouchableNativeFeedback>
                            <View style={{ borderColor: 'black', borderWidth: 2, borderRadius: 25, overflow: 'hidden', width: 52, height: 52, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faUserTie} size={32} />
                            </View>
                        </TouchableNativeFeedback>
                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginLeft: 10 }}>
                            <Text style={{ alignSelf: 'center' }}>PewDiePie</Text>
                            <View style={{ backgroundColor: '#009cff', marginLeft: 5, borderRadius: 10, padding: 5, alignSelf: 'center' }}>
                                <Text style={{ color: '#e3e3e3' }}>Master MEMER</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableNativeFeedback>
                        <View style={{ padding: 20 }}>
                            <Text>Memes</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={{ padding: 20 }}>
                            <Text>Badges</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={{ padding: 20 }}>
                            <Text>Statistics</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <TouchableNativeFeedback onPress={this.signOut}>
                    <View style={{ padding: 20, width: '100%', borderTopColor: '#d4d4d4', borderTopWidth: 1 }}>
                        <Text style={{ textAlign: 'center', color: '#cf0000' }}>Sign out</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}