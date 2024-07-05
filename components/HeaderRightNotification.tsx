import { View, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const HeaderRightNotification = () => {
  const router = useRouter();

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        paddingRight: 10,
        justifyContent: "center",
      }}
    >
      <Pressable
        style={({ pressed }) => ({
          padding: 5,
          borderRadius: pressed ? 10 : 0,
          backgroundColor: pressed ? Colors.backgroundLightGrey : "transparent",
        })}
        onPress={() => router.push("(app)/notification")}
      >
        <Ionicons name="notifications-outline" size={30} color={Colors.grey} />
      </Pressable>
    </View>
  );
};
