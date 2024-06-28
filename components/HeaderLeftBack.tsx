import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

export const HeaderLeftBack = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        margin: 10,
      }}
    >
      <Pressable
        onPress={() => router.replace("/(app)/(tabs)")}
        style={({ pressed }) => ({
          width: 35,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: pressed ? "#e5e5e5" : "#fff",
          borderRadius: pressed ? 100 : 0,
        })}
      >
        <Ionicons name="arrow-back-outline" size={25} color={Colors.grey} />
      </Pressable>
    </View>
  );
};
