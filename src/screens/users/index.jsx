import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import UserItem from '../../components/users/userItem';
import {COLORS} from '../../utils/colors';
import NotUser from '../../components/global/notUser';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);

    // 🔴 Realtime listener: add / delete / update hepsini anında yakalar
    const unsubscribe = firestore()
      .collection('Users')
      .onSnapshot(
        snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(data);
          setPending(false);
        },
        error => {
          console.log(error);
          setPending(false);
        },
      );

    // cleanup
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        {pending ? (
          <View style={styles.pendingContainer}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <FlatList
            ListEmptyComponent={<NotUser />}
            keyExtractor={item => item?.id}
            data={users}
            renderItem={({item}) => <UserItem item={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    flex: 1,
  },
  pendingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notuser: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 15,
  },
});
