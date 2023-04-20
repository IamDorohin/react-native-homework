import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const authSignUp = () => async (dispatch, getState) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log("user", user);
  } catch (error) {
    console.log(error);
  }
};
const authSignIn = () => async (dispatch, getState) => {};
const authSignOut = () => async (dispatch, getState) => {};
