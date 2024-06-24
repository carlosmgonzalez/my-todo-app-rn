import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { Task } from "@/interfaces/tasks.interface";

export const ProgressCard = ({ tasks }: { tasks: Task[] }) => {
  const taskDone = tasks.reduce((acc, val) => {
    if (val.done) return acc + 1;
    return acc;
  }, 0);

  const progress = Math.floor((taskDone * 100) / tasks.length);

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 18,
        height: 170,
        justifyContent: "space-between",
      }}
    >
      <LinearGradient
        colors={[Colors.light.primaryColor, Colors.light.secondaryColor]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius: 18,
        }}
      />
      <View style={{ gap: 10 }}>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 18,
            color: "#fff",
          }}
        >
          Progress summery
        </Text>
        <Text
          style={{
            color: "#fff",
          }}
        >
          {tasks.length} Tasks
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#fff" }}>Progress</Text>
            <Text style={{ color: "#fff" }}>{progress}%</Text>
          </View>
          <View style={{ width: "100%", top: 10 }}>
            <View
              style={{
                width: "100%",
                height: 15,
                backgroundColor: "rgba(224, 224, 224, 0.5)",
                borderRadius: 10,
              }}
            />
            <View
              style={{
                width: `${progress}%`,
                height: 15,
                backgroundColor: "#fff",
                borderRadius: 10,
                bottom: 15,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
