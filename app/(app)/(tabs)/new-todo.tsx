import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { Tabs, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";

function formatDate(date: Date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate().toString().padStart(2, "0"); // Asegura que el día tenga dos dígitos
  const month = months[date.getMonth()];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${day} ${month}, ${dayOfWeek}`;
}

type AndroidMode = "date" | "time";
const categoriesList = ["Design", "Development", "Research", "Fitness"];

export default function NewTodoScreen() {
  const router = useRouter();

  const [taskName, setTaskName] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState("");

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
    console.log(
      `Se a creado la tarea "${taskName}", con la descripcion "${description}" con la categoria "${categorySelected}" y el recordatorio: ${date?.toLocaleString()}`
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingTop: 10,
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
                backgroundColor: "rgba(186, 186, 186, 0.5)",
                width: 40,
                height: 40,
                margin: 10,
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={() => router.replace("/(app)/(tabs)")}>
                <Ionicons
                  name="chevron-back-outline"
                  size={30}
                  color="#404040"
                />
              </TouchableOpacity>
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
              onChangeText={setTaskName}
              placeholder="Task name"
              value={taskName}
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
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#808080",
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
          </View>
          <View
            style={[
              styles.subContainer,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <View>
              <Text style={{ fontWeight: "500", fontSize: 18 }}>
                Start time
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#808080",
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

            <View>
              <Text style={{ fontWeight: "500", fontSize: 18 }}>
                Start time
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#808080",
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
          <View style={styles.subContainer}>
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
          <TouchableOpacity
            style={{
              width: "100%",
              paddingVertical: 15,
              backgroundColor: Colors.light.primaryColor,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
            onPress={onCreateTask}
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
      </ScrollView>
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
