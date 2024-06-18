import { logout } from "@/utils/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tabs.Screen
        options={{
          title: "Homepage",
          headerShadowVisible: false,
          headerRight: () => (
            <View
              style={{
                height: "100%",
                alignItems: "center",
                paddingRight: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderRadius: 10,
                  backgroundColor: "rgba(207, 207, 207, 0.5)",
                }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={30}
                  color="#808080"
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                height: "100%",
                alignItems: "center",
                paddingLeft: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderRadius: 10,
                  backgroundColor: "rgba(207, 207, 207, 0.5)",
                }}
              >
                <Ionicons name="grid-outline" size={30} color="#808080" />
              </TouchableOpacity>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Text>Tab One</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
