import React from "react";
import { useState } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./helpers/routing";

export default function App() {
  const [isAuth, setIsAuth] = useState(true);
  const routing = useRoute(isAuth);

  const [fontsLoaded] = useFonts({
    "roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
