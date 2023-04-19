import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreen } from "../../NestedScreens/DefaultScreen/DefaultScreen";
import { CommentsScreen } from "../../NestedScreens/CommentsScreen/CommentsScreen";
import { MapScreen } from "../../NestedScreens/MapScreen/MapScreen";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const nestedScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <nestedScreen.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 90 },
      }}
    >
      <nestedScreen.Screen
        name="Posts"
        component={DefaultScreen}
        options={() => ({
          headerRight: ({}) => (
            <View>
              <MaterialIcons
                name="logout"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 20 }}
              />
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="grid"
              size={24}
              color={focused ? "#FF6C00" : "#212121CC"}
            />
          ),
        })}
      ></nestedScreen.Screen>
      <nestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={() => ({
          tabBarStyle: { display: "none" },
        })}
      ></nestedScreen.Screen>
      <nestedScreen.Screen
        name="Map"
        component={MapScreen}
      ></nestedScreen.Screen>
    </nestedScreen.Navigator>
  );
};
