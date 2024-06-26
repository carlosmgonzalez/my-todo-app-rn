import Colors from "@/constants/Colors";
import { Task } from "@/interfaces/tasks.interface";
import { formatDate, formatTime } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const TaskItem = ({ item }: { item: Task }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.navigate({
          pathname: "/(app)/[id]",
          params: { id: item.id },
        })
      }
      style={styles.button}
    >
      <View>
        <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.name}</Text>
        <Text>
          {formatTime(item.date)} hrs - {formatDate(item.date)}
        </Text>
      </View>
      <View>
        <Ionicons
          name="chevron-forward-outline"
          size={28}
          color={Colors.light.grey}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
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
  },
});
