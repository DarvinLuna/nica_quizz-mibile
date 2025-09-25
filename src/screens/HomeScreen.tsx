import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextView from '../components/TextView';
import {colors} from '../constants/colors';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TextView text="Home Screen" style={styles.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

