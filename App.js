import React from "react";
import { RegistrationScreen } from "./screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <LoginScreen />;
  // return <RegistrationScreen />;
}
