import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        padding: 1,
        paddingLeft: 10,
        borderColor: '#6e6e6e', 
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
        padding: 10, 
        borderColor: 'black', 
        backgroundColor: 'white', 
        borderWidth: 2, 
        borderRadius: 4, 
        width: '65%', 
        height: '70%',
        position: 'absolute',
    },
    reactionEmojis: {
        color: '#f3ff08', 
        backgroundColor: 'black', 
        borderRadius: 25, 
        margin: 20,
    }
});

export default styles;