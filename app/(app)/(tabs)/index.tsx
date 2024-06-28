import { FlatList } from "react-native";
import { Text, View } from "react-native";
import { ProgressCard } from "@/components";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { TaskItem } from "@/components/TaskItem";
import { defaultStyles } from "@/constants/Styles";
import { TaskResponse } from "@/interfaces";
import { getAllTasks } from "@/services/task";

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
