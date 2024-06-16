import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, handleLogin, handleRegister } from "@/utils/firebaseConfig";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);

  const { height } = useWindowDimensions();
  const heightScreen = height - 50 - constants.statusBarHeight;

  const onPress = async () => {
    if (password === confirmPassword) {
      await handleRegister(email, password);
      return;
    }
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
                  onPress={() =>
                    setHiddenConfirmPassword(!hiddenConfirmPassword)
                  }
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
            <Button
              onPress={onPress}
              mode="contained-tonal"
              style={{
                backgroundColor: Colors.light.primaryColor,
                width: "100%",
              }}
              textColor="white"
            >
              Register
            </Button>
            <Text>Do you already have an account?</Text>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "space-between",
    // padding: 20,
    // paddingTop: 50,
  },
});
