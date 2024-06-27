import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { handleRegister } from "@/utils/firebaseConfig";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);

  const onPress = async () => {
    if (password !== confirmPassword || password.length === 0) return;
    await handleRegister(email, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          padding: 15,
          bottom: 20,
        }}
      >
        <View
          style={{
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 25, fontWeight: "600" }}>
              Welcome to Onboard!
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>
              Let’s help to meet up your tasks
            </Text>
          </View>
          <Image
            source={require("@/assets/images/register.png")}
            style={{ width: 230, height: 230 }}
          />
        </View>

        <View style={{ gap: 5, marginBottom: 25 }}>
          <TextInput
            onChangeText={setEmail}
            placeholder="Email"
            value={email}
            mode="outlined"
            label="Email"
            outlineStyle={{
              borderColor: Colors.light.primaryColor,
              borderRadius: 5,
            }}
          />
          <TextInput
            onChangeText={setPassword}
            placeholder="Password"
            value={password}
            mode="outlined"
            label="Password"
            outlineStyle={{
              borderColor: Colors.light.primaryColor,
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
              borderColor: Colors.light.primaryColor,
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

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={onPress}
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: Colors.light.primaryColor,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              opacity:
                !(password === confirmPassword) || password.length === 0
                  ? 0.5
                  : 1,
            }}
            disabled={!(password === confirmPassword) || password.length === 0}
          >
            <Text style={{ color: "#fff", fontWeight: "500" }}>Register</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 5 }}>Do you already have an account?</Text>
          <Link href="/(auth)/login">
            <Text
              style={{
                color: Colors.light.darkPrimaryColor,
                fontWeight: "600",
              }}
            >
              Login
            </Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
