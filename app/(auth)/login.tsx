import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { handleLogin } from "@/utils/firebaseConfig";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import Colors from "@/constants/Colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPress = async () => {
    await handleLogin(email, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
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
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "600" }}>
              Welcome Back!
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>
              Login and see your pending tasks
            </Text>
          </View>
          <Image
            source={require("@/assets/images/login.png")}
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
            secureTextEntry
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
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "500" }}>Login</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 5 }}>
            You still do not have an account?
          </Text>
          <Link href="/(auth)/register">
            <Text
              style={{
                color: Colors.light.darkPrimaryColor,
                fontWeight: "600",
              }}
            >
              Register
            </Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
  },
});

{
  /* <ScrollView>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            height: heightScreen,
          }}
        >
        </View>
      </ScrollView> */
}
