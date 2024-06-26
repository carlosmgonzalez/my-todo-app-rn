import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  HeaderLeftBack,
  HeaderRightNotification,
  TabBarButtonNewTodo,
} from "@/components";

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Homepage",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home-outline"
                size={30}
                color={focused ? "#000" : "#808080"}
              />
            ),
            headerRight: () => <HeaderRightNotification />,
          }}
        />
        <Tabs.Screen
          name="new-todo"
          options={{
            title: "New Task",
            tabBarStyle: { display: "none" },
            tabBarButton: () => <TabBarButtonNewTodo />,
            headerLeft: () => <HeaderLeftBack />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-outline"
                size={30}
                color={focused ? "#000" : "#808080"}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="dark" backgroundColor="#fff" />
    </View>
  );
}
