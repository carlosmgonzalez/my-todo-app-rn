import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TabBarButtonNewTodo } from "@/components";

export default function TabLayout() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home-outline"
                size={30}
                color={focused ? "#000" : "#808080"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="new-todo"
          options={{
            tabBarButton: () => <TabBarButtonNewTodo />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
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
