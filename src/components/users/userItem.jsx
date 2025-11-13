import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/colors';
import {ConvertFullName} from '../../utils/functions';
import Avatar from '../global/avatar';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../utils/routes';
import {Edit2, Trash} from 'iconsax-react-nativejs';
import firestore from '@react-native-firebase/firestore';

const UserItem = ({item}) => {
  const navigation = useNavigation();

  const deleteFormUser = async job => {
    await firestore()
      .collection('Users')
      .doc(item.id)
      .delete()
      .then(() => {
        Alert.alert(' User deleted! ✅');
        navigation.navigate(ROUTES.USERS);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Pressable
      onPress={() => navigation.navigate(ROUTES.USERDETAIL, {userId: item.id})}
      style={styles.container}>
      <View>
        <Avatar name={item.name} surname={item.surname} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {ConvertFullName(item?.name, item?.surname)}
        </Text>
        <Text style={styles.email}>{item?.email}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate(ROUTES.UPDATEUSER, {userInfo: item})
          }>
          <Edit2 color={COLORS.gray} size={22} />
        </Pressable>
        <Pressable onPress={deleteFormUser}>
          <Trash color={COLORS.red} size={22} />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default UserItem;

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
    flex: 1,
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
  iconContainer: {
    flexDirection: 'row',
    gap: 5,
  },
});
