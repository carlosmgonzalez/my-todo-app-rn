import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { TaskDB } from "@/interfaces/tasks.interface";
import {
  deleteTask,
  getTaskById,
  toggleTaskDone,
} from "@/utils/firebaseConfig";
import { formatDate, formatTime } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TodoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const taskId = params.id as string;
  const auth = getAuth();
  const userId = auth.currentUser!.uid;

  const [task, setTask] = useState<TaskDB | undefined>();

  const onDeleteTask = async () => {
    await deleteTask(userId, taskId);
    router.push("(app)/(tabs)");
  };

  const onToggleTaskDone = async () => {
    await toggleTaskDone(userId, taskId);
  };

  useEffect(() => {
    getTaskById(userId!, taskId, setTask);
  }, []);

  return (
    <View
      style={[defaultStyles.container, { justifyContent: "space-between" }]}
    >
      <View
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        <View>
          <Text style={{ fontWeight: "600", fontSize: 24 }}>{task?.name}</Text>
          <Text style={{ fontWeight: "300", fontSize: 18, color: "#808080" }}>
            {task?.description}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 15,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              borderRadius: 100,
              backgroundColor: "rgba(17, 157, 164, 0.2)",
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={30}
              color={Colors.light.primaryColor}
            />
          </View>
          <Text style={{ fontSize: 18, color: "#000" }}>
            {formatTime(new Date(task?.date!))} hrs -{" "}
            {formatDate(new Date(task?.date!))}
          </Text>
        </View>

        <View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: Colors.light.primaryColor,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "500",
              }}
            >
              {task?.category.toLocaleUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity style={styles.button} onPress={onToggleTaskDone}>
          {task?.done ? (
            <>
              <Ionicons name="close-outline" size={30} color="#007cbf" />
              <Text style={{ fontWeight: "500" }}>Undone</Text>
            </>
          ) : (
            <>
              <Ionicons name="checkmark-outline" size={30} color="#007cbf" />
              <Text style={{ fontWeight: "500" }}>Done</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onDeleteTask}>
          <Ionicons name="trash-outline" size={30} color="#bf0000" />
          <Text style={{ fontWeight: "500" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1.5,
  },
});
