import React from 'react';
import { ImageBackground, Dimensions, PanResponder, Animated, Text, View } from 'react-native';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../style';

export default class MemeCard extends React.Component {
    constructor(props) {
        super(props);

        const { width } = Dimensions.get('window');
        this.pan = new Animated.ValueXY();
        this.laughEmoji = new Animated.Value(0);
        this.angryEmoji = new Animated.Value(0);
        this.rotate = this.pan.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp',
        });
        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate,
            },
            ...this.pan.getTranslateTransform()
            ]
        };
        this.nextCardOpacity = this.pan.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp',
        });
        this.nextCardScale = this.pan.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp',
        });

        this._value = { x: 0, y: 0 };
        this.pan.addListener(value => this._value = value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this.pan.setOffset({
                    x: this._value.x,
                    y: this._value.y,
                });
                this.pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderEnd: () => {
                this.pan.setOffset({
                    x: 0,
                    y: 0,
                });
            },
            onPanResponderMove: (e, gesture) => {
                Animated.event([null, {
                    dx: this.pan.x,
                }])(e, gesture);
                Animated.spring(
                    this.laughEmoji,
                    {
                        toValue: this.pan.x.interpolate({
                            inputRange: [-width / 2, 0, width / 2],
                            outputRange: [0, 0, 1],
                            extrapolate: 'clamp'
                        }),
                    }
                ).start();
                Animated.spring(
                    this.angryEmoji,
                    {
                        toValue: this.pan.x.interpolate({
                            inputRange: [-width / 2, 0, width / 2],
                            outputRange: [1, 0, 0],
                            extrapolate: 'clamp'
                        }),
                    }
                ).start();
            },
            onPanResponderRelease: (e, gesture) => {
                let x = 0;
                if (gesture.dx > 120)
                    x = width + 20;
                else if (gesture.dx < -120)
                    x = -width - 20;
                Animated.spring(
                    this.pan,
                    { toValue: { x: x, y: 0 } }
                ).start();
                if(x !== 0)
                    this.props.increaseCards();
            }
        });
    }
    render() {
        const { meme } = this.props;
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[styles.card, this.rotateAndTranslate]}>
                <ImageBackground source={meme} style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 20, flex: 1 }} resizeMode='stretch'>
                    <Animated.View style={{ opacity: this.laughEmoji }}>
                        <Awesome5Icon style={styles.reactionEmojis} name='grin-squint-tears' size={60} color='#00ff00' />
                    </Animated.View>
                    <Animated.View style={{ opacity: this.angryEmoji }}>
                        <Awesome5Icon style={styles.reactionEmojis} name='sad-tear' size={60} color='#d40000' />
                    </Animated.View>
                </ImageBackground>
            </Animated.View>
        )
    }
}