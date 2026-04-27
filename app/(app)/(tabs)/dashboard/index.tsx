import { Text } from "react-native";
import React from "react";
import { ScrollView, YStack } from "tamagui";
import DoctorDashboard from "../../../components/DoctorDashboard";

const Dashboard = () => {
  return (
    <ScrollView marginBottom={100} showsVerticalScrollIndicator={false}>
      <DoctorDashboard/>
    </ScrollView>
  );
};

export default Dashboard;
