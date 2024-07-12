import {
  User,
  deleteUser,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { getStorage, ref, deleteObject, listAll } from "firebase/storage";

const storage = getStorage();

export const updateDisplayName = async (user: User, displayName: string) => {
  try {
    await updateProfile(user, { displayName });
  } catch (error) {
    throw error;
  }
};

export const verifyNewEmail = async (user: User, email: string) => {
  try {
    await verifyBeforeUpdateEmail(user, email);
  } catch (error) {
    throw error;
  }
};

export const deleteProfile = async (user: User) => {
  try {
    await updateProfile(user, {
      photoURL: "",
    });

    const listPhotoRef = ref(storage, "todoApp/userPhoto/" + user.uid);
    const res = await listAll(listPhotoRef);
    res.items.forEach(async (photoRef) => {
      if (photoRef) await deleteObject(photoRef);
    });
    await deleteUser(user);
  } catch (error) {
    throw error;
  }
};
