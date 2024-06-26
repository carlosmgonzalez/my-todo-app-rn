import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { EditImageButton } from "./EditImageButton";

interface Props {
  setPhotoUrl: React.Dispatch<React.SetStateAction<string | undefined | null>>;
  photoUrl: string | undefined | null;
}

export const UserPhoto = ({ setPhotoUrl, photoUrl }: Props) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderRadius: 100,
          width: 200,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 3,
          borderColor: Colors.light.primaryColor,
        }}
      >
        <View
          style={{
            borderRadius: 100,
            backgroundColor: "#d4d4d4",
            overflow: "hidden",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 5,
            borderColor: "#fff",
          }}
        >
          <Image
            source={
              photoUrl
                ? { uri: photoUrl }
                : require("@/assets/images/no-avatar.png")
            }
            style={{
              width: 180,
              height: 180,
            }}
          />
        </View>
      </View>
      <EditImageButton setPhotoUrl={setPhotoUrl} />
    </View>
  );
};
