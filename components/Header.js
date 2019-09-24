import React from 'react';
import { View, TouchableNativeFeedback, Image, StatusBar } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

class Header extends React.Component {
    render() {
        return (
            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#2b2b2b' }}>
                <StatusBar barStyle='light-content' backgroundColor='#212121' />
                <TouchableNativeFeedback onPress={this.props.navigation.openDrawer}>
                    <AntIcon name='menu-unfold' color='white' size={32} />
                </TouchableNativeFeedback>
                <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Messages')}>
                        <AntIcon name='notification' style={{ marginRight: 30 }} color='white' size={32} />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Messages')}>
                        <AntIcon name='message1' style={{ marginRight: 30 }} color='white' size={32} />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Profile')}>
                        <AwesomeIcon name='user-circle' size={32} color='white' />
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}

export default withNavigation(Header);