import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function Header(): JSX.Element {
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
