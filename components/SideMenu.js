import React from 'react';
import { View, Text, Dimensions, TouchableNativeFeedback, Animated, PanResponder } from 'react-native';

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        const { width } = Dimensions.get('window');
        this.menu = new Animated.ValueXY();
        this.menuBackground = new Animated.Value(.6);
        this.pan = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                if(gesture.dx < 0) {
                    Animated.parallel(
                        Animated.event([null, {
                            dx: this.menu.x
                        }])(e, gesture),
                        Animated.spring(
                            this.menuBackground,
                            { toValue: this.menu.x.interpolate({
                                inputRange: [-width / 2 + 50, 0],
                                outputRange: [0, .6],
                            }) }
                        )
                    );
                    console.log(this.menuBackground)
                }
            },
            onPanResponderRelease: (e, gesture) => {
                Animated.timing(
                    this.menu,
                    { toValue: { x: 0, y: 0 } },
                ).start();
            },
        });
    }
    render() {
        const { height, width } = Dimensions.get('window');
        const transform = {
            transform: this.menu.getTranslateTransform()
        }
        return (
            <React.Fragment>
                <Animated.View 
                    {...this.pan.panHandlers}
                    style={[transform, { position: 'absolute', top: 0, left: 0, backgroundColor: 'white', height: height, width: '95%', zIndex: 10, justifyContent: 'center', alignItems: 'center' }]}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        useForeground
                    >
                        <View>
                            <Text style={{ fontSize: 27 }}>Your memes</Text>
                        </View>
                    </TouchableNativeFeedback>
                </Animated.View>
                <Animated.View style={{ top: 0, left: 0, position: 'absolute', width: width, height: height, backgroundColor: `rgba(0, 0, 0, ${this.menuBackground})`, zIndex: 9 }}></Animated.View>
            </React.Fragment>
        );
    }
}