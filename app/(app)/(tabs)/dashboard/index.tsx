import { Text } from "react-native";
import React from "react";
import { YStack } from "tamagui";
import SimplePieChart from "../../../components/DoctorDashboard";

const Dashboard = () => {
  return (
    <YStack>
      <Text>Dashboard</Text>
      <SimplePieChart/>
    </YStack>
  );
};

export default Dashboard;
