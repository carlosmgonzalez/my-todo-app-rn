import { logout } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

export const LogoutButton = () => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
      }}
      onPress={() => logout()}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Ionicons name="log-out-outline" size={30} color="#bf0000" />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Logout
        </Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={30} color="#000" />
    </TouchableOpacity>
  );
};
