import React from 'react';
import { View, Text } from 'react-native';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

const tokenProvider = new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d7a738e9-d9a1-47a2-ac3a-e4ddc5b6e59c/token' });
console.log(tokenProvider);

const chatManager = new ChatManager({
    instanceLocator: 'v1:us1:d7a738e9-d9a1-47a2-ac3a-e4ddc5b6e59c',
    userId: 'Mihai',
    tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d7a738e9-d9a1-47a2-ac3a-e4ddc5b6e59c/token' }),
});
console.log(chatManager);

export default class MessagesScreen extends React.Component {
    componentDidMount = () => {
        /* chatManager.connect()
            .then(currentUser => console.log(currentUser))
            .catch(err => console.warn(err)); */
    }
    render() {
        return (
            <View>
                <Text>MessagesScreen</Text>
            </View>
        );
    }
}