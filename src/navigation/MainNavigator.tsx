import React, { Fragment, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import NetworkLogger from 'react-native-network-logger';

import { useTheme } from '../theme/ThemeProvider';
import { setUpToastConfig, vs } from '../utils';
import { useAppSelector } from '../hooks/hooks.ts';
import { FutecAttendance as Types } from '../types/interfaces';

import AuthenticatedStack from './AuthenticatedNavigation.tsx';
import UnauthenticatedStack from './UnauthenticatedNavigation.tsx';

const Navigation = () => {
  const access = useAppSelector(state => state.auth.access);
  return access ? <AuthenticatedStack /> : <UnauthenticatedStack />;
};

export const MainNavigator: React.FC = () => {
  const [isNetworkLoggerVisible, setIsNetworkLoggerVisible] =
    useState<boolean>(false);
  const { colors } = useTheme();
  const toastConfig = setUpToastConfig(
    colors,
    colors.background,
    colors.primaryText,
  );
  const styles = makeStyles(colors);

  return (
    <Fragment>
      <View style={styles.container}>
        {__DEV__ && (
          <Pressable
            style={({ pressed }) => [
              styles.debugButton,
              pressed && { opacity: 0.6 },
            ]}
            onPress={() => setIsNetworkLoggerVisible(!isNetworkLoggerVisible)}
          >
            <Text style={styles.textButton}>DEBUG</Text>
          </Pressable>
        )}
        <Navigation />
        <Toast config={toastConfig} visibilityTime={6000} />
        <Modal
          visible={isNetworkLoggerVisible}
          transparent={true}
          animationType={'slide'}
          onRequestClose={() => setIsNetworkLoggerVisible(false)}
        >
          <View style={styles.modalBackground}>
            <NetworkLogger theme={'dark'} />
          </View>
        </Modal>
      </View>
    </Fragment>
  );
};

const makeStyles = (colors: Types.ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    debugButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: vs(30),
      backgroundColor: 'red',
      zIndex: 999,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: '#000',
    },
    textButton: {
      color: 'white',
    },
  });
