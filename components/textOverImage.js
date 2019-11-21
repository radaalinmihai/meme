import React from 'react';
import {
  Text,
  View,
  PanResponder,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

export default class TextOverImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: 20,
    };

    const {texts} = this.props;
    const {height} = Dimensions.get('window'),
      proc = height * (11 / 100);

    this.animatedText = new Animated.ValueXY({x: 0, y: texts.y});
    this._value = {x: 0, y: texts.y};
    this.animatedText.addListener(value => (this._value = value));
    this.pan = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animatedText.setOffset({
          x: 0,
          y: this._value.y,
        });
        this.animatedText.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (event, gestureState) => {
        if (event.nativeEvent.pageY > proc)
          Animated.event([
            null,
            {
              dy: this.animatedText.y,
            },
          ])(event, gestureState);
      },
      onPanResponderRelease: (event, gestureState) => {
        this.props.keep(this.props.index, this._value.y);
        console.log(event.nativeEvent);
      },
    });
  }
  initEditText = () => this.props.initEditText(this.props.index, this.props.texts.text);
  render() {
    const {fontSize} = this.state,
      {texts} = this.props;
    return (
      <Animated.View
        {...this.pan.panHandlers}
        style={[
          this.animatedText.getTranslateTransform(),
          {width: '100%', backgroundColor: 'rgba(0, 0, 0, .5)'},
        ]}>
        <TouchableWithoutFeedback onPress={this.initEditText}>
          <Text
            style={{
              fontSize: fontSize,
              color: 'white',
              textAlign: 'center',
            }}>
            {texts.text}
          </Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}
