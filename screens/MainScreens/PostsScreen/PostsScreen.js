import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreen } from "../../NestedScreens/DefaultScreen/DefaultScreen";
import { CommentsScreen } from "../../NestedScreens/CommentsScreen/CommentsScreen";
import { MapScreen } from "../../NestedScreens/MapScreen/MapScreen";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();

export const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 90 },
      }}
    >
      <NestedScreen.Screen
        name="Default"
        component={DefaultScreen}
        options={() => ({
          headerLeft: () => null,
          headerRight: ({ focused, color, size }) => (
            <TouchableOpacity onPress={() => logOut()}>
              <MaterialIcons
                name="logout"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="grid"
              size={24}
              color={focused ? "#FF6C00" : "#212121CC"}
            />
          ),
        })}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={() => ({
          headerLeft: ({}) => (
            <View>
              <MaterialIcons
                onPress={() => navigation.goBack()}
                name="keyboard-backspace"
                size={24}
                color="#000"
                style={{ marginLeft: 20 }}
              />
            </View>
          ),
          tabBarStyle: { display: "none" },
        })}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={() => ({
          headerLeft: ({}) => (
            <View>
              <MaterialIcons
                onPress={() => navigation.goBack()}
                name="keyboard-backspace"
                size={24}
                color="#000"
                style={{ marginLeft: 20 }}
              />
            </View>
          ),
        })}
      />
    </NestedScreen.Navigator>
  );
};
