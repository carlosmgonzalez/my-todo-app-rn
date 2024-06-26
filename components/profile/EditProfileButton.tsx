import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export const EditProfileButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
      }}
      onPress={() => router.navigate("(app)/edit-profile")}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Ionicons name="pencil-outline" size={30} color="#007cbf" />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Edit Profile
        </Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={30} color="#000" />
    </TouchableOpacity>
  );
};
