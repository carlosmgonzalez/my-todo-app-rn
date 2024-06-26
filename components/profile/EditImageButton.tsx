import { View, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
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
  const userUid = auth.currentUser!.uid;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    const res = await fetch(result.assets[0].uri);
    const imageBlob = await res.blob();

    const fileExtension = result.assets[0].uri.split(".").at(-1);
    const fileName = `${Date.now()}.${fileExtension}`;

    // const existUserPhoto = ref(storage, "userPhoto/" + userUid);
    const existUserPhoto = ref(storage, "userPhoto/" + userUid);
    const list = await listAll(existUserPhoto);
    if (list.items.length !== 0) {
      const fullPathUserPhoto = list.items[0].fullPath;
      const refUserPhoto = ref(storage, fullPathUserPhoto);
      deleteObject(refUserPhoto);
    }

    const storageRef = ref(storage, "userPhoto/" + userUid + "/" + fileName);
    const uploadUserPhoto = uploadBytesResumable(storageRef, imageBlob);

    uploadUserPhoto.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      async () => {
        const userPhotoUrl = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser!, {
          photoURL: userPhotoUrl,
        });
        setPhotoUrl(userPhotoUrl);
      }
    );
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
