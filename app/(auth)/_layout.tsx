import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                  }}
                >
                  <Pressable
                    onPress={() => router.replace("/(auth)/login")}
                    style={({ pressed }) => ({
                      width: 35,
                      height: 35,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: pressed ? "#e5e5e5" : "#fff",
                      borderRadius: pressed ? 100 : 0,
                    })}
                  >
                    <Ionicons
                      name="arrow-back-outline"
                      size={25}
                      color={Colors.light.grey}
                    />
                  </Pressable>
                </View>
              </View>
            ),
          }}
        />
      </Stack>
      <StatusBar style="dark" backgroundColor="#fff" />
    </View>
  );
}
