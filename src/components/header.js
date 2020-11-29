import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { DELIMITATOR_COLOR } from '../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function Header() {
  return (
    <View style={styles.container}>
        <MaterialIcon name='add' color='white' size={40} />
        <MaterialIcon name='account-circle' color='white' size={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: DELIMITATOR_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
