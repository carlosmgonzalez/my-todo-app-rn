import { EditImageButton } from "@/components";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser!;

  const [photoUrl, setPhotoUrl] = useState<string | null | undefined>(
    user.photoURL
  );

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
              source={
                photoUrl
                  ? { uri: photoUrl }
                  : require("@/assets/images/no-avatar.png")
              }
              style={{
                width: 180,
                height: 180,
              }}
            />
          </View>
        </View>
        <EditImageButton setPhotoUrl={setPhotoUrl} />
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
          {user.displayName ? user.displayName : "No name"}
        </Text>
        <Text
          style={{
            fontWeight: "400",
          }}
        >
          {user.email}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        }}
        onPress={() => router.navigate("(app)/edit-profile")}
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
        onPress={() => router.navigate("(app)/change-password")}
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
