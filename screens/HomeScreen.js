import React from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MemeCard from '../components/MemeCard';
import Header from '../components/Header';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      memes: [
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
  insert = async () => await AsyncStorage.setItem('token', 'asdasd');
  remove = async () => await AsyncStorage.removeItem('token');
  increaseCards = () =>
    this.state.imageCount < this.state.memes.length
      ? this.setState({imageCount: this.state.imageCount + 1})
      : null; // scoate asta daca nu iti place tranzitia aia de la setState
  openDrawer = () => this.props.navigation.openDrawer();
  render() {
    const {memes, imageCount} = this.state;
    return (
      <React.Fragment>
        <Header
          openDrawer={this.openDrawer}
          navigation={this.props.navigation}
        />
        <View
          style={{
            flex: 1,
            position: 'relative',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: '#242424',
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
      </React.Fragment>
    );
  }
}
