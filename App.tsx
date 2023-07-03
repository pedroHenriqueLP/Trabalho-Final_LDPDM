import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const App = () => {
  const usuariosIniciais = {
    2022018500: { senha: 'daniel', saldo: 0 },
    2022017960: { senha: 'pedro', saldo: 0 }
  };

  const [usuarioLogado, setUsuarioLogado] = useState('');
  const [senhaLogada, setSenhaLogada] = useState('');
  const [usuarios, setUsuarios] = useState(usuariosIniciais);

  const handleLogin = (usuario, senha) => {
    if (usuarios.hasOwnProperty(usuario) && usuarios[usuario].senha === senha) {
      setUsuarioLogado(usuario);
      setSenhaLogada(senha);
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  const handleLogout = () => {
    setUsuarioLogado('');
    setSenhaLogada('');
  };

  const handleDeposito = (valor) => {
    if (usuarioLogado && usuarios.hasOwnProperty(usuarioLogado)) {
      const usuarioAtualizado = {
        ...usuarios[usuarioLogado],
        saldo: usuarios[usuarioLogado].saldo + valor
      };
      setUsuarios({ ...usuarios, [usuarioLogado]: usuarioAtualizado });
    }
  };

  const handleSaque = (valor) => {
    if (usuarioLogado && usuarios.hasOwnProperty(usuarioLogado)) {
      if (usuarios[usuarioLogado].saldo >= valor) {
        const usuarioAtualizado = {
          ...usuarios[usuarioLogado],
          saldo: usuarios[usuarioLogado].saldo - valor
        };
        setUsuarios({ ...usuarios, [usuarioLogado]: usuarioAtualizado });
      } else {
        alert('Saldo insuficiente');
      }
    }
  };

  const handleTransferencia = (valor, destinatario) => {
    if (
      usuarioLogado &&
      usuarios.hasOwnProperty(usuarioLogado) &&
      usuarios.hasOwnProperty(destinatario)
    ) {
      if (usuarios[usuarioLogado].saldo >= valor) {
        const usuarioRemetenteAtualizado = {
          ...usuarios[usuarioLogado],
          saldo: usuarios[usuarioLogado].saldo - valor
        };
        const usuarioDestinatarioAtualizado = {
          ...usuarios[destinatario],
          saldo: usuarios[destinatario].saldo + valor
        };
        setUsuarios({
          ...usuarios,
          [usuarioLogado]: usuarioRemetenteAtualizado,
          [destinatario]: usuarioDestinatarioAtualizado
        });
      } else {
        alert('Saldo insuficiente');
      }
    }
  };

  return (
    <View>
      {usuarioLogado ? (
        <>
          <Text>Bem-vindo, {usuarioLogado}!</Text>
          <Button title="Logout" onPress={handleLogout} />
          <CaixaEletronico
            saldo={usuarios[usuarioLogado].saldo}
            onDeposito={handleDeposito}
            onSaque={handleSaque}
            onTransferencia={handleTransferencia}
          />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </View>
  );
};

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = () => {
    onLogin(usuario, senha);
  };

  return (
    <View>
      <Text>Tela de Login</Text>
      <Text>Dev. por: Daniel Alvarenga Oliveira (2022018500)</Text>
      <Text>& Pedro Henrique de Lima Pimenta (2022017960)</Text>
      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={(text) => setUsuario(text)}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={(text) => setSenha(text)}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleSubmit} />
    </View>
  );
};

const CaixaEletronico = ({ saldo, onDeposito, onSaque, onTransferencia }) => {
  const [valorDeposito, setValorDeposito] = useState('');
  const [valorSaque, setValorSaque] = useState('');
  const [valorTransferencia, setValorTransferencia] = useState('');
  const [destinatarioTransferencia, setDestinatarioTransferencia] = useState(
    ''
  );

  const handleDeposito = () => {
    const valor = parseFloat(valorDeposito);
    if (!isNaN(valor) && valor > 0) {
      onDeposito(valor);
      setValorDeposito('');
    }
  };

  const handleSaque = () => {
    const valor = parseFloat(valorSaque);
    if (!isNaN(valor) && valor > 0) {
      onSaque(valor);
      setValorSaque('');
    }
  };

  const handleTransferencia = () => {
    const valor = parseFloat(valorTransferencia);
    if (!isNaN(valor) && valor > 0 && destinatarioTransferencia) {
      onTransferencia(valor, destinatarioTransferencia);
      setValorTransferencia('');
      setDestinatarioTransferencia('');
    }
  };

  return (
    <View>
      <Text>Caixa Eletrônico</Text>
      <View>
        <Text>Saldo: R$ {saldo.toFixed(2)}</Text>
      </View>
      <View>
        <Text>Depósito</Text>
        <TextInput
          placeholder="Valor do depósito"
          value={valorDeposito}
          onChangeText={(text) => setValorDeposito(text)}
          keyboardType="numeric"
        />
        <Button title="Depositar" onPress={handleDeposito} />
      </View>
      <View>
        <Text>Saque</Text>
        <TextInput
          placeholder="Valor do saque"
          value={valorSaque}
          onChangeText={(text) => setValorSaque(text)}
          keyboardType="numeric"
        />
        <Button title="Sacar" onPress={handleSaque} />
      </View>
      <View>
        <Text>Transferência</Text>
        <TextInput
          placeholder="Valor da transferência"
          value={valorTransferencia}
          onChangeText={(text) => setValorTransferencia(text)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Destinatário da transferência"
          value={destinatarioTransferencia}
          onChangeText={(text) => setDestinatarioTransferencia(text)}
        />
        <Button title="Transferir" onPress={handleTransferencia} />
      </View>
    </View>
  );
};

export default App;