import { AlertMessage } from "@/components";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  getAuth,
  sendEmailVerification,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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

  const onVerifyNewEmail = async () => {
    try {
      await verifyBeforeUpdateEmail(user, email);
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = async () => {
    await onUpdateFullname();
    router.replace("(app)/(tabs)/profile");
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
      <View>
        <AlertMessage message="To change the email you need to log out and log in again." />
        <View style={{ gap: 15 }}>
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
          <TouchableOpacity style={styles.button} onPress={onVerifyNewEmail}>
            <Ionicons name="mail-outline" size={30} color="1dbf00" />
            <Text style={{ fontWeight: "500" }}>Verify New Email & Change</Text>
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1.5,
  },
});
