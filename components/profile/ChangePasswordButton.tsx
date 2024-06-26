import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export const ChangePasswordButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
      }}
      onPress={() => router.navigate("(app)/change-password")}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Ionicons name="lock-closed-outline" size={30} color="#1dbf00" />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Change Password
        </Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={30} color="#000" />
    </TouchableOpacity>
  );
};
