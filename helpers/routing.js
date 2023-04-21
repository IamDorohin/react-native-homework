import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../screens/AuthScreens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "../screens/AuthScreens/LoginScreen/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  console.log("isAuth", isAuth);
  if (isAuth) {
    return <HomeScreen />;
  } else {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
};
