import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle, faComment } from '@fortawesome/free-solid-svg-icons';

export default class Header extends React.Component {
    render() {
        return (
            <View style={{ padding: 20, flexDirection: 'row' }}>
                <TouchableNativeFeedback onPress={this.props.openDrawer}>
                    <View style={{ padding: 10, width: 40 }}>
                        <View style={{ borderWidth: 1, borderColor: 'black', width: 20, marginBottom: 3 }}></View>
                        <View style={{ borderWidth: 1, borderColor: 'black', width: 10, marginBottom: 3 }}></View>
                        <View style={{ borderWidth: 1, borderColor: 'black', width: 15 }}></View>
                    </View>
                </TouchableNativeFeedback>
                <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Messages')}>
                        <FontAwesomeIcon icon={faComment} style={{ marginRight: 10 }} size={30} />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Profile')}>
                        <FontAwesomeIcon icon={faUserCircle} size={30} />
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}