import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LayoutAuth() {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, paddingTop: top }}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="register"
          options={{
            header: () => (
              <View
                style={{
                  height: 50,
                  width: "100%",
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => router.replace("/(auth)/login")}
                >
                  <Ionicons name="arrow-back-outline" size={40} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>Back</Text>
              </View>
            ),
          }}
        />
      </Stack>
      <StatusBar style="dark" backgroundColor="white" />
    </View>
  );
}
