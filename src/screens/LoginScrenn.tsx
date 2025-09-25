import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/Input';
import Button from '../components/Button';
import TextView from '../components/TextView';
import {colors} from '../constants/colors';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // @ts-ignore
    navigation.navigate('Authenticated');
  };

  return (
    <View style={styles.container}>
      <TextView text="Iniciar Sesión" style={styles.title} />
      <Input
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button label="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;

