import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useDoctorDashboard } from "../hooks/doctor/useDoctorDashboard";
import { Card, Paragraph, Spinner, Text, XStack, YStack, Separator, H5 } from "tamagui";

const screenWidth = Dimensions.get("window").width;

export default function DoctorDashboard() {
  const { data, isLoading } = useDoctorDashboard();

  const dashboard = data?.data;

  const statusColors: any = {
    SCHEDULED: "#4F46E5",
    COMPLETED: "#22C55E",
    CANCELLED: "#EF4444",
  };

  const pieData =
    dashboard?.formattedAppointmentStatusDistribution?.map((item: any) => ({
      name: item.status,
      population: item.count,
      color: statusColors[item.status] || "#A855F7",
      legendFontColor: "#333",
      legendFontSize: 12,
    })) || [];

  const totalAppointments = dashboard?.appointmentCount || 0;

  if (isLoading) {
    return (
      <YStack flex={1} ai="center" jc="center" mt="$10">
        <Spinner size="large" />
      </YStack>
    );
  }

  return (
    <YStack flex={1}>
      {/* Header */}
      {/* <YStack my="$4" ai="center" jc="center">
        <H5 fontWeight="800">Doctor Dashboard</H5>
        <Paragraph theme="alt2" mt="$1">
          Overview of your clinic performance
        </Paragraph>
      </YStack> */}

      {/* Stats Cards */}
      <XStack flexWrap="wrap" gap="$3" mb="$4">
        <Card width="48%" padding="$4" borderRadius="$6">
          <Paragraph theme="alt2">Appointments</Paragraph>
          <Text fontSize="$6" fontWeight="800" mt="$2">
            {dashboard?.appointmentCount || 0}
          </Text>
        </Card>

        <Card width="48%" padding="$4" borderRadius="$6">
          <Paragraph theme="alt2">Patients</Paragraph>
          <Text fontSize="$6" fontWeight="800" mt="$2">
            {dashboard?.patientCount || 0}
          </Text>
        </Card>

        <Card width="48%" padding="$4" borderRadius="$6">
          <Paragraph theme="alt2">Reviews</Paragraph>
          <Text fontSize="$6" fontWeight="800" mt="$2">
            {dashboard?.reviewCount || 0}
          </Text>
        </Card>

        <Card width="48%" padding="$4" borderRadius="$6">
          <Paragraph theme="alt2">Revenue</Paragraph>
          <Text fontSize="$6" fontWeight="800" mt="$2">
            ৳{dashboard?.totalRevenue?._sum?.amount || 0}
          </Text>
        </Card>
      </XStack>

      {/* Chart Card */}
      <Card borderRadius="$6" backgroundColor="$colorTransparent">
        <XStack justifyContent="space-between" alignItems="center" mb="$3">
          <Text fontSize="$5" fontWeight="800">
            Appointment Distribution
          </Text>

          <Card paddingHorizontal="$3" paddingVertical="$2" borderRadius="$10">
            <Text color="black" fontWeight="800">
              Total: {totalAppointments}
            </Text>
          </Card>
        </XStack>

        {pieData.length > 0 ? (
          <YStack alignItems="center">
            <PieChart
              data={pieData}
              width={screenWidth - 80}
              height={220}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="20"
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              absolute
              hasLegend={false}
            />
          </YStack>
        ) : (
          <Paragraph textAlign="center" mt="$4" theme="alt2">
            No appointment data found.
          </Paragraph>
        )}

        {/* Legend */}
        <YStack mt="$4" gap="$2">
          {pieData.map((item: any, index: number) => (
            <YStack key={index}>
              <XStack justifyContent="space-between" alignItems="center" py="$2">
                <XStack alignItems="center" gap="$2">
                  <YStack width={12} height={12} borderRadius={999} backgroundColor={item.color} />
                  <Text fontWeight="700">{item.name}</Text>
                </XStack>

                <Text fontWeight="800">{item.population}</Text>
              </XStack>

              {index !== pieData.length - 1 && <Separator />}
            </YStack>
          ))}
        </YStack>
      </Card>
    </YStack>
  );
}
