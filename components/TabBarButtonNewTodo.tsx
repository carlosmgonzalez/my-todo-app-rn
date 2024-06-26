import { TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export const TabBarButtonNewTodo = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("(app)/new-todo")}
      style={{
        padding: 5,
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: Colors.light.primaryColor,
        justifyContent: "center",
        alignItems: "center",
        bottom: 25,
      }}
    >
      <Ionicons name="add-outline" size={35} color="#fff" />
    </TouchableOpacity>
  );
};
