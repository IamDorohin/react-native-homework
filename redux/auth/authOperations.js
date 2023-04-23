import {
  getAuth,
  updateProfile,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthSlice } from "./authReducer";
import { app } from "../../firebase/config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
const auth = getAuth(app);

const uploadedUserImage = async (displayName, avatar) => {
  console.log("avatar for get url", avatar);
  const storageRef = ref(storage, `usersAvatars/${displayName}.jpg`);
  const response = await fetch(avatar);
  const uploadedFile = await response.blob();
  await uploadBytes(storageRef, uploadedFile);

  const photoUrl = await getDownloadURL(
    ref(storage, `usersAvatars/${displayName}.jpg`)
  );
  console.log("done photo url", photoUrl);
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
      console.log("uploaded user avatar", avatar);
      await updateProfile(user, { displayName: login });

      const { displayName, uid } = await auth.currentUser;

      const userAvatar = await uploadedUserImage(login, avatar);
      console.log("avatar for user", userAvatar);

      const currentUserData = {
        nickName: displayName,
        userId: uid,
        userPhoto: userAvatar,
      };

      dispatch(AuthSlice.actions.updateUserProfile(currentUserData));
    } catch (error) {
      console.log(error);
    }
  };

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
    if (!user) return;

    const currentUserData = {
      nickName: user.displayName,
      userId: user.uid,
    };

    dispatch(AuthSlice.actions.authStateChange({ stateChange: true }));
    dispatch(AuthSlice.actions.updateUserProfile(currentUserData));
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(AuthSlice.actions.authSignOut());
};
