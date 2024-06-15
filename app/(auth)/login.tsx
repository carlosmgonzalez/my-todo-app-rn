import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, handleLogin } from "@/utils/firebaseConfig";
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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{ gap: 20, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 25, fontWeight: "600" }}>
            Welcome to Onboard!
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "400" }}>
            Let’s help to meet up your tasks
          </Text>
        </View>
        <Image
          source={require("@/assets/images/login.png")}
          style={{ width: 230, height: 230 }}
        />
      </View>
      <View style={{ width: "100%", gap: 10 }}>
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
        <Button
          onPress={onPress}
          mode="contained-tonal"
          style={{
            backgroundColor: Colors.light.primaryColor,
            width: "100%",
          }}
          textColor="white"
        >
          Login
        </Button>
        <Text>You still do not have an account?</Text>
        <Link href="/(auth)/register">
          <Text
            style={{ color: Colors.light.darkPrimaryColor, fontWeight: "600" }}
          >
            Register
          </Text>
        </Link>
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
    paddingTop: 50,
  },
});
