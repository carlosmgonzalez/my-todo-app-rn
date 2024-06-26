import { View, Text } from "react-native";
import { User } from "firebase/auth";

export const InfoUser = ({ user }: { user: User }) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
      }}
    >
      <Text
        style={{
          fontWeight: "500",
          fontSize: 20,
        }}
      >
        {user.displayName ? user.displayName : "No name"}
      </Text>
      <Text
        style={{
          fontWeight: "400",
        }}
      >
        {user.email}
      </Text>
    </View>
  );
};
