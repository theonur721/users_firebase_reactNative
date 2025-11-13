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
import {COLORS} from '../../utils/colors';

import JobsItem from '../../components/jobs/jobsItem';

const Jobs = ({route}) => {
  const [jobs, setJobs] = useState([]);
  const {form} = route.params;
  const [pending, setPending] = useState(false);

  const getJobs = async () => {
    setPending(true);
    const jobs = await firestore().collection('Jobs').get();
    const data = jobs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setJobs(data);
    setPending(false);
  };

  useEffect(() => {
    getJobs();
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
            ListEmptyComponent={
              <Text style={styles.notuser}>No users added yet</Text>
            }
            keyExtractor={item => item?.id}
            data={jobs}
            renderItem={({item}) => <JobsItem item={item} form={form} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Jobs;

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
