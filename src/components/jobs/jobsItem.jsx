import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../utils/routes';
import firestore from '@react-native-firebase/firestore';
const JobItem = ({item, form}) => {
  const navigation = useNavigation();
  const addFormUser = async job => {
    await firestore()
      .collection('Users')
      .add({...form, job: item})
      .then(() => {
        Alert.alert(' User added! ✅');
        navigation.navigate(ROUTES.USERS);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Pressable onPress={() => addFormUser(item)} style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{item?.title}</Text>
        <Text style={styles.email}>{item?.sub}</Text>
      </View>
    </Pressable>
  );
};

export default JobItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  nameContainer: {
    gap: 5,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },

  index: {
    fontSize: 30,
    marginRight: 15,
  },
  email: {
    fontSize: 14,
    color: COLORS.gray,
  },
});
