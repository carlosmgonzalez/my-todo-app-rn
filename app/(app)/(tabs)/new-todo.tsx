import { DatePicker, TimePicker } from "@/components";
import { CategoryItem } from "@/components/CategoryItem";
import { HeaderLeftBack } from "@/components/HeaderLeftBack";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Category } from "@/interfaces/Category";
import { createTask, getAllCategories } from "@/utils/firebaseConfig";
import { mockCategories } from "@/utils/mockCategories";
import { Link, Tabs, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";

export default function NewTodoScreen() {
  const router = useRouter();

  const auth = getAuth();
  const userId = auth.currentUser!.uid;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[] | undefined>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState("");

  useEffect(() => {
    getAllCategories(userId, setCategories);
  }, []);

  const disabledButton = !name || !category || !date;

  const onCreateTask = async () => {
    if (disabledButton) return;

    await createTask(userId, name, description, category, date);

    setName("");
    setDescription("");
    setCategory("");

    router.push("(app)/(tabs)");
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            gap: 30,
          }}
        >
          <View style={styles.subContainer}>
            <Text style={styles.subTitle}>Task Name</Text>
            <TextInput
              mode="outlined"
              onChangeText={setName}
              placeholder="Task name"
              value={name}
              outlineStyle={{
                borderColor: "#808080",
                borderRadius: 10,
              }}
            />
          </View>
          <View style={styles.subContainer}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Text style={styles.subTitle}>Category</Text>
              <Link
                href="(app)/category-list"
                style={{
                  textDecorationLine: "underline",
                  color: Colors.light.primaryColor,
                  fontSize: 16,
                }}
              >
                Edit
              </Link>
            </View>
            {categories?.length === 0 && (
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Add a category
              </Text>
            )}
            <FlatList
              horizontal
              data={categories}
              renderItem={({ item }) => (
                <CategoryItem
                  item={item.name}
                  category={category}
                  setCategory={setCategory}
                />
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.subTitle}>Date & Time</Text>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <DatePicker date={date} setDate={setDate} />
              <TimePicker date={date} setDate={setDate} />
            </View>
          </View>
          <View style={[styles.subContainer, { marginBottom: 25 }]}>
            <Text style={styles.subTitle}>Description</Text>
            <TextInput
              mode="outlined"
              onChangeText={setDescription}
              value={description}
              outlineStyle={{
                borderColor: "#808080",
                borderRadius: 10,
              }}
              multiline
              style={{ paddingVertical: 15 }}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          width: "100%",
          paddingVertical: 15,
          backgroundColor: disabledButton
            ? Colors.light.primaryColorOpacity
            : Colors.light.primaryColor,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
        onPress={onCreateTask}
        disabled={disabledButton}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 15,
            color: "#fff",
          }}
        >
          Create Task
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontWeight: "600",
    fontSize: 22,
  },
  subContainer: {
    gap: 10,
  },
  input: {},
});
