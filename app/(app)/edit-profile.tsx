import Colors from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

export default function EditProfileScreen() {
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser!;

  const [fullName, setFullName] = useState(
    user?.displayName ? user.displayName : "No name"
  );

  const [email, setEmail] = useState(user!.email!);

  const onUpdateFullname = async () => {
    try {
      await updateProfile(user, { displayName: fullName });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateEmail = () => {};

  const onSave = async () => {
    await onUpdateFullname();
    router.push("(app)/(tabs)/profile");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingTop: 20,
        justifyContent: "space-between",
      }}
    >
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <View style={{ gap: 20 }}>
        <TextInput
          onChangeText={setFullName}
          placeholder=""
          value={fullName}
          mode="outlined"
          label="Full name"
          outlineStyle={{
            borderColor: Colors.light.primaryColor,
            borderRadius: 5,
          }}
        />
        <TextInput
          onChangeText={setEmail}
          placeholder=""
          value={email}
          mode="outlined"
          label="Email"
          outlineStyle={{
            borderColor: Colors.light.primaryColor,
            borderRadius: 5,
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            width: "100%",
            paddingVertical: 15,
            backgroundColor: Colors.light.primaryColor,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={onSave}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 15,
              color: "#fff",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
