import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, handleLogin, handleRegister } from "@/utils/firebaseConfig";
import { Link } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPress = async () => {
    console.log(email, password);
    await handleRegister(email, password);
  };

  return (
    <View>
      <TextInput onChangeText={setEmail} placeholder="Email" value={email} />
      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        value={password}
      />
      <TouchableOpacity onPress={onPress}>
        <Text>Register</Text>
      </TouchableOpacity>
      <Text>Do you already have an account?</Text>
      <Link href="/(auth)/login">
        <Text style={{ color: "blue" }}>Login</Text>
      </Link>
    </View>
  );
}
