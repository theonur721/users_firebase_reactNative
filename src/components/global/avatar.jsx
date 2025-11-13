import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getInitials} from '../../utils/functions';
import {COLORS} from '../../utils/colors';

const Avatar = ({name, surname, size = 60}) => {
  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Text style={styles.text}>{getInitials(name, surname)}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.grey,
    width: 60,
    height: 60,
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
  },
});
