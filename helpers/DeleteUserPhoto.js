import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

export const deleteUserPhoto = async () => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: "",
    });
    console.log("its ok");
  } catch (error) {
    console.log("error.message", error.message);
  }
};

export const addUserPhoto = async (photoForDownload) => {
  await updateProfile(auth.currentUser, {
    photoURL: photoForDownload,
  })
    .then(() => {
      console.log("Added new photo!");
    })
    .catch((error) => {
      console.log("error", error);
    });
};
