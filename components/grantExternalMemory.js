import {PermissionsAndroid} from 'react-native';

async function requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Meme requests storage permission',
                message: 'Meme needs access to your storage in order to locally store your meme'
            }
        );
        return granted;
    } catch(err) {
        console.error(err);
        return null;
    }
};

export default requestCameraPermission;