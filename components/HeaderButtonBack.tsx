import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export const HeaderButtonBack = ({ route }: { route: string }) => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.light.backgroundLightGrey,
        width: 40,
        height: 40,
        // margin: 10,
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <TouchableOpacity onPress={() => router.replace(route)}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color={Colors.light.grey}
        />
      </TouchableOpacity>
    </View>
  );
};
