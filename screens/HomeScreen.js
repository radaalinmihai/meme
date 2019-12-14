import React from 'react';
import {View, StatusBar} from 'react-native';
import MemeCard from '../components/MemeCard';
import Header from '../components/Header';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Orientation from 'react-native-orientation';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      memes: [
        require('../assets/ReactNative-snapshot-image495931964.jpg'),
        require('../assets/may.jpg'),
        require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/may.jpg'),
        require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/may.jpg'),
        require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/may.jpg'),
        require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/may.jpg'),
        require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/may.jpg'),
        require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/may.jpg'),
        require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/14o4xh.jpg'),
        require('../assets/may.jpg'),
        require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg'),
        require('../assets/14o4xh.jpg'),
      ],
      imageCount: 4,
    };
  }
  componentDidMount = () => Orientation.lockToPortrait();
  increaseCards = () =>
    this.state.imageCount < this.state.memes.length
      ? this.setState({imageCount: this.state.imageCount + 1})
      : null; // scoate asta daca nu iti place tranzitia aia de la setState
  render() {
    const {memes, imageCount} = this.state;
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#212121" />
        <Header />
        <View
          style={{
            backgroundColor: '#242424',
            height: '90%',
            justifyContent: 'center',
          }}>
          <View
            style={{
              position: 'relative',
              alignItems: 'center',
              width: '100%',
              height: '95%',
            }}>
            {memes
              .slice(0, imageCount)
              .map((meme, i) => (
                <MemeCard
                  increaseCards={this.increaseCards}
                  meme={meme}
                  key={i}
                />
              ))
              .reverse()}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              bottom: 20,
            }}>
            <Awesome5Icon name="grin-squint-tears" size={40} color="#00ff00" />
            <Awesome5Icon name="sad-tear" size={40} color="#d40000" />
            <Awesome5Icon name="heart" size={40} color="red" />
          </View>
        </View>
      </React.Fragment>
    );
  }
}
