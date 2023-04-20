import {
  getAuth,
  updateProfile,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
      console.log("logged in user", user);
    } catch (error) {
      console.log(error);
    }
  };

const authSignOut = () => async (dispatch, getState) => {};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    console.log("user", user);
    if (user) {
      const currentUserData = {
        nickName: user.displayName,
        userId: user.uid,
      };

      dispatch(AuthSlice.actions.updateUserProfile(currentUserData));
      dispatch(AuthSlice.actions.authStateChange({ stateChange: true }));
    }
  });
  // await onAuthStateChanged(auth, (user) => {
  //   console.log("user", user);
  //   if (user) {
  //     const currentUserData = {
  //       nickName: user.displayName,
  //       userId: user.uid,
  //     };

  //     dispatch(AuthSlice.actions.updateUserProfile(currentUserData));
  //     dispatch(AuthSlice.actions.authStateChange({ stateChange: true }));
  //   }
  // });
};
