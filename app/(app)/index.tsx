import { logout } from "@/utils/firebaseConfig";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View>
      <Text>Tab One</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
