import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#6e6e6e', 
        borderWidth: 1, 
        borderRadius: 4,
        marginBottom: 10,
        /* padding: 20, */
        flex: 1,
        alignItems: 'center',
    },
    w90: {
        width: '90%',
    },
    flexCenter: { 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: "column"
    }
});

export default styles;