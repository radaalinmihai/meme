import React from 'react';
import {Text, View, PanResponder, Animated} from 'react-native';

export default class TextOverImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: 20
    };

    const {texts} = this.props;

    this.animatedText = new Animated.ValueXY({ x: 0, y: texts.y});
    this._value = {x: 0, y: texts.y};
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
      onPanResponderRelease: (event, gestureState) => {
        this.props.keep(this.props.index, this._value.y);
      }
    });
  }
  render() {
    const {fontSize} = this.state,
          {texts} = this.props;
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
          {texts.text}
        </Text>
      </Animated.View>
    );
  }
}
