import { useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import { Text, View } from "react-native";

export default function InitialScreen() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("onAuth");
      if (user) {
        return router.replace("/(app)/(tabs)");
      } else {
        return router.replace("/(auth)/login");
      }
    });
  }, [auth]);
}
