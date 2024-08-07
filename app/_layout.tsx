import "react-native-reanimated";
import "@/firebase/firebaseConfig";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { DefaultTheme, PaperProvider } from "react-native-paper";
export { ErrorBoundary } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#119DA4",
    secondary: "#0C7489",
    background: "white",
  },
  roundness: 1,
};

function RootLayoutNav() {
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{}} />
          <Stack.Screen name="(auth)" options={{}} />
          <Stack.Screen name="(app)" options={{}} />
        </Stack>
        <StatusBar style="dark" backgroundColor="#fff" />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
