import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const CaixaEletronico = ({ usuario, saldo, depositar, sacar, transferir }) => {
  const [valorDeposito, setValorDeposito] = useState("");
  const [valorSaque, setValorSaque] = useState("");
  const [valorTransferencia, setValorTransferencia] = useState("");

  const handleDepositar = () => {
    depositar(Number(valorDeposito));
    setValorDeposito("");
  };

  const handleSacar = () => {
    sacar(Number(valorSaque));
    setValorSaque("");
  };

  const handleTransferir = () => {
    const valor = Number(valorTransferencia);

    if (usuario === usuario && valorTransferencia.toLowerCase() === usuario) {
      Alert.alert("Erro", "Você não pode transferir para você mesmo.");
      return;
    }
    
    if (usuario !== usuario && valorTransferencia.toLowerCase() === usuario) {
      Alert.alert("Erro", "Usuário inexistente.");
      return;
    }

    transferir(valor);
    setValorTransferencia("");
  };

  return (
    <View>
      <Text>Bem-vindo, {usuario}!</Text>
      <View>
        <Text>Saldo: R$ {saldo.toFixed(2)}</Text>
      </View>
      <View>
        <Text>Depósito</Text>
        <TextInput
          placeholder="Valor"
          value={valorDeposito}
          onChangeText={(text) => setValorDeposito(text)}
          keyboardType="numeric"
        />
        <Button title="Depositar" onPress={handleDepositar} />

        <Text>Saque</Text>
        <TextInput
          placeholder="Valor"
          value={valorSaque}
          onChangeText={(text) => setValorSaque(text)}
          keyboardType="numeric"
        />
        <Button title="Sacar" onPress={handleSacar} />

        <Text>Transferência</Text>
        <TextInput
          placeholder="Valor"
          value={valorTransferencia}
          onChangeText={(text) => setValorTransferencia(text)}
          keyboardType="numeric"
        />
        <Button title="Transferir" onPress={handleTransferir} />

      </View>
    </View>
  );
};

export default CaixaEletronico;