import React from 'react';
import { ImageBackground, Dimensions, PanResponder, Animated, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGrinSquintTears, faAngry } from '@fortawesome/free-solid-svg-icons';
import styles from '../style';

export default class MemeCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
        const { width } = Dimensions.get('window');
        this.pan = new Animated.ValueXY();
        this.laughEmoji = new Animated.Value(0);
        this.angryEmoji = new Animated.Value(0);

        this._value = { x: 0, y: 0 };
        this.pan.addListener(value => this._value = value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (e, gesture) => {
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
                            inputRange: [0, width / 2 - 50],
                            outputRange: [0, 1],
                            extrapolate: 'clamp'
                        }),
                    }
                ).start();
                Animated.spring(
                    this.angryEmoji,
                    {
                        toValue: this.pan.x.interpolate({
                            inputRange: [-width / 2 + 50, 0],
                            outputRange: [1, 0],
                            extrapolate: 'clamp'
                        }),
                    }
                ).start();
            },
            onPanResponderRelease: (e, gesture) => {
                let x = 0;
                if (gesture.dx > 120) {
                    x = width + 10;
                    this.props.increaseCards();
                } else if (gesture.dx < -120) {
                    x = -width - 10;
                    this.props.increaseCards();
                }
                Animated.spring(
                    this.pan,
                    { toValue: { x: x, y: 0 } }
                ).start();
            }
        });
    }
    componentDidMount = () => {
        if (this.props.transform) {
            this.setState({
                value: Math.round(Math.random() * (5 - (-5)) + (-5))
            });
        }
    }
    setTransformSettings = () => {
        const transform = {
            transform: this.pan.getTranslateTransform()
        };
        transform.transform.push({ 'rotate': `${this.state.value}deg` });
        return transform;
    }
    render() {
        const { meme } = this.props;
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[styles.card, this.setTransformSettings()]}>
                <ImageBackground source={meme} style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'space-between' }} resizeMode='stretch'>
                    <Animated.View style={{ opacity: this.laughEmoji }}>
                        <FontAwesomeIcon icon={faGrinSquintTears} style={styles.reactionEmojis} size={32} />
                    </Animated.View>
                    <Animated.View style={{ opacity: this.angryEmoji }}>
                        <FontAwesomeIcon icon={faAngry} style={styles.reactionEmojis} size={32} />
                    </Animated.View>
                </ImageBackground>
            </Animated.View>
        )
    }
}