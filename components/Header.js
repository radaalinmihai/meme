import React from 'react';
import { View, TouchableNativeFeedback, Dimensions, Animated, PanResponder, TouchableWithoutFeedback } from 'react-native';
import SideMenu from './SideMenu';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        const { width } = Dimensions.get('window');
        /* this.state = {
            menu: new Animated.ValueXY({ x: -width, y: 0 }),
        }; */
        this.menu = new Animated.ValueXY({ x: -width, y: 0 });
        this._value = { x: -width, y: 0 };
        this.menu.addListener(value => this._value = value);
        this.pan = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            /* onPanResponderGrant: (e, gesture) => {
                this.menu.setOffset({
                    x: this._value.x,
                    y: this._value.y,
                });
                this.menu.setValue({ x: -width, y: 0 });
            }, */
            onPanResponderMove: (e, gesture) => {
                if (gesture.dx < 0) {
                    Animated.event([null, {
                        dx: this.menu.x
                    }])(e, gesture);
                }
            },
            onPanResponderRelease: (e, gesture) => {
                if(gesture.dx < -165)
                    this.hideMenu();
                else
                    Animated.timing(
                        this.menu,
                        { toValue: { x: 0, y: 0 } },
                    ).start();
            },
        });
    }
    showMenu = () => Animated.timing(this.menu, { toValue: { x: 0, y: 0 } }).start();
    hideMenu = () => Animated.timing(this.menu, { toValue: { x: -Dimensions.get('window').width, y: 0 } }).start();
    render() {
        const { width, height } = Dimensions.get('window');
        let color = this.menu.x.interpolate({
            inputRange: [-width, 0],
            outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .6)'],
        });
        let index = this.menu.x.interpolate({
            inputRange: [-width, 0],
            outputRange: [-1, 9]
        });
        console.log(index);
        return (
            <React.Fragment>
                <Animated.View onPress={this.hideMenu} style={{ padding: 20, position: 'relative' }}>
                    <TouchableNativeFeedback onPress={this.showMenu}>
                        <View style={{ padding: 10, width: 40 }}>
                            <View style={{ borderWidth: 1, borderColor: 'black', width: 20, marginBottom: 3 }}></View>
                            <View style={{ borderWidth: 1, borderColor: 'black', width: 10, marginBottom: 3 }}></View>
                            <View style={{ borderWidth: 1, borderColor: 'black', width: 15 }}></View>
                        </View>
                    </TouchableNativeFeedback>
                    <SideMenu menu={this.menu} pan={this.pan} />
                    <TouchableWithoutFeedback onPress={this.hideMenu}>
                        <Animated.View style={{ position: 'absolute', width: width, height: height, backgroundColor: color, zIndex: index }}></Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </React.Fragment>
        );
    }
}