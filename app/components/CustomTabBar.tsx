import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  // Filter routes that have a tabBarIcon (visible tabs)
  const visibleRoutes = state.routes.filter((route) => {
    const { options } = descriptors[route.key];
    // Only show tabs that have a tabBarIcon defined
    return options.tabBarIcon !== undefined;
  });

  if (visibleRoutes.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBar}>
        {visibleRoutes.map((route, idx) => {
          const { options } = descriptors[route.key];
          const originalIndex = state.routes.findIndex(r => r.key === route.key);
          const isFocused = state.index === originalIndex;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const icon = options.tabBarIcon?.({
            focused: isFocused,
            color: isFocused ? "black" : "white",
            size: 26,
          });

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isFocused && styles.activeIcon,
                ]}
              >
                {icon}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 5,
    left: 18,
    right: 18,
    backgroundColor: "transparent",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#000",
    borderRadius: 40,
    height: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,

    // shadowColor: "#000",
    // shadowOpacity: 0.2,
    // shadowRadius: 12,
    // shadowOffset: { width: 0, height: 5 },
    // elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  activeIcon: {
    backgroundColor: "#fff",
    borderRadius: '100%',
  },
});