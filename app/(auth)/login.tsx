import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, handleLogin } from "@/utils/firebaseConfig";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import constants from "expo-constants";

export default function LoginScreen() {
  const { top } = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const heightScreen = height - constants.statusBarHeight;

  const onPress = async () => {
    await handleLogin(email, password);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            height: heightScreen,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              paddingTop: 50,
            }}
          >
            <View
              style={{
                gap: 20,
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
      </ScrollView>
    </View>
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
