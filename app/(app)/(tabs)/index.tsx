import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressCard } from "@/components";
import { useEffect, useState } from "react";
import { getAllTasks } from "@/utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import { TaskResponse } from "@/interfaces/tasks.interface";
import { formatDate, formatTime } from "@/utils/formatDate";

export default function TabOneScreen() {
  const router = useRouter();

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
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderRadius: 10,
                  backgroundColor: Colors.light.backgroundLightGrey,
                }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={30}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                height: "100%",
                alignItems: "center",
                paddingLeft: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderRadius: 10,
                  backgroundColor: Colors.light.backgroundLightGrey,
                }}
              >
                <Ionicons
                  name="grid-outline"
                  size={30}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
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
          renderItem={({ item }) => (
            <View
              style={{
                borderRadius: 18,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
                marginHorizontal: 5,
                padding: 10,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 1,
                elevation: 1.5,
              }}
            >
              <View>
                <Text style={{ fontWeight: "500", fontSize: 16 }}>
                  {item.name}
                </Text>
                <Text>
                  {formatTime(item.date)} hrs - {formatDate(item.date)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.navigate({
                    pathname: "/(app)/[id]",
                    params: { id: item.id },
                  })
                }
              >
                <Ionicons
                  name="chevron-forward-outline"
                  size={28}
                  color={Colors.light.grey}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

const _tasks = [
  {
    id: "1",
    name: "Implementar nueva funcionalidad",
    category: "Desarrollo",
    description:
      "Implementar la funcionalidad de autenticación de usuarios utilizando JWT.",
    date: new Date("2024-06-20"),
  },
  {
    id: "2",
    name: "Diseñar landing page",
    category: "Diseño",
    description:
      "Crear un diseño atractivo y responsivo para la página de aterrizaje del nuevo producto.",
    date: new Date("2024-06-22"),
  },
  {
    id: "3",
    name: "Configurar base de datos",
    category: "Backend",
    description:
      "Configurar y optimizar la base de datos PostgreSQL para la nueva aplicación.",
    date: new Date("2024-06-25"),
  },
  {
    id: "4",
    name: "Test unitarios",
    category: "Testing",
    description:
      "Escribir y ejecutar test unitarios para las nuevas funcionalidades desarrolladas.",
    date: new Date("2024-06-27"),
  },
  {
    id: "5",
    name: "Revisión de código",
    category: "Mantenimiento",
    description:
      "Revisar el código de los compañeros para asegurar la calidad y consistencia del proyecto.",
    date: new Date("2024-06-28"),
  },
  {
    id: "6",
    name: "Deploy en ambiente de producción",
    category: "DevOps",
    description:
      "Realizar el despliegue de la aplicación en el ambiente de producción utilizando Docker y Kubernetes.",
    date: new Date("2024-06-30"),
  },
  {
    id: "7",
    name: "Crear documentación de API",
    category: "Backend",
    description:
      "Escribir la documentación detallada de la API REST para los desarrolladores front-end.",
    date: new Date("2024-07-01"),
  },
  {
    id: "8",
    name: "Optimización de performance",
    category: "Mantenimiento",
    description:
      "Analizar y optimizar el rendimiento de la aplicación para mejorar la velocidad de carga y la eficiencia.",
    date: new Date("2024-07-03"),
  },
];
