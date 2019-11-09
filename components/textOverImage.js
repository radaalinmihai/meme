import React from 'react';
import {Text, View, PanResponder, Animated} from 'react-native';

export default class TextOverImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: 20
    };

    this.animatedText = new Animated.ValueXY();
    this._value = {x: 0, y: 0};
    this.animatedText.addListener((value) => (this._value = value));
    this.pan = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animatedText.setOffset({
          x: 0,
          y: this._value.y
        });
        this.animatedText.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dy: this.animatedText.y,
        },
      ]),
    });
  }
  render() {
    const {fontSize} = this.state;
    return (
      <Animated.View
        {...this.pan.panHandlers}
        style={[this.animatedText.getTranslateTransform(), {width: '100%', backgroundColor: 'rgba(0, 0, 0, .5)'}]}>
        <Text
          style={{
            fontSize: fontSize,
            color: 'white',
            textAlign: 'center'
          }}>
          {this.props.children}
        </Text>
      </Animated.View>
    );
  }
}
