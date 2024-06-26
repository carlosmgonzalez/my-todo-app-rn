import { Ionicons } from "@expo/vector-icons";
import { Auth } from "firebase/auth";
import { View, Text, TouchableOpacity } from "react-native";

export const LogoutButton = ({ auth }: { auth: Auth }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
      }}
      onPress={() => auth.signOut()}
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
