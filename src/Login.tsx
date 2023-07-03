import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = () => {
    onLogin(usuario, senha);
  };

  return (
    <View>
      <Text>Tela de Login</Text>
      
      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleSubmit} />
    </View>
  );
};

export default Login;