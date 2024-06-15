import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LayoutAuth() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: top }}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" backgroundColor="white" />
    </View>
  );
}
