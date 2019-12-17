import React from 'react';
import {
  ImageBackground,
  Dimensions,
  PanResponder,
  Animated,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../style';
import LinearGradient from 'react-native-linear-gradient';

export default class MemeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: false,
    };

    const {width} = Dimensions.get('window');
    this.pan = new Animated.ValueXY();
    this.laughEmoji = new Animated.Value(0);
    this.angryEmoji = new Animated.Value(0);
    this.favorite = new Animated.Value(1);
    this.rotate = this.pan.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.pan.getTranslateTransform(),
      ],
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

    this._value = {x: 0, y: 0};
    this.pan.addListener(value => (this._value = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (e, gestureState) =>
        Math.abs(gestureState.dy) !== 0,
      onPanResponderGrant: () => {
        this.pan.setOffset({
          x: this._value.x,
          y: this._value.y,
        });
        this.pan.setValue({x: 0, y: 0});
      },
      onPanResponderEnd: () => {
        this.pan.setOffset({
          x: 0,
          y: 0,
        });
      },
      onPanResponderMove: (e, gesture) => {
        Animated.event([
          null,
          {
            dx: this.pan.x,
          },
        ])(e, gesture);
        Animated.spring(this.laughEmoji, {
          toValue: this.pan.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
          }),
        }).start();
        Animated.spring(this.angryEmoji, {
          toValue: this.pan.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp',
          }),
        }).start();
      },
      onPanResponderRelease: (e, gesture) => {
        let x = 0;
        if (gesture.dx > 120) x = width + 50;
        else if (gesture.dx < -120) x = -width - 50;
        Animated.spring(this.pan, {toValue: {x: x, y: 0}}).start();
        if (x !== 0) this.props.increaseCards();
      },
    });
  }
  favoriteIt = () => {
    this.setState(prevState => ({favorite: !prevState.favorite}));
    if (!this.state.favorite) this.animateFavoriteIt();
  };
  animateFavoriteIt = () => {
    Animated.sequence([
      Animated.timing(this.favorite, {
        toValue: 1.2,
        duration: 200,
      }),
      Animated.timing(this.favorite, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();
  };
  render() {
    const {meme} = this.props,
      {favorite} = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => console.log('hey')}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.card, this.rotateAndTranslate]}>
          <ImageBackground
            source={meme}
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
              overflow: 'hidden',
            }}
            imageStyle={{
              borderRadius: 10,
              flex: 1,
              height: null,
              width: null,
              borderColor: '#363636',
              borderWidth: 2,
            }}>
            <LinearGradient
              colors={['rgba(0, 0, 0, .8)', 'rgba(0, 0, 0, .7)', 'transparent']}
              start={{x: 0, y: 0.6}}
              end={{x: 0, y: 1}}
              style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
              <AwesomeIcon name="user-circle-o" size={30} color="white" />
              <View style={{marginLeft: 10}}>
                <Text style={{color: 'white'}}>Name</Text>
                <Text style={{color: 'white'}}>Button follow sau unfollow</Text>
              </View>
            </LinearGradient>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <Animated.View style={{opacity: this.laughEmoji}}>
                <Awesome5Icon
                  style={styles.reactionEmojis}
                  name="grin-squint-tears"
                  size={60}
                  color="#00ff00"
                  solid
                />
              </Animated.View>
              <Animated.View style={{opacity: this.angryEmoji}}>
                <Awesome5Icon
                  style={styles.reactionEmojis}
                  name="sad-tear"
                  size={60}
                  color="#d40000"
                  solid
                />
              </Animated.View>
            </View>
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, .7)', 'rgba(0, 0, 0, .8)']}
              start={{x: 0, y: 0.2}}
              end={{x: 0, y: 0.7}}
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20,
              }}>
              <TouchableNativeFeedback onPress={this.favoriteIt}>
                <Animated.View style={{transform: [{scale: this.favorite}]}}>
                  <Awesome5Icon
                    name="heart"
                    size={35}
                    color={favorite ? '#a60202' : 'white'}
                    solid={favorite}
                  />
                </Animated.View>
              </TouchableNativeFeedback>
            </LinearGradient>
          </ImageBackground>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
