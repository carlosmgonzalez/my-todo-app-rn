import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function LayoutAuth() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="register"
          options={{
            title: "",
          }}
        />
      </Stack>
      <StatusBar style="dark" backgroundColor="#fff" />
    </View>
  );
}
