import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Avatar from '../../components/global/avatar';
import {COLORS} from '../../utils/colors';

const UserDetail = ({route, navigation}) => {
  const userId = route.params.userId;
  const [user, setUser] = useState({});
  const [pending, setPending] = useState(false);

  const getUser = async () => {
    setPending(true);
    const user = await firestore().collection('Users').doc(userId).get();
    setUser(user.data());
    setPending(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {pending ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View>
          <View style={styles.avatarContainer}>
            <Avatar size={100} name={user?.name} surname={user?.surname} />

            <Text style={[styles.text, {marginVertical: 10, fontSize: 16}]}>
              {user?.email}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.text}>{user?.name}</Text>
            <Text style={styles.label}>Surname</Text>
            <Text style={styles.text}>{user?.surname}</Text>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.text}>{user?.age}</Text>
            <Text style={styles.label}>Job</Text>
            <Text style={styles.text}>{user?.job?.title ?? '-'}</Text>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.text}>{user?.phone}</Text>
            <Text style={styles.label}>Language</Text>
            <Text style={styles.text}>{user?.language}</Text>
            <Text style={styles.label}>City</Text>
            <Text style={styles.text}>{user?.city}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    color: COLORS.gray,
    fontSize: 15,
    marginTop: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
