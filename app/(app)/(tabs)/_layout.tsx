import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard, TouchableOpacity, View } from "react-native";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  const router = useRouter();

  // const [keyboardSIsOpen, setKeyboardIsOpen] = useState(false);

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
  //     setKeyboardIsOpen(true);
  //   });
  //   const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
  //     setKeyboardIsOpen(false);
  //   });

  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 50,
          },
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
            tabBarButton: () => (
              <TouchableOpacity
                onPress={() => router.push("(app)/new-todo")}
                style={{
                  padding: 5,
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  backgroundColor: Colors.light.primaryColor,
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: 25,
                }}
              >
                <Ionicons name="add-outline" size={35} color="#fff" />
              </TouchableOpacity>
            ),
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
