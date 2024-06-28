import { db } from "@/firebase/firebaseConfig";
import { Category } from "@/interfaces";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";

export const createCategory = async (userId: string, name: string) => {
  const categoryRef = ref(db, "users/" + userId + "/categories");
  const newCategory = push(categoryRef);
  await set(newCategory, {
    name,
  });
};

export const getAllCategories = async (
  userId: string,
  setCategories: React.Dispatch<React.SetStateAction<Category[] | undefined>>
) => {
  const allCategoriesRef = ref(db, "users/" + userId + "/categories");
  onValue(allCategoriesRef, (snapshot) => {
    if (snapshot.val()) {
      const response = snapshot.val();
      const categories = Object.entries(response).map((category) => ({
        id: category[0],
        name: (category[1] as unknown as { name: string }).name,
      })) as unknown as Category[];
      if (categories.length === 0) setCategories([]);
      setCategories(categories);
    }
  });
};

export const deleteCategory = async (userId: string, categoryId: string) => {
  try {
    const categoryRef = ref(
      db,
      "users/" + userId + "/categories/" + categoryId
    );
    await remove(categoryRef);
  } catch (error) {
    console.log(error);
  }
};
