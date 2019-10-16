import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        padding: 1,
        paddingLeft: 10, 
        borderWidth: 1, 
        borderRadius: 4,
        marginBottom: 10,
        flexDirection: 'row',
    },
    w90: {
        width: '90%',
    },
    principalButtons: {
        backgroundColor: '#059c5d', 
        padding: 10, 
        borderRadius: 4,
    },
    flexCenter: { 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
    },
    card: { 
        width: '85%', 
        height: '85%',
        position: 'absolute',
        top: '5%',
    },
    reactionEmojis: { 
        margin: 40,
        padding: 6
    }
});

export default styles;