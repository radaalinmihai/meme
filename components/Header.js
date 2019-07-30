import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';

export default class Header extends React.Component {
    render() {
        return (
            <View style={{ padding: 20 }}>
                <TouchableNativeFeedback>
                    <View style={{ padding: 10, width: 40 }}>
                        <View style={{ borderWidth: 1, borderColor: 'black', width: 20, marginBottom: 3 }}></View>
                        <View style={{ borderWidth: 1, borderColor: 'black', width: 10, marginBottom: 3 }}></View>
                        <View style={{ borderWidth: 1, borderColor: 'black', width: 15 }}></View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}