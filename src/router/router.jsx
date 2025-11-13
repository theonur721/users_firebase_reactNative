import {Alert, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../utils/routes';
import Users from '../screens/users';
import Jobs from '../screens/jobs';
import UserDetail from '../screens/users/userDetail';
import {AddCircle, Logout} from 'iconsax-react-nativejs';
import AddUser from '../screens/users/addUser';
import {COLORS} from '../utils/colors';
import UpdateUser from '../screens/users/updateUser';
import SignIn from '../screens/auth/signIn';
import SignUp from '../screens/auth/signUp';
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const Router = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const handleSignOut = () => {
    firebaseSignOut(getAuth())
      .then(() => Alert.alert('User signed out!'))
      .catch(err => console.log(err));
  };

  const handleAuthStateChanged = u => {
    setUser(u);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const sub = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return sub;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name={ROUTES.SIGNIN} component={SignIn} />
        <Stack.Screen name={ROUTES.SIGNUP} component={SignUp} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.USERS}
        component={Users}
        options={({navigation}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', gap: 5}}>
              <Pressable onPress={() => navigation.navigate(ROUTES.ADDUSER)}>
                <AddCircle size={30} color={COLORS.green} variant="Bold" />
              </Pressable>

              <Pressable onPress={handleSignOut}>
                <Logout size={30} color={COLORS.red} variant="Bold" />
              </Pressable>
            </View>
          ),
        })}
      />

      <Stack.Screen name={ROUTES.JOBS} component={Jobs} />
      <Stack.Screen name={ROUTES.USERDETAIL} component={UserDetail} />
      <Stack.Screen name={ROUTES.ADDUSER} component={AddUser} />
      <Stack.Screen name={ROUTES.UPDATEUSER} component={UpdateUser} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
