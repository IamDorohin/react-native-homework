import {
  getAuth,
  updateProfile,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { AuthSlice } from "./authReducer";
import { app } from "../../firebase/config";

const auth = getAuth(app);
const storage = getStorage();

const uploadedUserImage = async (login, avatar) => {
  const storageRef = ref(storage, `usersAvatars/${login}.jpg`);
  const response = await fetch(avatar);
  const uploadedFile = await response.blob();
  await uploadBytes(storageRef, uploadedFile);

  const photoUrl = await getDownloadURL(
    ref(storage, `usersAvatars/${login}.jpg`)
  );
  return photoUrl;
};

export const authSignUp =
  ({ avatar, login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userAvatar = await uploadedUserImage(login, avatar);

      await updateProfile(user, { displayName: login, photoURL: userAvatar });

      const { displayName, uid, photoURL } = await auth.currentUser;

      const currentUserData = {
        nickName: displayName,
        userId: uid,
        userPhoto: photoURL,
      };

      dispatch(AuthSlice.actions.updateUserProfile(currentUserData));
    } catch (error) {
      console.log(error);
    }
  };

// export const authSignIn =
//   ({ email, password }) =>
//   async (dispatch, getState) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       await setPersistence(auth, browserLocalPersistence);
//     } catch (error) {
//       console.log("error.message", error.message);
//     }
//   };

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("loggedIn user", user);
    } catch (error) {
      console.log(error);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    console.log("is current user?", user);
    if (user) {
      const currentUserData = {
        nickName: user.displayName,
        userId: user.uid,
        userPhoto: user.photoURL,
        userEmail: user.email,
      };
      dispatch(AuthSlice.actions.authStateChange({ stateChange: true }));
      dispatch(AuthSlice.actions.updateUserProfile(currentUserData));
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(AuthSlice.actions.authSignOut());
};
