import {
  ChangePasswordButton,
  EditCategoryListButton,
  EditProfileButton,
  InfoUser,
  LogoutButton,
  UserPhoto,
} from "@/components";
import { defaultStyles } from "@/constants/Styles";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser!;

  const [photoUrl, setPhotoUrl] = useState<string | null | undefined>(
    user.photoURL
  );

  return (
    <View style={defaultStyles.container}>
      <UserPhoto setPhotoUrl={setPhotoUrl} photoUrl={photoUrl} />
      <InfoUser user={user} />
      <EditProfileButton />
      <ChangePasswordButton />
      <EditCategoryListButton />
      <LogoutButton auth={auth} />
    </View>
  );
}
