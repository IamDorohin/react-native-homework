import React from "react";
import { StyleSheet } from "react-native";
import { RegistrationScreen } from "./screens/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen";
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
