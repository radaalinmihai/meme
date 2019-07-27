import React from 'react';
import { View, Text, Image, Dimensions, PanResponder, Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../style';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null
        };

        this.pan = new Animated.ValueXY();

        this._value = { x: 0, y: 0 };

        this.pan.addListener(value => this._value = value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {
                dx: this.pan.x,
            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(
                    this.pan,
                    { toValue: { x: 0, y: 0 } }
                ).start();
            }
        })

    }
    insert = async () => await AsyncStorage.setItem('token', 'asdasd');
    async componentDidMount() {
        try {
            const loggedIn = await AsyncStorage.getItem('token');
            if (loggedIn !== null) {
                this.setState({
                    token: loggedIn
                });
            } else {
                this.props.navigation.navigate('Login');
            }
        } catch (error) {
            console.warn(error);
        }
    }
    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <View style={{ flex: 1, position: 'relative', justifyContent: 'center' }}>
                {/* <View style={[styles.card, { transform: [{ rotate: '5deg' }] }]}>
                    <Image source={require('../assets/may.jpg')} style={{ width: '100%', height: '100%' }} resizeMode='stretch' />
                </View>
                <View style={[styles.card, { transform: [{ rotate: '-5deg' }] }]}>
                    <Image source={require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg')} style={{ width: '100%', height: '100%' }} resizeMode='stretch' />
                </View> */}
                <View style={{ alignSelf: 'center', width: '100%', height: '100%' }}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[styles.card, this.pan.getLayout()]}>
                        <Image source={require('../assets/14o4xh.jpg')} style={{ width: '100%', height: '100%' }} resizeMode='stretch' />
                    </Animated.View>
                </View>
            </View>
        );
    }
}