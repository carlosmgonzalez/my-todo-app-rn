import { User, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";

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
