import React from 'react';
import { View, Text, Image, Dimensions, PanResponder, Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MemeCard from '../components/MemeCard';
import styles from '../style';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null,
            memes: [
                {
                    image: require('../assets/may.jpg')
                },
                {
                    image: require('../assets/i-dont-always-but-when-i-do-meme_thumb.jpg')
                },
                {
                    image: require('../assets/14o4xh.jpg')
                }
            ]
        };
    }
    insert = async () => await AsyncStorage.setItem('token', 'asdasd');
    async componentDidMount() {
        try {
            const loggedIn = await AsyncStorage.getItem('token');
            if (loggedIn !== null) {
                this.setState({
                    token: loggedIn
                });
            } else {
                this.props.navigation.navigate('Login');
            }
        } catch (error) {
            console.warn(error);
        }
    }
    render() {
        const { memes } = this.state;
        return (
            <View style={{ flex: 1, position: 'relative', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center' }}>
                {memes.map((meme, i) => {
                    const transform = i % 2 !== 0 ? true : false
                    return <MemeCard transform={transform} meme={meme} key={i} />;
                }
                )}
            </View>
        );
    }
}