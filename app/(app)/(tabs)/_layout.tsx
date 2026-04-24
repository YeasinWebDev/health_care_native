import { Tabs } from "expo-router";
import { useMe } from "../../hooks/useAuth";
import { Spinner } from "tamagui";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomTabBar from "../../components/CustomTabBar";

export default function TabsLayout() {
  const { data, isLoading } = useMe();

  if (isLoading) return <Spinner />;

  const role = data?.data?.role;

  const hide = { href: null };


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, 
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {/* Your tabs remain the same */}

      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="space-dashboard" size={size} color={color} />,
        }}
      />

      {/* PATIENT */}
      <Tabs.Screen
        name="consultation/index"
        options={
          role === "PATIENT"
            ? {
                title: "Consult",
                tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-ellipses" size={size} color={color} />,
              }
            : hide
        }
      />

      <Tabs.Screen
        name="health-records/index"
        options={
          role === "PATIENT"
            ? {
                title: "Records",
                tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />,
              }
            : hide
        }
      />

      {/* COMMON */}
      <Tabs.Screen
        name="appointments/index"
        options={
          role === "PATIENT" || role === "DOCTOR" || role === "ADMIN"
            ? {
                title: "Appointments",
                tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
              }
            : hide
        }
      />

      

      {/* DOCTOR */}
      <Tabs.Screen
        name="my-schedules/index"
        options={
          role === "DOCTOR"
            ? {
                title: "Schedules",
                tabBarIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} />,
              }
            : hide
        }
      />

      <Tabs.Screen
        name="prescription/index"
        options={
          role === "DOCTOR"
            ? {
                title: "Prescription",
                tabBarIcon: ({ color, size }) => <Ionicons name="medkit" size={size} color={color} />,
              }
            : hide
        }
      />

      {/* ADMIN */}
      <Tabs.Screen
        name="all-users/index"
        options={
          role === "ADMIN"
            ? {
                title: "Users",
                tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
              }
            : hide
        }
      />

      <Tabs.Screen
        name="schedules/index"
        options={
          role === "ADMIN"
            ? {
                title: "Schedules",
                tabBarIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} />,
              }
            : hide
        }
      />
    </Tabs>
  );
}