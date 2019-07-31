import React from 'react';
import { View, Text, Dimensions, TouchableNativeFeedback, Animated, PanResponder } from 'react-native';

export default class SideMenu extends React.Component {
    render() {
        const { height } = Dimensions.get('window');
        const transform = {
            transform: this.props.menu.getTranslateTransform()
        };
        return (
            <Animated.View 
                {...this.props.pan.panHandlers}
                style={[transform, { position: 'absolute', top: 0, left: 0, backgroundColor: 'white', height: height, width: '90%', zIndex: 10, justifyContent: 'center', alignItems: 'center' }]}>
                <TouchableNativeFeedback>
                    <View>
                        <Text style={{ fontSize: 27 }}>Your memes</Text>
                    </View>
                </TouchableNativeFeedback>
            </Animated.View>
        );
    }
}