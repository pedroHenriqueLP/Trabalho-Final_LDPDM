import React from "react";
import { View, Text, Button } from "react-native";
import Menu from "./Menu";

const Dashboard = ({ usuario, onLogout }) => {
  return (
    <View>
      <Text>Bem-vindo, {usuario}!</Text>
      <Button title="Logout" onPress={onLogout} />
      <Menu usuario={usuario} />
    </View>
  );
};

export default Dashboard;