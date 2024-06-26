import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { Category } from "@/interfaces/category";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "@/services/category";
import Colors from "@/constants/Colors";

export default function CategoryListScreen() {
  const auth = getAuth();
  const user = auth.currentUser!;
  const userId = user.uid;

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<Category[] | undefined>([]);

  const onCreateCategory = async () => {
    try {
      await createCategory(userId, newCategory.toLowerCase().trim());
      setNewCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(userId, categoryId);
      if (categories?.length === 1) setCategories([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories(userId, setCategories);
  }, []);

  return (
    <View style={defaultStyles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 55,
          gap: 15,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: "100%",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: "#808080",
          }}
          placeholder="Category Name"
          onChangeText={setNewCategory}
          value={newCategory}
        />
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 55,
            height: 55,
            borderRadius: 15,
            backgroundColor: Colors.primaryColor,
            opacity: !newCategory ? 0.5 : 1,
          }}
          onPress={onCreateCategory}
          disabled={!newCategory}
        >
          <Ionicons name="add-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 20,
        }}
      >
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 17,
                }}
              >
                {item.name.toLocaleUpperCase()}
              </Text>
              <TouchableOpacity onPress={() => onDeleteCategory(item.id)}>
                <Ionicons
                  name="remove-circle-outline"
                  size={28}
                  color="#bf0000"
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
