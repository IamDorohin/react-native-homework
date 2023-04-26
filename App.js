import React from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { Main } from "./components/Main";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
