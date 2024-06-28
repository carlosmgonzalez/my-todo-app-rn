import { AlertMessage } from "@/components";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { updateDisplayName, verifyNewEmail } from "@/services/profile";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { TextInput } from "react-native-paper";

export default function EditProfileScreen() {
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser!;

  const [displayName, setDisplayName] = useState(
    user?.displayName ? user.displayName : "No name"
  );
  const [email, setEmail] = useState(user!.email!);

  const onUpdateDisplayName = async () => {
    try {
      await updateDisplayName(user, displayName);
      ToastAndroid.show("Updated display name successfully", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG);
    }
  };

  const onVerifyNewEmail = async () => {
    try {
      await verifyNewEmail(user, email);
      ToastAndroid.show("Email sent to verify", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG);
    }
  };

  const onSave = async () => {
    await onUpdateDisplayName();
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
            onChangeText={setDisplayName}
            placeholder=""
            value={displayName}
            mode="outlined"
            label="Full name"
            outlineStyle={{
              borderColor: Colors.primaryColor,
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
              borderColor: Colors.primaryColor,
              borderRadius: 5,
            }}
          />
          <TouchableOpacity
            style={defaultStyles.buttonShadow}
            onPress={onVerifyNewEmail}
          >
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
            backgroundColor: Colors.primaryColor,
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
