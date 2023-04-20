import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../helpers/routing";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { app } from "../firebase/config";

const auth = getAuth(app);

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser);
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
