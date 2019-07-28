import React from 'react';
import { Image, Dimensions, PanResponder, Animated } from 'react-native';
import styles from '../style';

export default class MemeCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };

        this.pan = new Animated.ValueXY();

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {
                dx: this.pan.x,
            }]),
            onPanResponderRelease: (e, gesture) => {
                const { width } = Dimensions.get('window');
                console.log(gesture.moveX);
                if (gesture.moveX < width - 80) {
                    Animated.spring(
                        this.pan,
                        { toValue: { x: 0, y: 0 } }
                    ).start();
                } else {
                    Animated.spring(
                        this.pan,
                        { toValue: { x: 420, y: 0 } }
                    ).start();
                }
            }
        });
    }
    componentDidMount = () => {
        if(this.props.transform) {
            this.setState({
                value: Math.round(Math.random() * (5 - (-5)) + (-5))
            });
        }
    }
    render() {
        console.log(this.state.value);
        const { meme } = this.props,
              { value } = this.state;
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[this.pan.getLayout(), styles.card, { transform: [{ rotate: `${value}deg` }] }]}>
                <Image source={meme.image} style={{ width: '100%', height: '100%' }} resizeMode='stretch' />
            </Animated.View>
        )
    }
}