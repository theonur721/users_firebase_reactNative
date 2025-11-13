import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/colors';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../utils/routes';

const UpdateUser = ({route}) => {
  const navigation = useNavigation();
  const [pending, setPending] = useState(false);
  const {userInfo} = route.params;

  const [form, setForm] = useState({
    name: userInfo.name,
    surname: userInfo.surname,
    age: userInfo.age,
    city: userInfo.city,
    phone: userInfo.phone,
    email: userInfo.email,
    language: userInfo.language,
    //job: '',
  });

  const handleChange = (key, value) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const updateFormUser = async job => {
    await firestore()
      .collection('Users')
      .doc(userInfo.id)
      .update({...form, job: userInfo.job})
      .then(() => {
        Alert.alert(' User updated! ✅');
        navigation.navigate(ROUTES.USERS);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={form.name}
        onChangeText={text => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="surname"
        value={form.surname}
        onChangeText={text => handleChange('surname', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="age"
        value={form.age}
        onChangeText={text => handleChange('age', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="city"
        value={form.city}
        onChangeText={text => handleChange('city', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="phone"
        value={form.phone}
        onChangeText={text => handleChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="language"
        value={form.language}
        onChangeText={text => handleChange('language', text)}
      />
      {/*<TextInput
        style={styles.input}
        placeholder="job"
        value={form.job}
        onChangeText={text => handleChange('job', text)}
      />*/}
      <Button title="Update" onPress={updateFormUser} />
    </View>
  );
};

export default UpdateUser;

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
});
