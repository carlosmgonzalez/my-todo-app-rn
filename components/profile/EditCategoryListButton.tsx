import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export const EditCategoryListButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
      }}
      onPress={() => router.navigate("(app)/category-list")}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Ionicons name="file-tray-full-outline" size={30} color="#d6c01a" />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Category List
        </Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={30} color="#000" />
    </TouchableOpacity>
  );
};
