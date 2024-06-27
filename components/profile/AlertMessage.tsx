import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export const AlertMessage = ({ message }: { message: string }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(219, 29, 41, 0.5)",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        gap: 10,
        marginBottom: 10,
      }}
    >
      <Ionicons
        name="alert-circle-outline"
        size={30}
        color="rgb(219, 29, 41)"
      />
      <Text style={{ color: "#000", fontWeight: "500" }}>{message}</Text>
    </View>
  );
};
