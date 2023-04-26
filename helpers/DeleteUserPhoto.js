import { getAuth, updateUser } from "firebase/auth";
import { app } from "../firebase/config";

// const auth = getAuth(app);

export const DeleteUserPhoto = ({ userId }) => {
  getAuth(app).updateUser(userId, {
    photoURL: null,
  });
};
