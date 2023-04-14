import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../screens/AuthScreens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "../screens/AuthScreens/LoginScreen/LoginScreen";
import { HomeScreen } from "../screens/MainScreens/HomeScreen/HomeScreen";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
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
  } else {
    return <HomeScreen />;
  }
};
