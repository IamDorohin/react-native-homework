import { getAuth, updateProfile } from "firebase/auth";
import { app } from "../firebase/config";
import { auth } from "../firebase/config";

// const auth = getAuth(app);

export const DeleteUserPhoto = () => {
  updateProfile(auth.currentUser, {
    photoURL: null,
    displayName: "User",
  })
    .then(() => {
      console.log("Profile updated!");
    })
    .catch((error) => {
      console.log("error", error);
    });
};
