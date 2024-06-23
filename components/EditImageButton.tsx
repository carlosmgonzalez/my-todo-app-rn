import { View, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export const EditImageButton = ({
  setPhotoUrl,
}: {
  setPhotoUrl: Dispatch<SetStateAction<string | null | undefined>>;
}) => {
  const storage = getStorage();
  const auth = getAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const res = await fetch(result.assets[0].uri);
      const imageBlob = await res.blob();

      const fileExtension = result.assets[0].uri.split(".").at(-1);
      const fileName = `${Date.now()}.${fileExtension}`;
      const storageRef = ref(storage, "images/" + fileName);

      const snapshot = await uploadBytes(storageRef, imageBlob);

      if (snapshot.ref.fullPath) {
        const imageUrl = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser!, {
          photoURL: imageUrl,
        });
        setPhotoUrl(imageUrl);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      style={{
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "rgb(193, 218, 219)",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        right: 100,
      }}
    >
      <Ionicons
        name="pencil-outline"
        size={30}
        color={Colors.light.primaryColor}
      />
    </TouchableOpacity>
  );
};
