import { deleteProfile } from "@/services/profile";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { View, Text, TouchableOpacity, Alert } from "react-native";

export const DeleteProfileButton = () => {
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser!;

  const showAlert = () =>
    Alert.alert("You're sure?", "Your account cannot be recovered", [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await deleteProfile(user);
            router.replace("/");
          } catch (error) {
            Alert.alert(
              "To delete your account you must log out and log in again"
            );
          }
        },
        style: "default",
      },
    ]);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
      }}
      onPress={showAlert}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Ionicons name="trash-outline" size={30} color="#bf0000" />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Delete Profile
        </Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={30} color="#000" />
    </TouchableOpacity>
  );
};

// async () => await deleteProfile(user)
