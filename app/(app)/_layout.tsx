import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function LayoutApp() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
