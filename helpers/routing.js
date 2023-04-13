import React from "react";
import { View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { RegistrationScreen } from "../screens/AuthScreens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "../screens/AuthScreens/LoginScreen/LoginScreen";
import { PostsScreen } from "../screens/MainScreens/PostsScreen/PostsScreen";
import { CreatePostScreen } from "../screens/MainScreens/CreatePostScreen/CreatePostScreen";
import { ProfileScreen } from "../screens/MainScreens/ProfileScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

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
    return (
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: { height: 90 },
        }}
      >
        <MainTab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Feather
                name="grid"
                size={24}
                color={focused ? "#FF6C00" : "#212121CC"}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Create Post"
          component={CreatePostScreen}
          options={({ navigation }) => ({
            headerLeft: ({}) => (
              <View>
                <MaterialIcons
                  onPress={() => navigation.goBack("Posts")}
                  name="keyboard-backspace"
                  size={24}
                  color="#000"
                  style={{ marginLeft: 20 }}
                />
              </View>
            ),
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#FF6C00",
                  color: "#fff",
                }}
              >
                <AntDesign name="plus" size={24} color={"#fff"} />
              </View>
            ),
          })}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Feather
                name="user"
                size={24}
                color={focused ? "#FF6C00" : "#212121CC"}
              />
            ),
          }}
        />
      </MainTab.Navigator>
    );
  }
};
