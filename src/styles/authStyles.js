import {StyleSheet} from 'react-native';
import {WHITE} from './colors';

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '30%',
    alignSelf: 'center',
    height: '30%',
    width: '90%',
  },
  formWrapper: {
    marginTop: '10%',
  },
  text: {
    color: WHITE,
  },
  subtext: {
      color: WHITE,
      alignSelf: 'center'
  }
});

export default authStyles;
