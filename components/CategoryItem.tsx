import { Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface Props {
  item: string;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const CategoryItem = ({ item, category, setCategory }: Props) => {
  return (
    <TouchableOpacity
      key={item}
      onPress={() => setCategory(item)}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor:
          item === category
            ? Colors.light.primaryColor
            : "rgba(193, 218, 219, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: item === category ? "#fff" : "#000",
          fontWeight: "500",
          fontSize: 13,
        }}
      >
        {item.toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};
