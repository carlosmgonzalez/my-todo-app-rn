import { AlertMessage } from "@/components";
import Colors from "@/constants/Colors";
import { useState } from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { TextInput } from "react-native-paper";
import { getAuth, updatePassword } from "firebase/auth";

export default function ChangePasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser!;

  const onChangePassword = async () => {
    if (password !== confirmPassword || password.length === 0) return;
    try {
      await updatePassword(user, password);
      ToastAndroid.show("Updated password successfully", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG);
    }
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
        <AlertMessage message="To change the password you need to log out and log in again." />
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          value={password}
          mode="outlined"
          label="Password"
          outlineStyle={{
            borderColor: Colors.primaryColor,
            borderRadius: 5,
          }}
          secureTextEntry={hiddenPassword}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setHiddenPassword(!hiddenPassword)}
            />
          }
        />
        <TextInput
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          value={confirmPassword}
          mode="outlined"
          label="Confirm password"
          outlineStyle={{
            borderColor: Colors.primaryColor,
            borderRadius: 5,
          }}
          secureTextEntry={hiddenConfirmPassword}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setHiddenConfirmPassword(!hiddenConfirmPassword)}
            />
          }
        />
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
            opacity:
              !(password === confirmPassword) || password.length === 0
                ? 0.5
                : 1,
          }}
          disabled={!(password === confirmPassword) || password.length === 0}
          onPress={onChangePassword}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 15,
              color: "#fff",
            }}
          >
            Change
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
