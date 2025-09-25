/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { LogBox, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { persistor, store } from './src/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import { MainNavigator } from './src/navigation/MainNavigator.tsx';

const renderApp = () => {
  return <MainNavigator />;
};

function App() {
  LogBox.ignoreLogs([
    '[Reanimated] Reduced motion setting is enabled on this device.',
  ]);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <NavigationContainer>
                <AppContent />
              </NavigationContainer>
            </ThemeProvider>
          </PersistGate>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* <NewAppScreen templateFileName="App.tsx" safeAreaInsets={safeAreaInsets} /> */}
      {/* Puedes agregar aquí tu contenido principal */}
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  flex: {
    flex: 1,
  },
});
