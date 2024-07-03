import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator, View } from "react-native";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

export default function InitialScreen() {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return router.replace("/(app)/(tabs)");
      } else {
        return router.replace("/(auth)/login");
      }
    });
  }, [auth]);

  return null;
}
