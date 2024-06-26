import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { ProgressCard } from "@/components";
import { useEffect, useState } from "react";
import { getAllTasks } from "@/utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import { TaskResponse } from "@/interfaces/tasks.interface";
import { TaskItem } from "@/components/TaskItem";
import { defaultStyles } from "@/constants/Styles";

export default function TabOneScreen() {
  const auth = getAuth();
  const userId = auth.currentUser!.uid;

  const [tasks, setTasks] = useState<TaskResponse>();

  const allTasks = tasks
    ? Object.values(tasks).map((task, i) => ({
        ...task,
        id: Object.keys(tasks)[i],
        date: new Date(task.date),
      }))
    : [];

  useEffect(() => {
    getAllTasks(userId, setTasks);
  }, []);

  return (
    <View style={defaultStyles.container}>
      <Tabs.Screen
        options={{
          title: "Homepage",
          headerShadowVisible: false,
          headerRight: () => (
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
                  backgroundColor: pressed
                    ? Colors.light.backgroundLightGrey
                    : "transparent",
                })}
              >
                <Ionicons
                  name="notifications-outline"
                  size={30}
                  color={Colors.light.grey}
                />
              </Pressable>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
      <ProgressCard tasks={allTasks} />
      <View style={{ marginTop: 20, flex: 1 }}>
        <Text style={{ fontWeight: "600", fontSize: 22 }}>Tasks</Text>
        <FlatList
          data={allTasks}
          renderItem={({ item }) => <TaskItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
