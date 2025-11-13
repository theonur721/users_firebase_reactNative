import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {EmojiSad} from 'iconsax-react-nativejs';
import {COLORS} from '../../utils/colors';

const NotUser = () => {
  return (
    <View style={styles.container}>
      <EmojiSad size="40" color={COLORS.red} />
      <Text style={styles.text}>No users added yet!</Text>
    </View>
  );
};

export default NotUser;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: COLORS.grey,
    padding: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
});
