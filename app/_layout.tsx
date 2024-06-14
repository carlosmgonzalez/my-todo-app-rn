import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
export { ErrorBoundary } from "expo-router";
// import font from "@tamagui/font-inter/otf/Inter-Medium.otf"
require("../node_modules/@tamagui/font-inter/otf/Inter-Medium.otf");

import "@tamagui/core/reset.css";
import { TamaguiProvider } from "tamagui";
import config from "@/utils/tamagui.config";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("../node_modules/@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("../node_modules/@tamagui/font-inter/otf/Inter-Bold.otf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen name="index" options={{}} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
