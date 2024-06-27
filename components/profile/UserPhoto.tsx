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
          width: 200,
          height: 200,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 3,
          borderColor: Colors.light.primaryColor,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d4d4d4",
            borderWidth: 3,
            overflow: "hidden",
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
