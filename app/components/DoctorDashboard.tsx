import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function SimplePieChart() {
  const data = [
    {
      name: "Sleep",
      population: 8,
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Exercise",
      population: 2,
      color: "#FF9800",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Work",
      population: 8,
      color: "#2196F3",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Leisure",
      population: 4,
      color: "#9C27B0",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Meals",
      population: 2,
      color: "#F44336",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ];

  return (
    <View style={{  justifyContent: "center", alignItems: "center", padding: 16 , marginTop:50}}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Daily Activity Distribution
      </Text>
      <PieChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}