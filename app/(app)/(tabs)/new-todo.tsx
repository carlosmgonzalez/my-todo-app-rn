import { CategoryItem } from "@/components/CategoryItem";
import { HeaderLeftBack } from "@/components/HeaderLeftBack";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { createTask } from "@/utils/firebaseConfig";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { Tabs, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AndroidMode = "date" | "time";
const categoriesList = [
  "Desarrollo",
  "Diseño",
  "Backend",
  "Testing",
  "Mantenimiento",
  "DevOps",
];

export default function NewTodoScreen() {
  const router = useRouter();

  const auth = getAuth();
  const userId = auth.currentUser!.uid;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState("");

  const disabledButton = !name || !category || !date;

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: AndroidMode) => {
    DateTimePickerAndroid.open({
      value: date!,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimerPicker = () => {
    showMode("time");
  };

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
      <Tabs.Screen
        options={{
          title: "Create New Task",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          tabBarStyle: { display: "none" },
          headerLeft: () => <HeaderLeftBack />,
        }}
      />
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
            <Text style={styles.subTitle}>Category</Text>
            <FlatList
              horizontal
              data={categoriesList}
              renderItem={({ item }) => (
                <CategoryItem
                  item={item}
                  category={category}
                  setCategory={setCategory}
                />
              )}
              keyExtractor={(item) => item}
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
              <View
                style={{
                  flex: 60,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#808080",
                  height: 55,
                }}
              >
                <Text>{date && formatDate(date)}</Text>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(193, 218, 219, 0.5)",
                    padding: 3,
                    borderRadius: 5,
                  }}
                  onPress={() => showDatePicker()}
                >
                  <Ionicons
                    name="calendar-number-outline"
                    size={23}
                    color={Colors.light.darkPrimaryColor}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 40,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#808080",
                  height: 55,
                }}
              >
                <Text>{date && date.toLocaleTimeString()}</Text>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(193, 218, 219, 0.5)",
                    padding: 3,
                    borderRadius: 5,
                  }}
                  onPress={() => showTimerPicker()}
                >
                  <Ionicons
                    name="chevron-down-outline"
                    size={15}
                    color={Colors.light.darkPrimaryColor}
                  />
                </TouchableOpacity>
              </View>
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
