import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        padding: 1,
        paddingLeft: 10,
        borderColor: '#cccccc', 
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
        height: '90%',
        position: 'absolute',
        borderRadius: 20,
    },
    reactionEmojis: { 
        margin: 40,
        borderRadius: 50,
        backgroundColor: 'black',
        padding: 6
    }
});

export default styles;