import React from 'react';
import {Text, View, Animated, PanResponder} from 'react-native';

export default class TextOverImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastScale: 1,
    };
    this.text = new Animated.ValueXY();
    this.fixDrag = {x: 0, y: 0};
    this.lastScale = 1;
    this.distant = 150;
    this.scaleValue = new Animated.Value(1);
    this.text.addListener(value => (this.fixDrag = value));
    this.pan = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (event, gestureState) =>
        Math.abs(gestureState.dx) > 2 ||
        Math.abs(gestureState.dy) > 2 ||
        gestureState.numberActiveTouches > 2,
      onPanResponderGrant: (event, gestureState) => {
        if (gestureState.numberActiveTouches === 2)
          this.distant = this.getDistance(
            event.nativeEvent.touches[0],
            event.nativeEvent.touches[1],
          );
        this.text.setOffset({
          x: this.fixDrag.x,
          y: this.fixDrag.y,
        });
        this.text.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (event, gestureState) => {
        Animated.event([
          null,
          {
            dx: this.text.x,
            dy: this.text.y,
          },
        ])(event, gestureState);
        let {touches} = event.nativeEvent;
        if (gestureState.numberActiveTouches === 2) {
          let distant = this.getDistance(touches[0], touches[1]);
          this.scaleValue.setValue((distant / this.distant) * this.lastScale);
        }
      },
      onPanResponderEnd: (event, gestureState) => {
        this.lastScale = this.scaleValue._value;
      },
    });
    this.transformSettings = {
      transform: [
        {scale: this.scaleValue},
        {perspective: 200},
        ...this.text.getTranslateTransform(),
      ],
    };
  }
  getDistance = (a, b) => {
    let dx = Math.abs(a.pageX - b.pageX),
      dy = Math.abs(a.pageY - b.pageY),
      distant = Math.sqrt(dx * dx + dy * dy);
    return distant;
  };
  render() {
    return (
      <Animated.Text
        {...this.pan.panHandlers}
        style={[{fontSize: 30}, this.transformSettings]}>
        {this.props.children}
      </Animated.Text>
    );
  }
}
