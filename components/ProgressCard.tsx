import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";

export const ProgressCard = () => {
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 18,
        height: 200,
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
          Today's progress summery
        </Text>
        <Text
          style={{
            color: "#fff",
          }}
        >
          15 Tasks
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            overflow: "hidden",
            borderRadius: 100,
            borderWidth: 3,
            borderColor: "#fff",
            alignItems: "center",
          }}
        >
          <Image
            source={require("@/assets/images/no-avatar.png")}
            style={{ width: 40, height: 40 }}
          />
        </View>

        <View style={{ width: "80%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#fff" }}>Progress</Text>
            <Text style={{ color: "#fff" }}>40%</Text>
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
                width: "40%",
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
