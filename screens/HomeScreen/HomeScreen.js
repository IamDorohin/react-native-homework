import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { View } from "react-native";

import { PostsScreen } from "../MainScreens/PostsScreen/PostsScreen";
import { CreatePostScreen } from "../MainScreens/CreatePostScreen/CreatePostScreen";
import { ProfileScreen } from "../MainScreens/ProfileScreen/ProfileScreen";

const MainTab = createBottomTabNavigator();

export const HomeScreen = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 90 },
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="grid"
              size={24}
              color={focused ? "#FF6C00" : "#212121CC"}
            />
          ),
        })}
      />
      <MainTab.Screen
        name="Create Post"
        component={CreatePostScreen}
        options={({ navigation }) => ({
          headerLeft: ({}) => (
            <View>
              <MaterialIcons
                onPress={() => navigation.goBack("CreatePostScreen")}
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
          tabBarStyle: { display: "none" },
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
      {/* <MainTab.Screen
        options={({ navigation }) => ({
          tabBarItemStyle: { display: "none" },
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
        })}
        name="MapScreen"
        component={MapScreen}
      /> */}
    </MainTab.Navigator>
  );
};
