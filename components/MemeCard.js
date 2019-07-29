import React from 'react';
import { Image, Dimensions, PanResponder, Animated } from 'react-native';
import styles from '../style';

export default class MemeCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
        const { width } = Dimensions.get('window');
        this.pan = new Animated.ValueXY();

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                Animated.event([null, {
                    dx: this.pan.x,
                }])(e, gesture);
            },
            onPanResponderRelease: (e, gesture) => {
                let x = 0;
                if (gesture.dx > 120) {
                    x = width + 10;
                } else if (gesture.dx < -120) {
                    x = -width - 10;
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
        console.log(transform);
        return transform;
    }
    render() {
        console.log(this.state.value);
        const { meme } = this.props;
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[styles.card, this.setTransformSettings()]}>
                <Image source={meme.image} style={{ width: '100%', height: '100%' }} resizeMode='stretch' />
            </Animated.View>
        )
    }
}