import React from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { GiftedChat } from 'react-native-gifted-chat';

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d7a738e9-d9a1-47a2-ac3a-e4ddc5b6e59c/token';
const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:d7a738e9-d9a1-47a2-ac3a-e4ddc5b6e59c';
const CHATKIT_ROOM_ID = '31266580';
const CHATKIT_USER_NAME = 'Mihai';

export default class MessagesScreen extends React.Component {
    state = {
        messages: []
    }
    componentDidMount = () => {
        const chatManager = new ChatManager({
            instanceLocator: CHATKIT_INSTANCE_LOCATOR,
            userId: CHATKIT_USER_NAME,
            tokenProvider: new TokenProvider({ url: CHATKIT_TOKEN_PROVIDER_ENDPOINT }),
        });
        chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser;
                this.currentUser.subscribeToRoom({
                    roomId: CHATKIT_ROOM_ID,
                    hooks: {
                        onMessage: this.onReceive
                    }
                });
            })
            .catch(err => console.warn(err));
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: "I think we passed the first step of the tutorial. We will now need a Pusher account!",
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: "React Native",
                        avatar: "https://placeimg.com/140/140/any"
                    }
                }
            ]
        });
    }
    onReceive = data => {
        const { id, senderId, text, createdAt } = data;
        const incomingMessage = {
            _id: id,
            text: text,
            createdAt: new Date(createdAt),
            user: {
                _id: senderId,
                name: senderId,
                avatar:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA',
            },
        };

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, incomingMessage),
        }));
    }
    onSend = (messages = []) => {
        messages.forEach(message => {
            this.currentUser
                .sendMessage({
                    text: message.text,
                    roomId: CHATKIT_ROOM_ID,
                })
                .then(() => { })
                .catch(err => {
                    console.log(err);
                });
        });
    }
    render() {
        return <GiftedChat
            messages={this.state.messages} 
            onSend={message => this.onSend(message)} user={{
                _id: CHATKIT_USER_NAME
            }} />
    }
}