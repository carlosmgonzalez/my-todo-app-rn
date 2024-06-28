import Colors from "@/constants/Colors";
import { Task } from "@/interfaces";
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
      <View style={{ gap: 2 }}>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
            textDecorationLine: item.done ? "line-through" : "none",
          }}
        >
          {item.name}
        </Text>
        <Text>
          {formatTime(item.date)} hrs - {formatDate(item.date)}
        </Text>
      </View>
      <View>
        <Ionicons
          name="chevron-forward-outline"
          size={28}
          color={Colors.grey}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
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
