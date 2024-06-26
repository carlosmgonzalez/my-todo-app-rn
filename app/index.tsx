import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
}
