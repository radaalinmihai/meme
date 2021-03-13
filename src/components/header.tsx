import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { StackHeaderProps } from "@react-navigation/stack";

export default function Header({navigation}: StackHeaderProps): JSX.Element {
  const goToProfile = () => navigation.push('Profile');
  return (
    <View style={styles.container}>
      {navigation.canGoBack() ? <MaterialIcon onPress={() => navigation.goBack()} name='arrow-back-ios' color='white' size={40} /> :<MaterialIcon name="add" color="white" size={40} />}
      {!navigation.canGoBack() && <MaterialIcon onPress={goToProfile} name="account-circle" color="white" size={40} />}
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
