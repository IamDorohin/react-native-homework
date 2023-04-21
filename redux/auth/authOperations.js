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

const auth = getAuth(app);

export const authSignUp =
  ({ avatar, login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, { displayName: login, photoURL: avatar });

      const { displayName, uid } = await auth.currentUser;

      const currentUserData = {
        nickName: displayName,
        userId: uid,
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
