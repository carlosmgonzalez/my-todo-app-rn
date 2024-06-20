import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { getAuth } from "firebase/auth";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;

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
          title: "Profile",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderRadius: 100,
            width: 200,
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 3,
            borderColor: Colors.light.primaryColor,
          }}
        >
          <View
            style={{
              borderRadius: 100,
              backgroundColor: "#d4d4d4",
              overflow: "hidden",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 6,
              borderColor: "#fff",
            }}
          >
            <Image
              source={require("@/assets/images/no-avatar.png")}
              style={{
                width: 180,
                height: 180,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            backgroundColor: "rgb(193, 218, 219)",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 10,
            right: 100,
          }}
        >
          <Ionicons
            name="pencil-outline"
            size={30}
            color={Colors.light.primaryColor}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 20,
          }}
        >
          No name
        </Text>
        <Text
          style={{
            fontWeight: "400",
          }}
        >
          {user?.email}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        }}
        onPress={() => auth.signOut()}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name="pencil-outline" size={30} color="#007cbf" />
          <Text
            style={{
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            Edit Profile
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        }}
        onPress={() => auth.signOut()}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name="lock-closed-outline" size={30} color="#1dbf00" />
          <Text
            style={{
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            Change Password
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        }}
        onPress={() => auth.signOut()}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name="log-out-outline" size={30} color="#bf0000" />
          <Text
            style={{
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            Logout
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
