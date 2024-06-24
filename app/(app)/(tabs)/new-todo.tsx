import Colors from "@/constants/Colors";
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
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";

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
  const [categorySelected, setCategorySelected] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState("");

  const disabledButton = !name || !categorySelected || !date;

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

  const onCreateTask = () => {
    if (disabledButton) return;

    createTask(userId, name, description, categorySelected, date);

    setName("");
    setDescription("");
    setCategorySelected("");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingTop: 20,
      }}
    >
      <Tabs.Screen
        options={{
          title: "Create New Task",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                margin: 10,
                // backgroundColor: Colors.light.backgroundLightGrey,
                // borderRadius: 10,
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
                <Ionicons
                  name="arrow-back-outline"
                  size={25}
                  color={Colors.light.grey}
                />
              </Pressable>
            </View>
          ),
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
              renderItem={({ item: category }) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setCategorySelected(category)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor:
                      category === categorySelected
                        ? Colors.light.primaryColor
                        : "rgba(193, 218, 219, 0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: category === categorySelected ? "#fff" : "#000",
                      fontWeight: "500",
                    }}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              // showsVerticalScrollIndicator={false}
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
