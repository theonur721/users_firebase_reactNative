import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/colors';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../utils/routes';

const SignUp = () => {
  const navigation = useNavigation();
  const [pending, setPending] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (key, value) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const handleRegisterStep = () => {
    setPending(true);
    createUserWithEmailAndPassword(getAuth(), form.email, form.password)
      .then(() => {
        console.log('User account signed up!');
        Alert.alert(
          'Success',
          'Your account has been created successfully! ✅ 🎉',
        );
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => setPending(false));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/userslogo.png')}
        style={styles.iconImg}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={form.password}
        secureTextEntry
        onChangeText={text => handleChange('password', text)}
      />

      <Button
        disabled={pending}
        title="Register"
        onPress={handleRegisterStep}
      />
      <View style={styles.haventAccountText}>
        <Text>Do have an account ? </Text>
        <Button
          title="SignIn"
          onPress={() => navigation.navigate(ROUTES.SIGNIN)}
        />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10,
    paddingTop: 20,
  },
  input: {
    backgroundColor: COLORS.grey,
    marginVertical: 8,
    padding: 10,
    fontWeight: '500',
    fontSize: 18,
    borderRadius: 6,
    marginHorizontal: 15,
  },
  haventAccountText: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconImg: {
    width: 200,
    height: 200,
    marginVertical: 20,
    marginHorizontal: 'auto',
  },
});
