import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, handleLogin } from "@/utils/firebaseConfig";
import { Link } from "expo-router";
import { Button } from "tamagui";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPress = async () => {
    await handleLogin(email, password);
  };

  return (
    <View>
      <TextInput onChangeText={setEmail} placeholder="Email" value={email} />
      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        value={password}
      />
      <Button onPress={onPress} color="" backgroundColor="black">
        {/* <Text>Login</Text>
         */}
        login
      </Button>
      <Text>You still do not have an account?</Text>
      <Link href="/(auth)/register">
        <Text style={{ color: "blue" }}>Register</Text>
      </Link>
    </View>
  );
}
