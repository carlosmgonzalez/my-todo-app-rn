import { HeaderButtonBack } from "@/components";
import Colors from "@/constants/Colors";
import { getTaskById } from "@/utils/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

interface Task {
  category: string;
  date: string;
  description: string;
  name: string;
}

export default function TodoScreen() {
  const params = useLocalSearchParams();
  const taskId = params.id as string;
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [task, setTask] = useState<Task | undefined>();

  useEffect(() => {
    getTaskById(userId!, taskId, setTask);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingTop: 20,
        gap: 20,
      }}
    >
      <Stack.Screen
        options={{
          title: "Task Details",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => <HeaderButtonBack route="/(app)/(tabs)" />,
        }}
      />
      <Text style={{ fontWeight: "600", fontSize: 24 }}>{task?.name}</Text>
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
            width: 60,
            height: 60,
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
        <Text style={{ fontSize: 18, color: "#808080" }}>{task?.date}</Text>
      </View>
      <View>
        <Text style={{ fontWeight: "500", fontSize: 20 }}>Description</Text>
        <Text style={{ fontWeight: "300", fontSize: 18, color: "#808080" }}>
          {task?.description}
        </Text>
      </View>
      <View>
        <Text style={{ fontWeight: "500", fontSize: 20 }}>Category</Text>
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
            {task?.category}
          </Text>
        </View>
      </View>
    </View>
  );
}
